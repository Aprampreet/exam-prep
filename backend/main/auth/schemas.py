from pydantic import BaseModel, EmailStr

class ProfileCreate(BaseModel):
    full_name: str | None = None
    bio: str | None = None
    college: str | None = None
    location: str | None = None
    degree: str | None = None
    passing_year: int | None = None

class ProfileOut(ProfileCreate):
    id: int
    avatar_url: str | None = None

    class Config:
        from_attributes = True

class UserProfileResponse(ProfileOut):
    email: EmailStr
    phone_number: str

class UserCreate(BaseModel):
    email: EmailStr
    phone_number: str
    password: str   

class UserLogin(BaseModel):
    email: EmailStr
    password: str 

class UserOut(BaseModel):
    id: int
    email: EmailStr
    phone_number: str
    profile: ProfileOut | None = None

    class Config:
        from_attributes = True