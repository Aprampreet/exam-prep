import os
from app.services.document import DocumentService
from app.services.file_service import download_file_from_url

document_service = DocumentService()

async def process_document_from_cloudinary(
    session_id: int,
    file_url: str,
):
    try:
        local_path = download_file_from_url(file_url)
        chunks = document_service.load_document(str(local_path))

        print(f"[Session {session_id}] Chunks created:", len(chunks))

        os.remove(local_path)

    except Exception as e:
        print(f"[Session {session_id}] Processing failed:", e)
