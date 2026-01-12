import os
from app.services.document import DocumentService
from app.services.file_service import download_file_from_url
from db.models.DocumentChunk import DocumentChunk
from db.session import AsyncSessionLocal
document_service = DocumentService()

async def process_document_from_cloudinary(
    session_id: int,
    file_url: str,
):
    try:
        local_path = download_file_from_url(file_url)
        chunks = document_service.load_document(str(local_path))

        print(f"[Session {session_id}] Chunks created:", len(chunks))
        async with AsyncSessionLocal() as db:
            for idx, chunk_text in enumerate(chunks):
                db.add(
                    DocumentChunk(
                        session_id=session_id,
                        chunk_index=idx,
                        content=chunk_text,
                        embedding=None,  
                    )
                )

            await db.commit()

        os.remove(local_path)

    except Exception as e:
        print(f"[Session {session_id}] Processing failed:", e)
