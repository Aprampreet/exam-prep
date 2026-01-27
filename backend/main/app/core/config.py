from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
from typing import List, Union, Any
from pydantic import field_validator
from pydantic_settings import BaseSettings
import json
load_dotenv()  

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str = "super-secret-key"

    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    CORS_ORIGINS: Any

    GOOGLE_API_KEY: str
    GROQ_API_KEY: str
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> List[str]:
        if isinstance(v, list):
            return v
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return []
            if v.startswith("[") and v.endswith("]"):
                try:
                    import json
                    return json.loads(v)
                except json.JSONDecodeError:
                    pass
            return [i.strip() for i in v.split(",")]
        return []

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()