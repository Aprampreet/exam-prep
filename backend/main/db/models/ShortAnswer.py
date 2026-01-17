from sqlalchemy import Integer, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import func
from datetime import datetime
from db.base import Base


class ShortAnswer(Base):
    __tablename__ = "short_answers"

    id: Mapped[int] = mapped_column(primary_key=True)

    attempt_id: Mapped[int] = mapped_column(
        ForeignKey("short_answer_attempts.id", ondelete="CASCADE"),
        nullable=False
    )

    question: Mapped[str]
    correct_answer: Mapped[str]

    user_answer: Mapped[str | None]
    score: Mapped[int | None]
    feedback: Mapped[str | None]

    attempt: Mapped["ShortAnswerAttempt"] = relationship(
        back_populates="answers"
    )
