import json
from typing import List, Dict
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from db.models.Session import Session
from db.deps import get_db
from db.models import MCQAttempt, ShortAnswerAttempt, DocumentChunk
from db.models.MCQans import MCQQuestion
from db.models.ShortAnswer import ShortAnswer

    
llm = ChatGoogleGenerativeAI(
    api_key=settings.GOOGLE_API_KEY,
    model="gemini-2.5-flash-lite",
    temperature=0.2,
    max_tokens=400,
)


async def generate_assessment(context: str) -> dict:
    context = context[:3000]

    prompt = f"""
Generate:
1) EXACTLY 2 MCQs
2) EXACTLY 2 short-answer questions

Return ONLY JSON.

FORMAT:
{{
  "mcq": [
    {{
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "A"
    }}
  ],
  "short_answers": [
    {{
      "question": "...",
      "answer": "..."
    }}
  ]
}}

CONTENT:
{context}
"""

    response = await llm.ainvoke(prompt)
    raw = str(response.content).strip()

    if raw.startswith("```"):
        raw = raw.replace("```json", "").replace("```", "").strip()

    data = json.loads(raw)

    if "mcq" not in data or "short_answers" not in data:
        raise ValueError("Invalid AI response")

    return data


async def ensure_assessment_generated(
    session: Session,
    db: AsyncSession,
):
    # 1️⃣ Check if BOTH already exist
    result = await db.execute(
        select(MCQAttempt.id)
        .where(MCQAttempt.session_id == session.id)
    )
    mcq_exists = result.scalar_one_or_none() is not None

    result = await db.execute(
        select(ShortAnswerAttempt.id)
        .where(ShortAnswerAttempt.session_id == session.id)
    )
    short_exists = result.scalar_one_or_none() is not None

    if mcq_exists and short_exists:
        return  # ✅ AI already ran

    # 2️⃣ Load context
    result = await db.execute(
        select(DocumentChunk)
        .where(DocumentChunk.session_id == session.id)
        .order_by(DocumentChunk.chunk_index)
        .limit(12)
    )
    chunks = result.scalars().all()
    if not chunks:
        raise ValueError("No chunks found")

    context = "\n".join(c.content for c in chunks)

    # 🔥 ONE AI CALL
    data = await generate_assessment(context)

    # 3️⃣ Create MCQ (only if missing)
    if not mcq_exists:
        mcq_attempt = MCQAttempt(
            session_id=session.id,
            total_questions=len(data["mcq"]),
            score=None,
        )
        db.add(mcq_attempt)
        await db.flush()

        db.add_all([
            MCQQuestion(
                attempt_id=mcq_attempt.id,
                question=q["question"],
                options=q["options"],
                correct_answer=q["correct_answer"],
                user_answer=None,
                is_correct=None,
            )
            for q in data["mcq"]
        ])

    # 4️⃣ Create Short Answer (only if missing)
    if not short_exists:
        short_attempt = ShortAnswerAttempt(
            session_id=session.id,
            total_questions=len(data["short_answers"]),
            total_score=None,
        )
        db.add(short_attempt)
        await db.flush()

        db.add_all([
            ShortAnswer(
                attempt_id=short_attempt.id,
                question=a["question"],
                correct_answer=a["answer"],
                user_answer=None,
                score=None,
                feedback=None,
            )
            for a in data["short_answers"]
        ])

    await db.commit()