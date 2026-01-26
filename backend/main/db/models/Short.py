from sqlalchemy import Integer, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import func
from datetime import datetime
from db.base import Base


class ShortAnswerAttempt(Base):
    __tablename__ = "short_answer_attempts"

    id: Mapped[int] = mapped_column(primary_key=True)

    session_id: Mapped[int] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    total_questions: Mapped[int]
    total_score: Mapped[int | None]

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    # 🔹 REQUIRED
    session: Mapped["Session"] = relationship(
        back_populates="short_answer_attempt"
    )

    answers: Mapped[list["ShortAnswer"]] = relationship(
        back_populates="attempt",
        cascade="all, delete-orphan",
        order_by="ShortAnswer.id"
    )
