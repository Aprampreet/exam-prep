import json
from typing import List, Dict
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings


llm = ChatGoogleGenerativeAI(
    api_key=settings.GOOGLE_API_KEY,
    model="gemini-2.5-flash-lite",
    temperature=0.2,
    max_tokens=400,
)


async def generate_mcq(context: str, count: int = 2) -> List[Dict]:
    """
    Generate MCQs in a format compatible with MCQAttempt.questions
    """

    context = context[:3000]

    prompt = f"""
Generate exactly {count} multiple choice questions from the content below.

Rules:
- Use ONLY the given content
- Each question must have exactly 4 options
- Only one option is correct
- Return ONLY a JSON array
- Do NOT use markdown
- Do NOT add explanations

JSON format:
[
  {{
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }}
]

CONTENT:
{context}
"""

    response = await llm.ainvoke(prompt)

    if not response or not getattr(response, "content", None):
        raise ValueError("LLM returned empty response")

    raw_text = str(response.content).strip()

    if raw_text.startswith("```"):
        raw_text = raw_text.replace("```json", "").replace("```", "").strip()

    try:
        raw_mcqs = json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON from LLM: {e}")

    if not isinstance(raw_mcqs, list):
        raise ValueError("MCQ output is not a list")

    if len(raw_mcqs) != count:
        raise ValueError(f"Expected {count} MCQs, got {len(raw_mcqs)}")

    normalized_mcqs: List[Dict] = []

    for q in raw_mcqs:
        if "question" not in q or "options" not in q:
            raise ValueError("Invalid MCQ schema from LLM")

        correct = q.get("correct_answer") or q.get("answer")
        if not correct:
            raise ValueError("Correct answer missing in MCQ")

        if len(q["options"]) != 4:
            raise ValueError("Each MCQ must have exactly 4 options")

        normalized_mcqs.append({
            "question": q["question"],
            "options": q["options"],
            "correct_answer": correct,
            "user_answer": None,
            "is_correct": None,
        })

    return normalized_mcqs


async def generate_short_answer(context: str, count: int = 2) -> list[dict]:
    context = context[:3000]

    prompt = f"""
Generate exactly {count} short answer questions from the content below.

Rules:
- Use ONLY the given content
- Each answer must be a single sentence
- Return ONLY a JSON array
- Do NOT use markdown
- Do NOT add explanations

JSON format:
[
  {{
    "question": "Question text",
    "answer": "Answer text"
  }}
]

CONTENT:
{context}
"""

    response = await llm.ainvoke(prompt)

    if not response or not getattr(response, "content", None):
        raise ValueError("LLM returned empty response")

    raw_text = str(response.content).strip()

    if raw_text.startswith("```"):
        raw_text = raw_text.replace("```json", "").replace("```", "").strip()

    raw_answers = json.loads(raw_text)

    if not isinstance(raw_answers, list):
        raise ValueError("Answer output is not a list")

    if len(raw_answers) != count:
        raise ValueError(f"Expected {count} answers, got {len(raw_answers)}")

    for a in raw_answers:
        if "question" not in a or "answer" not in a:
            raise ValueError("Invalid short answer schema from LLM")

    return raw_answers
