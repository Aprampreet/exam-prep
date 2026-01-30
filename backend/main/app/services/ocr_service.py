import cv2
import pytesseract
import numpy as np
from pdf2image import convert_from_bytes


def _preprocess(img: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    gray = clahe.apply(gray)

    denoised = cv2.fastNlMeansDenoising(gray, None, 30, 7, 21)
    thresh = cv2.adaptiveThreshold(
        denoised,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    return thresh


PSMS = ["6", "11", "4"]  


def _ocr_ensemble(img: np.ndarray) -> str:
    best_text = ""
    best_len = 0

    for psm in PSMS:
        text = pytesseract.image_to_string(
            img,
            lang="eng",
            config=f"--oem 3 --psm {psm} -c preserve_interword_spaces=1"
        )

        if len(text) > best_len:
            best_text = text
            best_len = len(text)

    return best_text


def _confidence_filter(img: np.ndarray) -> str:
    data = pytesseract.image_to_data(
        img,
        lang="eng",
        output_type=pytesseract.Output.DICT,
        config="--oem 3 --psm 6"
    )

    words = []
    for i in range(len(data["text"])):
        try:
            conf = int(data["conf"][i])
            if conf > 50 and data["text"][i].strip():
                words.append(data["text"][i])
        except ValueError:
            pass

    return " ".join(words)


def _clean_text(text: str) -> str:
    lines = [l.strip() for l in text.splitlines() if len(l.strip()) > 3]
    text = "\n".join(lines)

    fixes = {
        "|": "I",
        "0": "O",
        "ﬁ": "fi",
        "ﬂ": "fl",
    }

    for k, v in fixes.items():
        text = text.replace(k, v)

    return text


def extract_text_with_ocr(pdf_bytes: bytes) -> str:
    pages = convert_from_bytes(pdf_bytes, dpi=300)
    full_text = []

    for page in pages:
        img = np.array(page)
        processed = _preprocess(img)

        text = _ocr_ensemble(processed)

        if len(text.strip()) < 50:
            text = _confidence_filter(processed)

        text = _clean_text(text)

        if text:
            full_text.append(text)

    return "\n\n".join(full_text)
