from pydantic import BaseModel
from datetime import datetime


class SessionOut(BaseModel):
    id: int
    title: str | None
    original_file_url: str | None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True



class MCQAttemptOut(BaseModel):
    id: int
    session_id: int
    total_questions: int
    score: int | None
    questions: list[dict]
    created_at: datetime

    class Config:
        from_attributes = True


class ShortAnswerAttemptOut(BaseModel):
    id: int
    session_id: int
    total_questions: int
    total_score: int | None
    answers: list[dict]
    created_at: datetime

    class Config:
        from_attributes = True
