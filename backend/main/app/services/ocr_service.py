import cv2
import pytesseract
import numpy as np
import re
import fitz
from typing import List


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



def _is_garbage(text: str) -> bool:
    if len(text) < 40:
        return True
    if sum(c.isalpha() for c in text) < 20:
        return True
    if text.count(" ") < 5:
        return True
    return False




def extract_text_from_pdf(pdf_path: str) -> str:
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"[OCR] Failed to open PDF {pdf_path}: {e}")
        return ""

    print(f"[OCR] Processing {pdf_path} with PyMuPDF...")

    collected: List[str] = []

    for i, page in enumerate(doc):
        text = page.get_text()
        
        if len(text.strip()) < 50:
            print(f"[OCR] Page {i+1} has little text ({len(text.strip())} chars). Attempting OCR...")
            
            pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))
            
            img_data = np.frombuffer(pix.samples, dtype=np.uint8)
            
            if pix.n == 3: 
                 img = img_data.reshape((pix.h, pix.w, 3))
                 img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            elif pix.n == 4: 
                 img = img_data.reshape((pix.h, pix.w, 4))
                 img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR)
            else: 
                 img = img_data.reshape((pix.h, pix.w))
                 img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

            processed = _preprocess(img)
            ocr_text = _ocr_ensemble(processed)
            
            if len(ocr_text.strip()) > len(text.strip()):
                text = ocr_text

        text = _clean_text(text)

        if text and not _is_garbage(text):
            collected.append(text)

    return "\n\n".join(collected)
