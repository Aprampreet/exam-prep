from fastapi import APIRouter,Depends,HTTPException,Form,Request,BackgroundTasks,Depends
from app.views.schemas import SessionOut
from fastapi import File
from auth.dependancy import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from db.deps import get_db
from db.models.user import User
from fastapi import UploadFile
from cloudinary.uploader import upload
from db.models.Session import Session
from db.models.MCQ import MCQAttempt
from db.models.Short import ShortAnswerAttempt
from app.core.ratelimiter import limiter
from app.views.schemas import *
from datetime import datetime
from sqlalchemy import select
from app.services.tasks import process_document_from_cloudinary
from db.models.DocumentChunk import DocumentChunk
from app.services.llm import *
from db.models.ShortAnswer import ShortAnswer
from sqlalchemy.orm import selectinload
from db.models.MCQans import MCQQuestion

session_router = APIRouter(prefix="/session", tags=["session"])



from fastapi import BackgroundTasks

@session_router.post("/create", response_model=SessionOut)
@limiter.limit("10/minute")
async def create_session(
    request: Request,
    background_tasks: BackgroundTasks,
    title: str = Form(...),
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        result = upload(
            file.file,
            folder="study_sessions",
            resource_type="raw"
        )

        session = Session(
            title=title,
            user_id=user.id,
            original_file_url=result["secure_url"],
            status="processing"
        )

        db.add(session)
        await db.commit()
        await db.refresh(session) 

        background_tasks.add_task(
            process_document_from_cloudinary,
            session.id,
            session.original_file_url
        )
        

        return session

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@session_router.get("/all", response_model=list[SessionOut])
@limiter.limit("10/minute")
async def get_all_sessions(
    request: Request,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Session).where(
            Session.user_id == user.id
        )
    )
    sessions = result.scalars().all()

    return sessions


@session_router.post("/{session_id}/mcq", response_model=MCQAttemptOut)
async def create_mcq(
    request: Request,
    session_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Session).where(
            Session.id == session_id,
            Session.user_id == user.id
        )
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    await ensure_assessment_generated(session, db)

    result = await db.execute(
        select(MCQAttempt)
        .options(selectinload(MCQAttempt.questions))
        .where(MCQAttempt.session_id == session_id)
    )
    return result.scalar_one()




@session_router.post("/{session_id}/short", response_model=ShortAnswerAttemptOut)
@limiter.limit("10/minute")
async def create_short_answers(
    request: Request,
    session_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Session).where(
            Session.id == session_id,
            Session.user_id == user.id
        )
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    await ensure_assessment_generated(session, db)

    result = await db.execute(
        select(ShortAnswerAttempt)
        .options(selectinload(ShortAnswerAttempt.answers))
        .where(ShortAnswerAttempt.session_id == session_id)
    )
    return result.scalar_one()





@session_router.get("/{session_id}/mcq", response_model=MCQAttemptOut)
async def get_mcq(
    session_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(MCQAttempt)
        .options(selectinload(MCQAttempt.questions))
        .join(Session)
        .where(
            MCQAttempt.session_id == session_id,
            Session.user_id == user.id
        )
    )
    attempt = result.scalar_one_or_none()

    if not attempt:
        raise HTTPException(status_code=404, detail="MCQ attempt not found")

    return attempt


@session_router.post("/{session_id}/mcq/check", response_model=MCQAttemptOut)
@limiter.limit("10/minute")
async def check_mcq(
    request: Request,
    session_id: int,
    payload: MCQSubmitRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(MCQAttempt)
        .options(selectinload(MCQAttempt.questions))  
        .join(Session)
        .where(
            MCQAttempt.session_id == session_id,
            Session.user_id == user.id
        )
    )
    attempt = result.scalar_one_or_none()
    if not attempt:
        raise HTTPException(status_code=404, detail="MCQ attempt not found")

    questions_map = {q.id: q for q in attempt.questions}
    current_score = 0
    for q_id, user_ans in payload.answers.items():
        if q_id in questions_map:
            question = questions_map[q_id]
            question.user_answer = user_ans
            question.is_correct = (user_ans == question.correct_answer)
    score = 0
    for q in attempt.questions:
        if q.is_correct:
            score += 1
            
    attempt.score = score
    await db.commit()
    
    await db.refresh(attempt)
    
    return attempt
    
    
    

@session_router.get("/{session_id}/short", response_model=ShortAnswerAttemptOut)
@limiter.limit("10/minute")
async def get_short_attempt(
    request: Request,
    session_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ShortAnswerAttempt)
        .options(selectinload(ShortAnswerAttempt.answers))  
        .join(Session)
        .where(
            ShortAnswerAttempt.session_id == session_id,
            Session.user_id == user.id
        )
    )
    attempt = result.scalar_one_or_none()

    if not attempt:
        raise HTTPException(status_code=404, detail="Short Attempt not found")

    return attempt


@session_router.post("/{session_id}/chat")
@limiter.limit("10/minute")
async def chat_with_ai(
        request: Request,
        session_id: int,
        payload: ChatRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db),
    ):
    session = await db.execute(
        select(Session)
        .where(
            Session.id == session_id,
            Session.user_id == user.id
        )
    )
    session = session.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    chunks = await db.execute(
        select(DocumentChunk)
        .where(DocumentChunk.session_id == session_id)
        .order_by(DocumentChunk.chunk_index)
        .limit(12)
    )
    chunks = chunks.scalars().all()
    context = "\n".join(c.content for c in chunks)
    history_text=""
    for msg in payload.history[-6:]:  
        history_text += f"{msg.role.upper()}: {msg.content}\n"
    answer = await chat_rag_with_memory(
        doc_context=context,
        history=history_text,
        question=payload.message
    )
    return {"answer": answer}
    