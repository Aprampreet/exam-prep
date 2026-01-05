from fastapi import APIRouter,Depends,HTTPException,Form
from app.views.schemas import SessionOut
from fastapi import File
from auth.dependancy import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from db.deps import get_db
from db.models.user import User
from fastapi import UploadFile
from cloudinary.uploader import upload
from db.models.Session import Session
session_router = APIRouter(prefix="/session", tags=["session"])


@session_router.post("/create", response_model=SessionOut)
async def create_session(
    title: str | None = Form(None),
    file: UploadFile | None = File(None),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        file_url = None

        if file:
            result = upload(
                file.file,
                folder="study_sessions",
                resource_type="raw"
            )
            file_url = result["secure_url"]

        session = Session(
            title=title,
            user_id=user.id,
            original_file_url=file_url,
            status="created"
        )

        db.add(session)
        await db.commit()
        await db.refresh(session)

        return session

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))