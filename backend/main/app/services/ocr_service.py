import cv2
import pytesseract
import numpy as np
import re
from typing import List
from pdf2image import convert_from_path


# ---------------------------
# Image preprocessing
# ---------------------------

def _preprocess(img: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    gray = clahe.apply(gray)

    gray = cv2.fastNlMeansDenoising(gray, None, 30, 7, 21)

    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        15,
        3,
    )

    return thresh


# ---------------------------
# OCR ensemble
# ---------------------------

PSMS = ["6", "11", "4"]


def _ocr_ensemble(img: np.ndarray) -> str:
    best_text = ""
    best_score = 0

    for psm in PSMS:
        text = pytesseract.image_to_string(
            img,
            lang="eng",
            config=f"--oem 3 --psm {psm}",
        )

        score = sum(c.isalpha() for c in text)
        if score > best_score:
            best_text = text
            best_score = score

    return best_text


# ---------------------------
# Confidence-based OCR
# ---------------------------

def _confidence_filter(img: np.ndarray) -> str:
    data = pytesseract.image_to_data(
        img,
        lang="eng",
        output_type=pytesseract.Output.DICT,
        config=(
            "--oem 3 --psm 6 "
            "-c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        ),
    )

    words = []
    for i in range(len(data["text"])):
        try:
            conf = int(data["conf"][i])
            word = data["text"][i].strip()
            if conf >= 50 and len(word) > 1:
                words.append(word)
        except Exception:
            continue

    return " ".join(words)


# ---------------------------
# Text cleanup
# ---------------------------

def _clean_text(text: str) -> str:
    text = re.sub(r"[^\x00-\x7F]+", " ", text)

    replacements = {
        "|": "I",
        "ﬁ": "fi",
        "ﬂ": "fl",
        "—": "-",
        "–": "-",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)

    text = re.sub(r"\d+\.\d+-\d+", "", text)

    lines = [l.strip() for l in text.splitlines() if len(l.strip()) > 3]
    text = " ".join(lines)
    text = re.sub(r"\s+", " ", text)

    return text.strip()


# ---------------------------
# Garbage detection
# ---------------------------

def _is_garbage(text: str) -> bool:
    if len(text) < 40:
        return True
    if sum(c.isalpha() for c in text) < 20:
        return True
    if text.count(" ") < 5:
        return True
    return False


# ---------------------------
# MAIN OCR FUNCTION
# ---------------------------

def extract_text_with_ocr(pdf_path: str) -> str:
    pages = convert_from_path(pdf_path, dpi=300)
    print("[OCR] Using OCR")

    collected: List[str] = []

    for page in pages:
        img = np.array(page)
        processed = _preprocess(img)

        text = _ocr_ensemble(processed)

        if len(text.strip()) < 80:
            text = _confidence_filter(processed)

        text = _clean_text(text)

        if text and not _is_garbage(text):
            collected.append(text)

    return "\n\n".join(collected)
