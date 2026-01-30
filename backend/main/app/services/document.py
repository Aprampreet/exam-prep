from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from pathlib import Path
from typing import List


class DocumentService:
    def __init__(
        self,
        chunk_size: int = 800,
        chunk_overlap: int = 200
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )

    def load_document(self, file_path: str) -> List[str]:
        if not Path(file_path).exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        loader = PyPDFLoader(file_path)
        documents = loader.load()

        chunks = self.splitter.split_documents(documents)

        return [chunk.page_content for chunk in chunks]
        if chunks:
            return [chunk.page_content for chunk in chunks]

        print("[OCR] No text found, running OCR...")

        ocr_text = extract_text_with_ocr(file_path)

        if not ocr_text or len(ocr_text) < 200:
            raise ValueError("OCR failed or text too small")

        ocr_chunks = self.splitter.split_text(ocr_text)
        return ocr_chunks
