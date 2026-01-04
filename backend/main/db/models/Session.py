from db.base import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy import func
from sqlalchemy.orm import relationship
from datetime import datetime
class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title : Mapped[str] = mapped_column(String)
    original_file_url : Mapped[str] = mapped_column(String)
    status : Mapped[str] = mapped_column(String,default="created")
    created_at : Mapped[datetime] = mapped_column(DateTime,default=datetime.utcnow)
    updated_at : Mapped[datetime] = mapped_column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
    user : Mapped["User"] = relationship("User",back_populates="sessions")
