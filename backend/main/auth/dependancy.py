from fastapi import Depends,HTTPException,status
from app.core.config import settings
from auth.jwt import create_access_token, create_refresh_token, decode_token
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from db.deps import get_db
from db.models.user import User
from auth.security import verify_password
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import selectinload


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    result = await db.execute(
        select(User)
        .options(selectinload(User.profile)) 
        .where(User.email == payload["sub"])
    )

    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user