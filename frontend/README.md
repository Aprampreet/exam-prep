# ScribeMind Frontend 🎨

This directory contains the **Next.js 16 (App Router)** client application for **ScribeMind**, the AI-powered exam preparation companion.

For full architectural diagrams, backend API configurations, database setups, and backend guidelines, please refer to the primary [**Project Root README.md**](../README.md).

---

## 🛠️ Tech Stack & Key Dependencies
* **Core**: Next.js 16 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS v4, Radix UI Primitives, Lucide Icons
* **Animations**: Framer Motion, Lenis Scroll (for smooth custom scroll behavior)
* **API Client**: Axios with configured global interceptors for JWT token attachment
* **Data Visualization**: Recharts (for weakness analysis and historical session scoring)

---

## ⚡ Development & Scripts

### 📋 Prerequisites
Make sure you have Node.js 18+ and npm/yarn installed.

### 🔌 Running locally
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file inside the root of this folder containing:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the web interface at [http://localhost:3000](http://localhost:3000).

### 🛠️ Production Build
To create a production-ready package:
```bash
npm run build
npm run start
```
