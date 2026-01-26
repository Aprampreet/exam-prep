import json
from typing import List, Dict

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

from app.core.config import settings
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models.Session import Session
from db.models import MCQAttempt, ShortAnswerAttempt, DocumentChunk
from db.models.MCQans import MCQQuestion
from db.models.ShortAnswer import ShortAnswer


gemini_llm = ChatGoogleGenerativeAI(
    api_key=settings.GOOGLE_API_KEY,
    model="gemini-2.5-flash-lite",
    temperature=0.2,
    max_tokens=None,
)

groq_llm = ChatGroq(
    api_key=settings.GROQ_API_KEY,
    model="llama-3.1-8b-instant",
    temperature=0.2,
)

async def run_llm(prompt: str, primary: str, purpose: str = ""):
    try:
        if primary == "groq":
            print(f"Groq | {purpose}")
            return await groq_llm.ainvoke(prompt)
        else:
            print(f"Gemini | {purpose}")
            return await gemini_llm.ainvoke(prompt)
    except Exception as e:
        if primary == "groq":
            print(f"Groq failed: {e} → Switching to Gemini | {purpose}")
            return await gemini_llm.ainvoke(prompt)
        else:
            print(f"Gemini failed: {e} → Switching to Groq | {purpose}")
            return await groq_llm.ainvoke(prompt)




async def generate_assessment(context: str) -> dict:

    prompt = f"""
You are an expert academic examiner.

TASK:
- Generate EXACTLY 20 multiple choice questions (MCQs) covering the entire provided content.
- Generate EXACTLY 10 detailed short-answer questions (worth 5 marks each).
- Use ONLY the provided content.

STRICT RULES:
1. MCQs:
   - Must have 4 options.
   - Only 1 correct option.
   - Questions should be of good quality and must be of good level.
   - Questions MUST range in difficulty from Low to Hard (Progressive difficulty).

2. Short Answer Questions (5 Marks type):
   - Questions MUST range in difficulty from Low to Hard.
   - The "answer" field MUST be a CONCISE "Ideal Answer".
   - Questions should be of good quality and must be of good level.
   - The Ideal Answer STRICT RULES:
     * MAX 2-3 lines total.
     * MUST contain specific "Keywords" and "Understandings".
     * DO NOT write long paragraphs. Keep it dense and grading-focused.

3. OUTPUT FORMAT (JSON ONLY):
{{
  "mcq": [
    {{
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "Option Text"
    }},
    ... (20 items)
  ],
  "short_answers": [
    {{
      "question": "Deep conceptual question...",
      "answer": "Keywords: [key1, key2]. Understanding: [Core concept 1, Core concept 2]."
    }},
    ... (10 items)
  ]
}}

CONTENT:
{context}
"""

    response = await run_llm(prompt, primary="gemini")

    if not response or not getattr(response, "content", None):
        raise ValueError("Empty AI response")

    raw = str(response.content).strip()

    if raw.startswith("```"):
        raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON from AI: {e}\nRAW:\n{raw}")

    if not isinstance(data, dict):
        raise ValueError("AI response is not a JSON object")

    if "mcq" not in data or "short_answers" not in data:
        raise ValueError("Missing mcq or short_answers keys")
    
    if len(data["mcq"]) < 10 or len(data["short_answers"]) < 5:
        raise ValueError(f"AI returned insufficient questions: {len(data.get('mcq', []))} MCQs, {len(data.get('short_answers', []))} Short Answers")

    for q in data["mcq"]:
        if (
            "question" not in q
            or "options" not in q
            or "correct_answer" not in q
            or len(q["options"]) != 4
        ):
            pass 

    for a in data["short_answers"]:
        if "question" not in a or "answer" not in a:
            raise ValueError("Invalid short answer schema")

    return data

async def ensure_assessment_generated(
    session: Session,
    db: AsyncSession,
):
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
        return  

    result = await db.execute(
        select(DocumentChunk)
        .where(DocumentChunk.session_id == session.id)
        .order_by(DocumentChunk.chunk_index)
    )
    chunks = result.scalars().all()
    if not chunks:
        raise ValueError("No chunks found")

    full_text = "\n".join(c.content for c in chunks)
    context = full_text[:30000] 

    data = await generate_assessment(context)

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


