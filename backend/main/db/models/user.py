from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from db.base import Base
from db.models.Session import Session
from db.models.Profile import Profile
from typing import List


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    phone_number: Mapped[str] = mapped_column(String)
    hashed_password: Mapped[str] = mapped_column(String)

    profile: Mapped["Profile"] = relationship(
        "Profile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )
    sessions: Mapped[list["Session"]] = relationship(
            "Session",
            back_populates="user",
            cascade="all, delete-orphan"
        )

