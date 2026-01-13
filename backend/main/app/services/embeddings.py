from langchain_google_genai import GoogleGenerativeAIEmbeddings
from typing import List
from app.core.config import settings


EMBEDDING_MODEL="models/gemini-embedding-001"
EMBEDDING_DIM = 768 

class EmbeddingService:
    def __init__(self):
        self.embedding_client = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL, api_key=settings.GOOGLE_API_KEY)

    def embed_text(self, text: str) -> List[float]:

        return self.embedding_client.embed_query(text)

    def embed_texts(self, texts: list[str]) -> list[list[float]]:

        return self.embedding_client.embed_documents(texts)