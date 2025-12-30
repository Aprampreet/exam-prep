from fastapi import APIRouter,Depends,HTTPException,status,Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi.security import OAuth2PasswordRequestForm

from db.deps import get_db
from db.models.user import User
from auth.security import hash_password, verify_password
from auth.schemas import UserCreate, UserLogin,UserOut
from app.core.ratelimiter import limiter
from auth.jwt import create_access_token, create_refresh_token, decode_token



auth_router = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/register", response_model=UserOut)
@limiter.limit("5/minute")
async def register(
    request: Request,
    data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        result = await db.execute(
            select(User).where(User.email == data.email)
        )
        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        user = User(
            email=data.email,
            phone_number=data.phone_number,
            hashed_password=hash_password(data.password)
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

        return user

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@auth_router.post("/login")
@limiter.limit("5/minute")
async def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(User).where(User.email == form_data.username)
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }