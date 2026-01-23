from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List,Literal
from pydantic.config import ConfigDict

class SessionOut(BaseModel):
    id: int
    title: str | None
    original_file_url: str | None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class MCQQuestionOut(BaseModel):
    id: int
    question: str
    options: list[str]
    correct_answer: str
    user_answer: str | None
    is_correct: bool | None

    model_config = ConfigDict(from_attributes=True)


class MCQAttemptOut(BaseModel):
    id: int
    session_id: int
    total_questions: int
    score: int | None
    created_at: datetime

    questions: list[MCQQuestionOut]

    model_config = ConfigDict(from_attributes=True)


class ShortAnswerOut(BaseModel):
    id: int
    question: str
    correct_answer: str
    user_answer: Optional[str]
    score: Optional[int]
    feedback: Optional[str]

    model_config = ConfigDict(from_attributes=True)
    
class ShortAnswerAttemptOut(BaseModel):
    id: int
    session_id: int
    total_questions: int
    total_score: Optional[int]
    created_at: datetime

    answers: List[ShortAnswerOut]

    model_config = ConfigDict(from_attributes=True)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []

class MCQSubmitRequest(BaseModel):
    answers: dict[int, str]