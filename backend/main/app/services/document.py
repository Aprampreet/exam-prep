from pathlib import Path
from typing import List

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.services.ocr_service import extract_text_from_pdf


class DocumentService:
    def __init__(
        self,
        chunk_size: int = 800,
        chunk_overlap: int = 200,
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
        )

    def load_document(self, file_path: str) -> List[str]:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"file not found: {file_path}")

        loader = PyPDFLoader(file_path)
        documents = loader.load()

        full_text = " ".join(d.page_content for d in documents)

        if len(full_text.strip()) > 200:
            chunks = self.splitter.split_documents(documents)
            return [c.page_content for c in chunks]

       

        print("[OCR] No text found, running ...")
        ocr_text = extract_text_from_pdf(file_path)

        if not ocr_text or len(ocr_text) < 200:
            raise ValueError("OCR failed or text too small")
        print(ocr_text)

        return self.splitter.split_text(ocr_text)
