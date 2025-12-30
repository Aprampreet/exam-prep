from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from db.base import Base

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    phone_number: Mapped[str] = mapped_column(String)
    hashed_password: Mapped[str] = mapped_column(String)
