# <p align="center">🛡️ SafeSpace AI</p>

<p align="center">
  <strong>Anonymous, trauma-informed AI sanctuary designed to analyze cyber harassment, assess immediate risk levels, and compile actionable evidence logs.</strong>
</p>

<p align="center">
  <a href="https://safespace-ai-five.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

---

## 📸 Product Preview

<p align="center">
  <img src="./src/assets/screenshot.png" width="90%" alt="SafeSpace AI Incident Analysis Dashboard" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.3);">
</p>

---

## 🌟 Why SafeSpace AI?

Online abuse is fast, targeted, and isolating. SafeSpace AI is built for immediate mitigation and long-term security. It empowers survivors by converting raw, stressful text incidents into **fully formatted evidence packages**, while routing them directly to immediate crisis help.

### Core Pillars
1. **Survivors First:** Entirely anonymous. No backend databases are kept, meaning zero message histories or personal identifiers are stored on servers.
2. **AI-Driven Assessment:** Real-time analysis maps threat categories (doxxing, stalking, blackmail, grooming) and details severity indicators from 1 to 10.
3. **Trauma-Informed Companionship:** An empathetic companion chat window helps users explain their experience and provides guidance.
4. **Actionable Outputs:** Download reports containing formatted summaries, timelines, and localized helplines.

---

## 🛠️ Tech Stack & Integration

*   **Frontend Engine:** React 19 + Vite (TypeScript enabled)
*   **Layout & Aesthetics:** Vanilla CSS + Tailwind CSS (Custom themes configured with glassmorphic cards and dynamic glow transitions)
*   **Animations:** Framer Motion (Staggered element entry, micro-interactions, sun/moon dark mode rotations)
*   **Core AI Engine:** Groq SDK (Llama 3 70B & 8B models for fast, JSON-enforced payloads)

---

## ⚡ Setup & Local Execution

### 1. Clone and Install Dependencies
Ensure Node.js (v18+) is installed.

```bash
# Navigate to project directory
cd safespace-ai

# Install node dependencies
npm install
```

### 2. Add API Configurations
Create a `.env.local` file in the project root:

```env
# Groq SDK Key (Visible to browser during compile time)
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_APP_ENV=development
```

### 3. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3001](http://localhost:3001)** in your browser.

### 4. Build for Production
```bash
# Compile and output assets to /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 📋 Incident Analysis Workflow

```mermaid
graph TD
    User([Survivor Input]) -->|Paste message| Input[MessageInput Card]
    Input -->|Groq API Call| Analyze{Threat Detection}
    
    Analyze -->|No Threat| SafeBanner[Show Green Badge & Support Advice]
    Analyze -->|Threat Detected| Dashboard[2-Column Grid Dashboard]
    
    Dashboard -->|Left Panel| Gauge[Severity Progress Score & Risk Factors]
    Dashboard -->|Right Panel| Chat[Trauma-Informed AI Conversation]
    
    Chat -->|Generate Report| Report[Structured Incident Summary]
    Report -->|Export Option| Download[Download TXT / JSON evidence pack]
```

---

## 🔒 Security & Privacy Policy

> [!IMPORTANT]
> **SafeSpace AI stores no personal data.** 
> All API calculations are processed in-memory and all messages are client-side only. Downloading reports or resetting the screen completely clears all active state variables from the browser session.
