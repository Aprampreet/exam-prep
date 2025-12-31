from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db.base import Base
from db.session import engine
from db.deps import get_db
from db.models.user import User
from auth.router import auth_router
from auth.dependancy import get_current_user
app = FastAPI(title="Exam Prep API")






@app.get('/health')
def health(current_user: User = Depends(get_current_user)):
    return {'status': 'ok'}

app.include_router(auth_router)     