from fastapi import APIRouter,Depends,HTTPException,Form,Request
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
from app.views.schemas import ShortAnswerAttemptOut
from app.views.schemas import MCQAttemptOut
from datetime import datetime
from sqlalchemy import select

session_router = APIRouter(prefix="/session", tags=["session"])


@session_router.post("/create", response_model=SessionOut)
@limiter.limit("10/minute")
async def create_session(
    request: Request,
    title: str | None = Form(None),
    file: UploadFile | None = File(None),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        file_url = None

        if file:
            result = upload(
                file.file,
                folder="study_sessions",
                resource_type="raw"
            )
            file_url = result["secure_url"]

        session = Session(
            title=title,
            user_id=user.id,
            original_file_url=file_url,
            status="created"
        )

        db.add(session)
        await db.commit()
        await db.refresh(session)

        return session

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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

    dummy_questions = [
        {
            "question": "What is an OS?",
            "options": ["A", "B", "C", "D"],
            "correct_answer": "B",
            "user_answer": None,
            "is_correct": None
        }
        for _ in range(20)
    ]

    mcq_attempt = MCQAttempt(
        session_id=session_id,
        questions=dummy_questions,
        total_questions=20,
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

    dummy_answers = [
        {
            "question": "Explain CPU scheduling",
            "ideal_answer": "CPU scheduling is...",
            "user_answer": None,
            "score": None,
            "betterment": None
        }
        for _ in range(10)
    ]

    attempt = ShortAnswerAttempt(
        session_id=session_id,
        answers=dummy_answers
    )

    db.add(attempt)
    await db.commit()
    await db.refresh(attempt)

    return attempt


@session_router.get("/{session_id}/mcq", response_model=MCQAttemptOut)
@limiter.limit("10/minute")
async def get_mcq_attempt(
    request: Request,
    session_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(MCQAttempt).where(
            MCQAttempt.session_id == session_id,
            MCQAttempt.user_id == user.id
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
        select(ShortAnswerAttempt).where(
            ShortAnswerAttempt.session_id == session_id,
            ShortAnswerAttempt.user_id == user.id
        )
    )
    attempt = result.scalar_one_or_none()

    if not attempt:
        raise HTTPException(status_code=404, detail="Short Attempt not found")

    return attempt
