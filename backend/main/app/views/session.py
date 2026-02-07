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
from sqlalchemy import desc
from app.services.embeddings import EmbeddingService
from app.services.analytics import *
from sqlalchemy import func
from db.models.Analytics import Analytics
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
        ).order_by(desc(Session.created_at))
    )
    sessions = result.scalars().all()

    return sessions


@session_router.delete("/{session_id}")
async def delete_session(
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
        
    await db.delete(session)
    await db.commit()
    
    return {"message": "Session deleted successfully"}


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





@session_router.post("/{session_id}/short/check", response_model=ShortAnswerAttemptOut)
@limiter.limit("10/minute")
async def check_short_answer(
    request: Request,
    session_id: int,
    payload: ShortAnswerSubmitRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ShortAnswerAttempt)
        .join(Session)
        .where(
            ShortAnswerAttempt.session_id == session_id,
            Session.user_id == user.id
        )
    )
    attempt = result.scalar_one_or_none()
    if not attempt:
        raise HTTPException(status_code=404, detail="Short answer attempt not found")

    result = await db.execute(
        select(ShortAnswer)
        .where(
            ShortAnswer.id == payload.question_id,
            ShortAnswer.attempt_id == attempt.id
        )
    )
    question = result.scalar_one_or_none()
    if not question:
        raise HTTPException(status_code=404, detail="Short answer question not found")

    if question.score is not None:

        raise HTTPException(
            status_code=400,
            detail="This question has already been evaluated"
        )

    if not payload.answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty")

    question.user_answer = payload.answer.strip()
    
    evaluation = await evaluate_short_answer(
        question.question,
        question.correct_answer,
        question.user_answer,
    )

    question.score = int(evaluation.get("score", 0))
    question.feedback = evaluation.get("feedback", "No feedback provided.")

    await db.flush() 

    result = await db.execute(
        select(func.sum(ShortAnswer.score))
        .where(
            ShortAnswer.attempt_id == attempt.id,
            ShortAnswer.score.isnot(None)
        )
    )
    total_score = result.scalar() or 0
    attempt.total_score = total_score

    await db.commit()

    # 8. Return Updated Attempt
    result = await db.execute(
        select(ShortAnswerAttempt)
        .options(selectinload(ShortAnswerAttempt.answers))
        .where(ShortAnswerAttempt.id == attempt.id)
    )
    return result.scalar_one()






@session_router.post("/{session_id}/chat")
@limiter.limit("10/minute")
async def chat_with_ai(
    request: Request,
    session_id: int,
    payload: ChatRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Session)
        .where(Session.id == session_id, Session.user_id == user.id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    performance_keywords = [
        "weak", "weak areas", "weak topics", "mistakes",
        "revision", "improve", "score", "low", "focus"
    ]
    lower_q = payload.message.lower()
    is_performance_query = any(k in lower_q for k in performance_keywords)

    weak_mcqs = (
        await db.execute(
            select(MCQQuestion)
            .join(MCQAttempt)
            .where(
                MCQAttempt.session_id == session_id,
                MCQQuestion.is_correct.is_(False)
            )
        )
    ).scalars().all()

    weak_shorts = (
        await db.execute(
            select(ShortAnswer)
            .join(ShortAnswerAttempt)
            .where(
                ShortAnswerAttempt.session_id == session_id,
                ShortAnswer.score.isnot(None),
                ShortAnswer.score < 3
            )
        )
    ).scalars().all()

    weak_context = ""
    for q in weak_mcqs:
        weak_context += f"- MCQ: {q.question}\n"
    for s in weak_shorts:
        weak_context += f"- Short Answer: {s.question}\n"

    semantic_chunks = []

    if not is_performance_query:
        embedding_service = EmbeddingService()
        query_embedding = embedding_service.embed_text(payload.message)

        result = await db.execute(
            select(DocumentChunk)
            .where(DocumentChunk.session_id == session_id)
            .order_by(
                DocumentChunk.embedding.cosine_distance(query_embedding)
            )
            .limit(6)
        )
        semantic_chunks = result.scalars().all()

    doc_context = "\n".join(c.content for c in semantic_chunks)

    history_text = ""
    for msg in payload.history[-6:]:
        history_text += f"{msg.role.upper()}: {msg.content}\n"

    if is_performance_query:
        final_context = f"""
WEAK AREAS (from exam analysis):
{weak_context}

Instruction:
Explain weak areas clearly and suggest revision strategy.
"""
    else:
        final_context = f"""
STUDY MATERIAL:
{doc_context}

WEAK AREAS:
{weak_context}
"""

    answer = await chat_rag_with_memory(
        doc_context=final_context,
        history=history_text,
        question=payload.message
    )

    return {"answer": answer}



    

@session_router.get("/profile/tabs", response_model=ProfileTabsOut)
async def get_profile_tabs(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),

):
    result = await db.execute(
        select(Session)
        .where(Session.user_id == user.id)
    )
    sessions = result.scalars().all()
    total_sessions = len(sessions)
    result = await db.execute(
        select(MCQAttempt)
        .join(Session)
        .where(Session.user_id == user.id)
    )
    mcq_attempts = result.scalars().all()
    
    mcq_percentages = []
    for attempt in mcq_attempts:
        if attempt.score is not None and attempt.total_questions and attempt.total_questions > 0:
            percentage = (attempt.score / attempt.total_questions) * 100
            mcq_percentages.append(percentage)
            
    avg_mcq_score = sum(mcq_percentages) / len(mcq_percentages) if mcq_percentages else 0
    result = await db.execute(
        select(ShortAnswerAttempt)
        .join(Session)
        .where(Session.user_id == user.id)
    )
    short_attempts = result.scalars().all()
    
    total_short_points = 0
    total_short_questions = 0
    
    for attempt in short_attempts:
        if attempt.total_score is not None and attempt.total_questions and attempt.total_questions > 0:
            total_short_points += attempt.total_score
            total_short_questions += attempt.total_questions
            
    avg_short_score = (total_short_points / total_short_questions) if total_short_questions > 0 else 0

    return {
        "total_sessions": total_sessions, 
        "avg_mcq_score": avg_mcq_score, 
        "avg_short_score": avg_short_score 
    }

    
