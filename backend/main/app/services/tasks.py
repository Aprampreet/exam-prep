import os
import asyncio
from sqlalchemy import update

from app.services.document import DocumentService
from app.services.file_service import download_file_from_url
from app.services.embeddings import EmbeddingService

from db.models.DocumentChunk import DocumentChunk
from db.models.Session import Session
from db.session import AsyncSessionLocal


document_service = DocumentService()
embedding_service = EmbeddingService()


async def process_document_from_cloudinary(session_id: int, file_url: str):
    BATCH_SIZE = 10

    try:
        local_path = await download_file_from_url(file_url)

        chunks = await asyncio.to_thread(
            document_service.load_document,
            str(local_path),
        )

        embeddings = []
        for i in range(0, len(chunks), BATCH_SIZE):
            batch = chunks[i : i + BATCH_SIZE]
            embeddings.extend(embedding_service.embed_texts(batch))

        print(f"[Session {session_id}] Chunks created: {len(chunks)}")

        async with AsyncSessionLocal() as db:
            db.add_all(
                [
                    DocumentChunk(
                        session_id=session_id,
                        chunk_index=i,
                        content=chunk,
                        embedding=embedding,
                    )
                    for i, (chunk, embedding) in enumerate(
                        zip(chunks, embeddings)
                    )
                ]
            )

            await db.execute(
                update(Session)
                .where(Session.id == session_id)
                .values(status="completed")
            )

            await db.commit()

        os.remove(local_path)

    except Exception as e:
        async with AsyncSessionLocal() as db:
            await db.execute(
                update(Session)
                .where(Session.id == session_id)
                .values(status="failed")
            )
            await db.commit()

        print(f"[Session {session_id}] FAILED:", e)
