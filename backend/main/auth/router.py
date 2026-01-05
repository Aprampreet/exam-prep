from fastapi import APIRouter,Depends,HTTPException,status,Request,File,UploadFile,Request,Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi.security import OAuth2PasswordRequestForm
from db.models.Profile import Profile
from db.deps import get_db
from db.models.user import User
from auth.security import hash_password, verify_password
from auth.schemas import UserCreate, UserLogin,UserOut,ProfileCreate,ProfileOut
from app.core.ratelimiter import limiter
from auth.jwt import create_access_token, create_refresh_token, decode_token
from cloudinary.uploader import upload
from .dependancy import get_current_user

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/register", response_model=UserOut)
@limiter.limit("5/minute")
async def register(
    request: Request,
    data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        result = await db.execute(select(User).where(User.email == data.email))
        existing_user = result.scalar_one_or_none()
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        user = User(email=data.email, phone_number=data.phone_number, hashed_password=hash_password(data.password))
        profile = Profile(user=user)  
        db.add(user)
        db.add(profile)
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
    result = await db.execute(select(User).where(User.email == form_data.username))
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


@auth_router.get("/profile", response_model=ProfileOut)
@limiter.limit("5/minute")
async def get_profile(
    request: Request,
    user: User = Depends(get_current_user)
):
    return user.profile


@auth_router.put("/update/profile", response_model=ProfileOut)
@limiter.limit("5/minute")
async def update_profile(
    request: Request,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),

    full_name: str | None = Form(None),
    bio: str | None = Form(None),
    college: str | None = Form(None),
    location: str | None = Form(None),
    degree: str | None = Form(None),
    passing_year: int | None = Form(None),

    avatar: UploadFile | None = File(None),
):
    profile = user.profile
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    if full_name is not None:
        profile.full_name = full_name
    if bio is not None:
        profile.bio = bio
    if college is not None:
        profile.college = college
    if location is not None:
        profile.location = location
    if degree is not None:
        profile.degree = degree
    if passing_year is not None:
        profile.passing_year = passing_year

    if avatar:
        result = upload(
            avatar.file,
            folder="profiles",
            public_id=f"user_{user.id}",
            overwrite=True
        )
        profile.avatar_url = result["secure_url"]

    await db.commit()
    await db.refresh(profile)
    return profile
