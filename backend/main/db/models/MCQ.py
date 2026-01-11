from sqlalchemy import Integer, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import func
from datetime import datetime
from db.base import Base
from db.models.Session import Session

class MCQAttempt(Base):
    __tablename__ = "mcq_attempts"

    id: Mapped[int] = mapped_column(primary_key=True)

    session_id: Mapped[int] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    total_questions: Mapped[int] = mapped_column(default=20)
    score: Mapped[int | None] = mapped_column(nullable=True)

    questions: Mapped[list[dict]] = mapped_column(JSON, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    session: Mapped["Session"] = relationship(
        "Session",
        back_populates="mcq_attempt"
    )
