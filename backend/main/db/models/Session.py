from db.base import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy import func
from sqlalchemy.orm import relationship
from datetime import datetime
from db.models.DocumentChunk import DocumentChunk
class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(String)
    original_file_url: Mapped[str] = mapped_column(String)

    status: Mapped[str] = mapped_column(String, default="created")

    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user = relationship("User", back_populates="sessions")
    mcq_attempt: Mapped["MCQAttempt | None"] = relationship(
        "MCQAttempt",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )
    short_answer_attempt: Mapped["ShortAnswerAttempt | None"] = relationship(
        "ShortAnswerAttempt",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )
    chunks = relationship(
        "DocumentChunk",
        back_populates="session",
        cascade="all, delete-orphan",
        order_by="DocumentChunk.chunk_index"
    )
