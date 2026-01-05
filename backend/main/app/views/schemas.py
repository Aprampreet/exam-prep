from pydantic import BaseModel
from datetime import datetime


class SessionOut(BaseModel):
    id: int
    title: str | None
    original_file_url: str | None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
