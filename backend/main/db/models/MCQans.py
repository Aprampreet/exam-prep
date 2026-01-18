from sqlalchemy import ForeignKey,JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from db.base import Base

class MCQQuestion(Base):
    __tablename__ = "mcq_questions"

    id: Mapped[int] = mapped_column(primary_key=True)

    attempt_id: Mapped[int] = mapped_column(
        ForeignKey("mcq_attempts.id", ondelete="CASCADE"),
        nullable=False
    )

    question: Mapped[str]

    options: Mapped[list[str]] = mapped_column(JSON, nullable=False)

    correct_answer: Mapped[str]

    user_answer: Mapped[str | None]
    is_correct: Mapped[bool | None]

    attempt: Mapped["MCQAttempt"] = relationship(
        back_populates="questions"
    )
