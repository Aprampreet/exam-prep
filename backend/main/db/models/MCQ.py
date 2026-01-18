from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import func
from datetime import datetime
from db.base import Base

class MCQAttempt(Base):
    __tablename__ = "mcq_attempts"

    id: Mapped[int] = mapped_column(primary_key=True)

    session_id: Mapped[int] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    total_questions: Mapped[int]
    score: Mapped[int | None]

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    session: Mapped["Session"] = relationship(
        back_populates="mcq_attempt"
    )

    questions: Mapped[list["MCQQuestion"]] = relationship(
        back_populates="attempt",
        cascade="all, delete-orphan"
    )
