from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    phone_number: str
    password: str   

class UserOut(BaseModel):
    id: int
    email: EmailStr
    phone_number: str
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str 
