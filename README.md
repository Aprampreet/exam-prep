# ScribeMind 🎓 | AI-Powered Exam Preparation Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![pgvector](https://img.shields.io/badge/pgvector-336791?style=for-the-badge&logo=postgresql&logoColor=green)](https://github.com/pgvector/pgvector)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**ScribeMind** is a state-of-the-art, AI-powered study companion and exam preparation platform designed for high achievers. By leveraging advanced Document Processing, Optical Character Recognition (OCR), Vector Databases, and large language models (LLMs), ScribeMind transforms raw study notes, textbook PDFs, or scanned documents into comprehensive, personalized study modules and progressive difficulty assessments.

---

## 🏗️ Architecture & Core Workflow

The system is split into a **FastAPI backend** (serving Python-driven AI, database integrations, and heavy processing) and a **Next.js 16 frontend** (styled with Tailwind CSS v4 and featuring premium animations).

```mermaid
flowchart TD
    %% Styling
    classDef client fill:#3b82f6,stroke:#1d4ed8,color:#fff;
    classDef backend fill:#10b981,stroke:#047857,color:#fff;
    classDef database fill:#f59e0b,stroke:#b45309,color:#fff;
    classDef ai fill:#8b5cf6,stroke:#6d28d9,color:#fff;

    A[User Study Document / Image]:::client -->|Upload via Cloudinary| B(FastAPI Endpoint: /session/create):::backend
    
    subgraph Background Processing [Background Worker Thread]
        B --> C{Text Extracted?}:::backend
        C -->|Yes| D[Normal PDF Chunking]:::backend
        C -->|No / Low Text| E[Advanced OpenCV Preprocessing]:::backend
        E --> F[Tesseract OCR Ensemble PSM 4, 6, 11]:::backend
        F --> G[Text Normalization]:::backend
        D --> H[RecursiveCharacterTextSplitter]:::backend
        G --> H
    end

    H -->|Gemini Embedding 001| I(Generate 768d Vector):::ai
    I -->|Insert Chunk & Vector| J[(PostgreSQL + pgvector)]:::database

    subgraph Assessment Generation [Dynamic Study Session]
        K[Request MCQ / Short Answers]:::client --> L[Query pgvector context]:::database
        L --> M{Primary LLM: Gemini 2.5 Flash Lite}:::ai
        M -->|Success| O[Parse & Return JSON Assessment]:::backend
        M -->|Failure / Rate Limit| P[Fallback LLM: Llama 3.1 8B via Groq]:::ai
        P --> O
    end
    
    O --> Q[Interactive Assessment UI]:::client
```

---

## 🔥 Key Features

### 1. Advanced OCR & Preprocessing Pipeline
* **Adaptive Preprocessing**: Scanned documents or low-contrast images undergo custom grayscale conversion, **CLAHE** (Contrast Limited Adaptive Histogram Equalization), **FastNLMeansDenoising**, and **Adaptive Gaussian Thresholding** via OpenCV before running through OCR.
* **Ensemble OCR**: Runs an ensemble method using PyTesseract across multiple Page Segmentation Modes (PSMs 6, 11, 4) and filters character confidences above 50% to maintain clean, noise-free text extraction from handwriting or multi-column documents.

### 2. Retrieval-Augmented Generation (RAG)
* **pgvector Database Storage**: Chunks of text are converted into high-density vector embeddings using `models/gemini-embedding-001` and saved in a PostgreSQL instance utilizing the `pgvector` extension.
* **Semantic Context Fetching**: Retrieves exact context fragments related to study areas dynamically, ensuring grounded and relevant assessment generation.

### 3. Dual-LLM Dynamic Failover
* **Gemini 2.5 Flash Lite** acts as the primary academic engine, producing structured questions spanning progressive difficulties.
* Auto-fallbacks to **Llama 3.1 8B (via Groq)** seamlessly if Google API limits or network requests fail, ensuring zero downtime for students.

### 4. Comprehensive Assessment Formats
* **MCQ Assessments**: Spawns 20 multiple-choice questions per session with progressive difficulty (Low $\rightarrow$ Hard) and check/retry support.
* **Short-Answer Assessments**: Spawns 10 detailed questions worth 5 marks each, evaluating answers based on precise ideal keywords and scoring concepts.

### 5. Premium UI/UX Ecosystem
* **Stack**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Radix UI Primitives, and Lucide React.
* **UX Details**: Fluid animations powered by Framer Motion, Lenis smooth scrolling, progress tracking metrics powered by Recharts, and custom interactive components.

---

## 📂 Project Structure

