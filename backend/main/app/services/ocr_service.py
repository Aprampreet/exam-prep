import cv2
import pytesseract
import numpy as np
from pdf2image import convert_from_bytes

def preprocess(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(
        blur,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )
    return thresh

def extract_text_with_ocr(pdf_bytes: bytes) -> str:
    pages = convert_from_bytes(pdf_bytes, dpi=300)
    full_text = ""

    for page in pages:
        img = np.array(page)
        processed = preprocess(img)

        text = pytesseract.image_to_string(
            processed,
            config="--oem 3 --psm 6"
        )

        if text.strip():
            full_text += text + "\n"

    return full_text.strip()
