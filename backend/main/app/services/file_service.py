from pathlib import Path
import uuid
import httpx


async def download_file_from_url(url: str, suffix=".pdf") -> Path:
    temp_path = Path("temp") / f"{uuid.uuid4()}{suffix}"
    temp_path.parent.mkdir(exist_ok=True)

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        with open(temp_path, "wb") as f:
            f.write(response.content)

    return temp_path
