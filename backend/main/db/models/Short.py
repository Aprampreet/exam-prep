from sqlalchemy import Integer, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import func
from datetime import datetime
from db.base import Base


class ShortAnswerAttempt(Base):
    __tablename__ = "short_answer_attempts"

    id: Mapped[int] = mapped_column(primary_key=True)

    session_id: Mapped[int] = mapped_column(
        ForeignKey("sessions.id"),
        nullable=False,
        unique=True
    )

    total_questions: Mapped[int] = mapped_column(
        Integer,
        default=10
    )

    total_score: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    answers: Mapped[list[dict]] = mapped_column(
        JSON,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    session: Mapped["Session"] = relationship("Session")