```bash
examprep/
├── backend/                  # FastAPI Application
│   └── main/                 # Core Backend Source Code
│       ├── alembic/          # Database Migrations folder
│       ├── app/
│       │   ├── core/         # Configs, Rate Limiter setup
│       │   ├── services/     # OCR, Document Parsing, Embeddings, LLM client
│       │   └── views/        # API Routers (Session, MCQ, Short Answer, Schemas)
│       ├── auth/             # JWT Authentication logic, JWT Router & security
│       ├── db/               # DB Base Class, Models (Session, MCQ, DocumentChunk, User)
│       ├── Dockerfile        # Docker container configuration
│       ├── main.py           # Backend Entry Point
│       └── requirements.txt  # Backend Dependencies
│
└── frontend/                 # Next.js Application
    ├── app/                  # App Router: Authentication, Protected, Public pages
    ├── components/           # Home Section, CTA, Custom UI (Shadcn/custom)
    ├── deps/                 # Global layout dependencies (Navbar, Footer)
    ├── lib/                  # Hooks, contexts (AuthContext), API Axios instance
    ├── public/               # Static assets & images
    └── package.json          # Node Dependencies & scripts
```

---

## ⚙️ Prerequisites

To run this project locally, ensure you have the following installed:
* **Python 3.13+**
* **Node.js 18+** & **npm**
* **PostgreSQL** database engine with the **pgvector** extension installed (`CREATE EXTENSION vector;`)
* **Tesseract OCR Engine** (for scan/OCR support):
  * *macOS*: `brew install tesseract`
  * *Ubuntu*: `sudo apt-get install tesseract-ocr`

---

## 🚀 Getting Started

### 1. Set Up the Database
Ensure your PostgreSQL instance is running, and create a blank database:
```sql
CREATE DATABASE examprep;
-- Connect to the db and enable the pgvector extension:
\c examprep;
CREATE EXTENSION IF NOT EXISTS vector;
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend/main
   ```
2. Create and activate a python virtual environment:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
4. Create a `.env` file in `backend/main/.env` (see config below).
5. Run migrations to setup all tables:
   ```bash
   alembic upgrade head
   # OR use the quick script:
   python Create_Table.py
   ```
6. Spin up the FastAPI server:
   ```bash
   python main.py
   ```
   The backend API will be available at `http://localhost:8080`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../../frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create a `.env.local` file (see config below).
4. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` on your browser to access the ScribeMind Web App.

---

## 🔑 Environment Variables Reference

### Backend Configuration (`backend/main/.env`)
Create a `.env` file in the backend source folder and populate the following keys:
| Environment Variable | Description | Example / Recommended Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Async PostgreSQL connection string | `postgresql+asyncpg://user:pass@localhost:5432/examprep` |
| `SECRET_KEY` | Secret key for JWT signatures | `your-secure-random-secret-key-phrase` |
| `GOOGLE_API_KEY` | Google AI Studio Key (for Gemini LLM/Embeddings) | `AIzaSy...` |
| `GROQ_API_KEY` | Groq API Key (for Llama fallback model) | `gsk_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary storage identifier | `your-cloudinary-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary upload API key | `1234567890` |
| `CLOUDINARY_API_SECRET` | Cloudinary upload secret | `your-cloudinary-secret` |
| `CORS_ORIGINS` | Permitted cross-origin endpoints (JSON array/CSV) | `http://localhost:3000,http://127.0.0.1:3000` |

### Frontend Configuration (`frontend/.env.local`)
Create a `.env.local` file in the frontend root and set the API location:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 🐳 Docker Deployment

To build and run the backend inside a Docker container:

1. Build the Docker image:
   ```bash
   cd backend/main
   docker build -t scribemind-backend .
   ```
2. Run the container:
   ```bash
   docker run -d \
     -p 8080:8080 \
     --env-file .env \
     scribemind-backend
   ```

---

## 📖 Key Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/auth/register` | Register a new user | No |
| **POST** | `/auth/token` | Retrieve JWT Auth token (Username/Password Form) | No |
| **POST** | `/session/create` | Upload study document & spawn assessment generation | Yes |
| **GET** | `/session/all` | Retrieve all active study sessions for the user | Yes |
| **DELETE** | `/session/{session_id}` | Delete a study session and associated document chunks | Yes |
| **POST** | `/session/{session_id}/mcq` | Generate / Fetch MCQ exam questions for the session | Yes |
| **POST** | `/session/{session_id}/mcq/check`| Evaluate MCQ submissions & store score | Yes |
| **POST** | `/session/{session_id}/short` | Generate / Fetch 5-mark short answer questions | Yes |
| **POST** | `/session/{session_id}/short/check`| Grade short answer answers using keyword extraction | Yes |
