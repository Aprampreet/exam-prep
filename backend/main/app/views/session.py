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
from app.views.schemas import ShortAnswerAttemptOut, MCQAttemptOut, ShortAnswerOut
from datetime import datetime
from sqlalchemy import select
from app.services.tasks import process_document_from_cloudinary
from db.models.DocumentChunk import DocumentChunk
from app.services.llm import generate_mcq, generate_short_answer
from db.models.ShortAnswer import ShortAnswer
from sqlalchemy.orm import selectinload

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
@limiter.limit("10/minute")
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

    existing = await db.execute(
        select(MCQAttempt).where(MCQAttempt.session_id == session_id)
    )
    existing_attempt = existing.scalar_one_or_none()
    if existing_attempt:
        return existing_attempt

    stmt = (
        select(DocumentChunk)
        .where(DocumentChunk.session_id == session_id)
        .order_by(DocumentChunk.chunk_index)
        .limit(12)
    )
    result = await db.execute(stmt)
    chunks = result.scalars().all()

    if not chunks:
        raise HTTPException(status_code=404, detail="No chunks found for this session")

    context = "\n".join(chunk.content for chunk in chunks)

    try:
        mcqs = await generate_mcq(context, count=2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if len(mcqs) != 2:
        raise HTTPException(
            status_code=500,
            detail="LLM did not generate exactly 2 MCQs"
        )

    mcq_attempt = MCQAttempt(
        session_id=session_id,
        questions=mcqs,
        total_questions=2,
        score=None
    )

    db.add(mcq_attempt)
    await db.commit()
    await db.refresh(mcq_attempt)
    return mcq_attempt



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

    result = await db.execute(
        select(ShortAnswerAttempt)
        .options(selectinload(ShortAnswerAttempt.answers))
        .where(ShortAnswerAttempt.session_id == session_id)
    )
    existing_attempt = result.scalar_one_or_none()
    if existing_attempt:
        return existing_attempt

    result = await db.execute(
        select(DocumentChunk)
        .where(DocumentChunk.session_id == session_id)
        .order_by(DocumentChunk.chunk_index)
        .limit(12)
    )
    chunks = result.scalars().all()
    if not chunks:
        raise HTTPException(status_code=404, detail="No chunks found")

    context = "\n".join(c.content for c in chunks)
    short_answers = await generate_short_answer(context, count=2)
    attempt = ShortAnswerAttempt(
        session_id=session_id,
        total_questions=len(short_answers),
        total_score=None,
    )
    db.add(attempt)
    await db.flush()

    db.add_all([
        ShortAnswer(
            attempt_id=attempt.id,
            question=a["question"],
            correct_answer=a["answer"],
            user_answer=None,
            score=None,
            feedback=None,
        )
        for a in short_answers
    ])

    await db.commit()

    result = await db.execute(
        select(ShortAnswerAttempt)
        .options(selectinload(ShortAnswerAttempt.answers))
        .where(ShortAnswerAttempt.id == attempt.id)
    )
    return result.scalar_one()




@session_router.get("/{session_id}/mcq", response_model=MCQAttemptOut)
@limiter.limit("10/minute")
async def get_mcq_attempt(
    request: Request,
    session_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(MCQAttempt)
        .join(Session)
        .where(
            MCQAttempt.session_id == session_id,
            Session.user_id == user.id
        )
    )
    attempt = result.scalar_one_or_none()

    if not attempt:
        raise HTTPException(status_code=404, detail="MCQ Attempt not found")

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