async def chat_rag_with_memory(
    doc_context: str,
    history: str,
    question: str,
) -> str:
    prompt = f"""
You are an AI study tutor.

RULES:
- If the question is about weak areas or revision, use WEAK AREAS.
- If the question is conceptual, use STUDY MATERIAL.
- Study the material and you can also little bit menuplate the material to answer the question.
- If the question is about a topic that is not in the material, use your knowledge to answer the question.
- If the question is about a topic that is not in the material, provide full discription that it is not in material.
- Be concise, clear, and helpful.
- Do NOT hallucinate.
- If the answer cannot be inferred, say so clearly.

CONTEXT:
{doc_context}   

CHAT HISTORY:
{history}

USER QUESTION:
{question}
"""

    response = await run_llm(prompt,primary="groq",purpose="Chat")

    if not response or not getattr(response, "content", None):
        raise ValueError("Empty AI response")

    return response.content.strip()


async def generate_ai_insight(weak_chunks, wrong_questions):
    context = "\n".join(weak_chunks)[:2500]

    mistakes = "\n".join(
        f"- Q: {q['question']}\n  Student Answer: {q['user_answer']}\n  Correct Answer: {q['correct_answer']}"
        for q in wrong_questions[:5]
    )

    prompt = f"""
You are a Personal Exam Performance Coach. Your student has just taken a quiz and made some mistakes.
Your job is to analyze these mistakes and provide a high-impact, actionable recovery plan.

TASK:
1. Identify the specific CONCEPTUAL GAPS based on the mistakes.
2. Explain WHY the student likely got it wrong (e.g., confusion between similar terms, calculation error, missing key fact).
3. Do NOT just say "You got question 1 wrong." Explain the underlying concept they missed.
4. Provide a concrete "Next Step" for revision.

OUTPUT FORMAT (Markdown):
### Diagnosis
(One sentence summary of the weak area)

### Root Cause Analysis
- **Concept X**: You confused A with B. Remember that...
- **Concept Y**: You missed the key detail about...

### Action Plan
1. Review the section on [Topic].
2. Focus specifically on [Detail].

RELEVANT CONTENT:
{context}

STUDENT MISTAKES:
{mistakes}
"""

    response = await run_llm(prompt,primary="groq",purpose="AI Insight")
    return response.content.strip()


import json

async def evaluate_short_answer(
    question: str,
    correct_answer: str,
    user_answer: str
) -> dict:
    prompt = f"""
You are an expert examiner grading a short-answer response.

GRADING RULES:
- Score must be an INTEGER between 0 and 5
- 0 = completely incorrect or irrelevant
- 3 = partially correct but missing key points
- 5 = fully correct and complete
- Be fair and strict

TASK:
1. Compare the student's answer against the Key Concepts and Understanding provided in the CORRECT ANSWER.
2. Check if the 'Keywords' and 'Understandings' are present/explained in the student's answer.
3. Assign a score from 0 to 5 based on how many key concepts were covered.
4. Provide brief, constructive feedback (1–2 sentences max).

STRICT OUTPUT RULES:
- Return ONLY valid JSON
- Do NOT add explanations outside JSON
- Do NOT use markdown

JSON FORMAT:
{{
  "score": 0,
  "feedback": "Short constructive feedback"
}}

QUESTION:
{question}

CORRECT ANSWER:
{correct_answer}

STUDENT ANSWER:
{user_answer}
"""

    response = await run_llm(prompt, primary="groq", purpose="Short Answer Evaluation")

    if not response or not getattr(response, "content", None):
        return {
            "score": 0,
            "feedback": "No response from AI. Please review manually."
        }

    raw = str(response.content).strip()

    if raw.startswith("```"):
        raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return {
            "score": 0,
            "feedback": "Automatic grading failed. Please review manually."
        }
    if (
        not isinstance(data, dict)
        or "score" not in data
        or "feedback" not in data
        or not isinstance(data["score"], int)
        or data["score"] < 0
        or data["score"] > 5
    ):
        return {
            "score": 0,
            "feedback": "Invalid grading response. Please review manually."
        }

    return data

