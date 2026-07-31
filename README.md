# SafeSpace AI 🛡️

> **Anonymous, secure, and trauma-informed AI support for individuals experiencing online harassment, threats, or cyberstalking.**

SafeSpace AI is a hackathon-grade web application designed to help individuals analyze abusive online messages, navigate critical incidents safely, find support resources, and document events for legal or platform-reporting purposes.

---

## ✨ Key Features

*   **⚡ Real-Time Threat Analysis:** Checks input messages for signs of stalking, doxxing, grooming, blackmail, or coordinated brigade attacks.
*   **📊 Detailed Severity Indicators:** Maps threat levels from 1 to 10 with colored progress bars (Low, Medium, High, Critical) and safety score indicators.
*   **💬 Empathetic AI Companion:** A warm, judgment-free, trauma-informed conversational interface to help users explain their situation and feel supported.
*   **📄 Structured Incident Reports:** Auto-generates formal summaries for law enforcement or platform support, including evidence logs, timelines, and legal jurisdictions.
*   **📞 Localized Safety Routing:** Recommends contacts (911, Crisis Text Line, National Domestic Violence Hotline, RAINN) depending on the user's location and severity.
*   **🌓 Dark Mode & Accessibility:** Supports instant theme toggling and high-visibility keyboard focus rings. Respects `prefers-reduced-motion`.

---

## 🛠️ Technology Stack

*   **Frontend Framework:** React 19 (TypeScript) + Vite
*   **Styling:** Tailwind CSS (Custom color tokens)
*   **Animations:** Framer Motion (Page transition fading & card stagger effects)
*   **AI Engine:** Groq SDK (Llama 3 70B & 8B models for low-latency JSON completions)

---

## ⚙️ Quick Start & Installation

### 1. Clone and Install Dependencies
Ensure you have Node.js (v18+) installed.

```bash
# Navigate to workspace
cd safespace-ai

# Install packages
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Groq API Configuration
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_APP_ENV=development
VITE_APP_NAME="SafeSpace AI"
```

### 3. Run Development Server
```bash
npm run dev
```
The site will open automatically at **http://localhost:3001**.

---

## 📦 Production Build & Preview

Verify files compile correctly and bundle for deployment:

```bash
# Compile and build assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 QA Testing

A complete testing suite and checklist can be found in [testing_plan.md](.gemini/antigravity/brain/09d33419-ca1a-4d0f-9f77-1eeea941aaf3/testing_plan.md). It outlines step-by-step functionality, mobile layouts (375px/768px/1200px), and keyboard/screen-reader accessibility standards.

*   To run validation checks manually, copy test prompts from `src/utils/testData.ts`.
