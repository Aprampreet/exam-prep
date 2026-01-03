from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db.base import Base
from db.session import engine
from db.deps import get_db
from db.models.user import User
from auth.router import auth_router
from auth.dependancy import get_current_user
from auth.schemas import UserOut
app = FastAPI(title="Exam Prep API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)






@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/me", response_model=UserOut)
async def get_me(
    user: User = Depends(get_current_user),
):
    return user


app.include_router(auth_router)     