@session_router.get("/{session_id}/analytics")
async def session_analytics(
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
        raise HTTPException(404, "Session not found")

    result = await db.execute(
        select(MCQAttempt)
        .options(selectinload(MCQAttempt.questions))
        .where(MCQAttempt.session_id == session_id)
    )
    mcq = result.scalar_one_or_none()
    if not mcq:
        raise HTTPException(404, "No MCQ attempt")

    result = await db.execute(
        select(ShortAnswerAttempt)
        .options(selectinload(ShortAnswerAttempt.answers))
        .where(ShortAnswerAttempt.session_id == session_id)
    )
    short_attempt = result.scalar_one_or_none()

    result = await db.execute(
        select(DocumentChunk)
        .where(DocumentChunk.session_id == session_id)
        .order_by(DocumentChunk.chunk_index)
    )
    chunks = result.scalars().all()

    stats = analyze_session_performance(mcq)
    
    short_mistakes = []
    short_stats = {"average_score": 0, "total_questions": 0}
    
    if short_attempt:
        total_score = 0
        count = 0
        for ans in short_attempt.answers:
            if ans.score is not None:
                total_score += ans.score
                count += 1
                if ans.score < 3:
                    short_mistakes.append({
                        "question": ans.question,
                        "user_answer": ans.user_answer,
                        "correct_answer": ans.correct_answer
                    })
        
        if count > 0:
            short_stats["average_score"] = round(total_score / count, 1)
            short_stats["total_questions"] = count

    all_mistakes = stats["wrong_questions"] + short_mistakes
    weak_chunks = extract_weak_topics(all_mistakes, chunks)

    result = await db.execute(
        select(Analytics).where(Analytics.session_id == session_id)
    )
    existing_analytics = result.scalar_one_or_none()
    
    ai_insight = ""
    
    if existing_analytics and existing_analytics.ai_response:
        ai_insight = existing_analytics.ai_response
    else:
        ai_insight = await generate_ai_insight(
            weak_chunks,
            all_mistakes
        )
        if existing_analytics:
            existing_analytics.ai_response = ai_insight
        else:
            new_analytics = Analytics(
                session_id=session_id,
                user_id=user.id,
                ai_response=ai_insight
            )
            db.add(new_analytics)
        await db.commit()

    return {
        "stats": {
            "accuracy": stats["accuracy"],
            "correct": stats["correct"],
            "wrong": stats["wrong"]
        },
        "short_stats": short_stats,
        "ai_insight": ai_insight
    }
