# ScribeMind Backend ⚙️

This directory contains the **FastAPI (Python)** server application for **ScribeMind**, responsible for document scanning, OCR preprocessing, RAG embeddings generation, and dual-LLM fallback assessments.

For full architectural diagrams, frontend configurations, and main guidelines, please refer to the primary [**Project Root README.md**](../../README.md).

---

## 🛠️ Backend Stack
* **Framework**: FastAPI (using asynchronous routers and uvicorn server)
* **Database & ORM**: PostgreSQL, SQLAlchemy (async engine), pgvector
* **Migrations**: Alembic
* **AI Core**: LangChain, LangChain-Google-GenAI, LangChain-Groq
* **OCR & CV Engine**: OpenCV, PyTesseract, PyMuPDF (fitz)
* **Uploads**: Cloudinary

---

## ⚡ Setup & Local Execution

### 📋 Prerequisites
Make sure you have **Tesseract OCR** and **PostgreSQL** (with the `pgvector` extension) installed on your system.

### 🐍 Virtual Environment Setup
1. Create and activate a python environment:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
2. Install python packages:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

### 🛢️ Database Initialization
1. Ensure you have created a database in PostgreSQL and enabled pgvector:
   ```sql
   CREATE DATABASE examprep;
   \c examprep;
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
2. Set up your `.env` configuration file in this directory (refer to the main README for keys).
3. Apply database schemas:
   * **Using Migrations**:
     ```bash
     alembic upgrade head
     ```
   * **Using Quick-Setup script**:
     ```bash
     python Create_Table.py
     ```
4. Verify database connection status:
   ```bash
   python smpke.py
   ```

### 🚀 Running the Server
Start the development server using:
```bash
python main.py
```
The FastAPI documentation will be interactive and available at [http://localhost:8080/docs](http://localhost:8080/docs).
