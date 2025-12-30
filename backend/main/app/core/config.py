from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str = "super-secret-key"
    APP_NAME: str = "ExamPrep API"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
