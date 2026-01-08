import requests
from pathlib import Path
import uuid


def download_file_from_url(url: str, suffix=".pdf") -> Path:
    response = requests.get(url)
    response.raise_for_status()
    temp_path = Path("temp") / f"{uuid.uuid4()}{suffix}"
    temp_path.parent.mkdir(exist_ok=True)

    with open(temp_path, "wb") as f:
        f.write(response.content)

    return temp_path
