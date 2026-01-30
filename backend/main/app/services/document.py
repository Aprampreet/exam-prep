from pathlib import Path
from typing import List

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.services.ocr_service import extract_text_with_ocr


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
            raise FileNotFoundError(f"File not found: {file_path}")

        loader = PyPDFLoader(file_path)
        documents = loader.load()

        full_text = " ".join(d.page_content for d in documents)

       

        print("[OCR] No text found, running OCR...")
        ocr_text = extract_text_with_ocr(file_path)

        if not ocr_text or len(ocr_text) < 200:
            raise ValueError("OCR failed or text too small")

        return self.splitter.split_text(ocr_text)
