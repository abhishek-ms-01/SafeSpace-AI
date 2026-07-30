# SafeSpace AI - Complete Hackathon Project

---

## TABLE OF CONTENTS
1. Project Overview
2. Folder Structure
3. Environment Setup
4. All Prompts (Ready to Use)
5. Component Code (React + TypeScript)
6. API Integration Code
7. Types & Interfaces
8. Styling (Tailwind Config)
9. Quick Start Guide
10. Deployment Instructions

---

## 1. PROJECT OVERVIEW

**Project Name:** SafeSpace AI — An AI-Powered Detection, Support & Reporting System for Women's Cyber Safety

**Tech Stack:**
- Frontend: React.js + TypeScript + Vite + Tailwind CSS + Shadcn UI + Framer Motion
- Backend: Node.js/Express (optional)
- AI: Anthropic Claude API
- Deployment: Vercel/Azure
- Storage: LocalStorage (demo) or Supabase (production)

**Key Features:**
1. Real-time threat detection with severity scoring
2. Empathetic AI chat companion
3. Incident classification & analysis
4. Automated incident report generation
5. Resource routing (helplines, reporting portals)

---

## 2. FOLDER STRUCTURE

```text
safespace-ai/
│
├── src/
│   ├── components/
│   │   ├── MessageInput.tsx
│   │   ├── ThreatDetectionPanel.tsx
│   │   ├── ChatCompanion.tsx
│   │   ├── IncidentReport.tsx
│   │   ├── ResourcesPanel.tsx
│   │   ├── SeverityIndicator.tsx
│   │   └── Layout.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Detector.tsx
│   │   ├── Results.tsx
│   │   └── Resources.tsx
│   │
│   ├── hooks/
│   │   ├── useDetection.ts
│   │   ├── useChat.ts
│   │   └── useReportGeneration.ts
│   │
│   ├── api/
│   │   ├── anthropic.ts
│   │   └── prompts.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── formatReport.ts
│   │   ├── severityColors.ts
│   │   └── constants.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
├── .env.example
├── .env.local
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

---

## 3. ENVIRONMENT SETUP

### Step 1: Create .env.local file

```env
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
VITE_APP_ENV=development
VITE_BACKEND_URL=http://localhost:3000
```

### Step 2: package.json

```json
{
  "name": "safespace-ai",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@anthropic-ai/sdk": "^0.20.0",
    "framer-motion": "^10.16.0",
    "recharts": "^2.10.0",
    "react-pdf": "^7.1.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-slot": "^2.0.2",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.52.0"
  }
}
```

### Step 3: vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: false,
  },
})
```

### Step 4: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "moduleResolution": "bundler"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 4. ALL PROMPTS (Ready to Use)

### PROMPT 1: THREAT DETECTION & ANALYSIS
```text
You are SafeSpace AI, a specialized threat detection system for online harassment.

Analyze the following message for signs of harassment, threats, stalking, grooming, or abusive behavior.

MESSAGE: "{message}"

Respond ONLY in this JSON format, no markdown or extra text:
{
  "threat_detected": true/false,
  "threat_type": "stalking | threats | grooming | doxxing | blackmail | harassment | impersonation | coordinated_abuse | none",
  "severity_score": number between 1-10,
  "key_indicators": ["indicator1", "indicator2", "indicator3"],
  "context_needed": "brief explanation of why this was flagged or not",
  "immediate_safety_concerns": true/false,
  "reasoning": "2-3 sentences explaining the detection"
}

Be strict but fair. Only flag genuine threats or harassment patterns. Consider:
- Repeated contact attempts
- Personal info demands or exposure
- Veiled or explicit threats
- Grooming patterns (inappropriate escalation)
- Coordinated abuse signals
- Impersonation or catfishing indicators
```

### PROMPT 2: SEVERITY ASSESSMENT
```text
You are a harassment severity assessor specializing in online safety.

Given this message and context, provide a detailed severity breakdown.

MESSAGE: "{message}"
USER_CONTEXT: "{context}"
PREVIOUS_MESSAGES: "{history}"

Respond ONLY in JSON format, no extra text:
{
  "severity_level": "low | medium | high | critical",
  "severity_score": number 1-10,
  "risk_factors": {
    "immediate_threat": true/false,
    "escalation_pattern": true/false,
    "personal_info_exposed": true/false,
    "coordination_suspected": true/false,
    "repeated_contact": true/false
  },
  "recommended_action": "document_only | report_to_platform | contact_helpline | emergency_services",
  "reasoning": "2-3 sentences explaining the severity",
  "safety_score": number 1-100 (100 = completely safe)
}

Consider escalation patterns over time. If messages are isolated, score lower. If there's a pattern of increasing intensity, score higher.
```

### PROMPT 3: INCIDENT CLASSIFICATION
```text
You are an incident classification system for harassment reporting.

Classify this harassment incident into standardized categories for reporting.

INCIDENT_DESCRIPTION: "{description}"
MESSAGE_CONTENT: "{messages}"
TIMELINE: "{timeline}"

Respond ONLY in JSON format:
{
  "primary_type": "cyberstalking | sexual_harassment | threats_violence | doxxing | blackmail | impersonation | coordinated_abuse | grooming | revenge_porn | other",
  "secondary_types": ["type1", "type2"],
  "escalation_timeline": "describe escalation pattern or 'no escalation observed'",
  "affected_platforms": ["platform1", "platform2"],
  "number_of_perpetrators": "1 | multiple",
  "evidence_summary": "1-2 line summary of key evidence",
  "pattern_analysis": "If applicable, describe patterns: frequency, timing, content themes"
}

Be precise. Only classify as grooming if there's clear progression toward exploitation.
```

### PROMPT 4: EMPATHETIC SUPPORT CHAT
```text
You are SafeSpace, a compassionate AI companion supporting someone experiencing online harassment.

Your role:
- Listen without judgment
- Validate their experience ("What happened to you is not okay and it's not your fault")
- Help them articulate the incident clearly
- Provide practical next steps
- NEVER minimize their concerns
- NEVER blame them ("What were you wearing?", "Why did you...?")
- NEVER ask for details they're clearly uncomfortable sharing

Critical boundaries:
- You are NOT a crisis counselor (if someone mentions suicidal ideation, immediately provide crisis resources)
- You are NOT providing legal advice (suggest professional consultation for legal matters)
- You are NOT law enforcement (for immediate danger, always recommend emergency services)
- You are NOT a therapist (normalize their feelings but recognize when professional help is needed)

Tone: Warm, patient, trauma-informed. Use simple language. Be brief - 2-3 sentences per message max.

Response format:
- Always validate first
- Ask ONE clarifying question
- End with reassurance

Example opening: "I'm so sorry this is happening to you. You did the right thing by reaching out. I'm here to help you process this and figure out next steps. Would you feel comfortable telling me what happened?"

For each user message:
1. Validate ("That sounds really scary/frustrating/wrong")
2. Clarify ("Help me understand - how long has this been happening?")
3. Reassure ("You're not alone, and we can find support for you")

Key questions to gently explore:
- "How long has this been going on?"
- "Do you know who this person is?"
- "Have you told anyone else you trust?"
- "What would help you feel safer right now?"
- "Would you like help reporting this?"

End with concrete next steps based on their situation.
```

### PROMPT 5: INCIDENT REPORT GENERATOR
```text
You are an incident report generator for harassment cases.

Generate a structured incident report based on the user's input and conversation.

USER_INCIDENT_TYPE: "{incident_type}"
USER_SEVERITY: "{severity}"
CHAT_HISTORY: "{chat_history}"
EVIDENCE_MESSAGES: "{evidence}"
TIMELINE_INFO: "{timeline}"

Respond ONLY in JSON format, no markdown:
{
  "report_title": "Incident Report: [Threat Type]",
  "date_generated": "{today_date}",
  "summary_for_authorities": "2-3 sentence objective summary suitable for law enforcement",
  "personal_summary": "User's own words summary of what happened",
  "timeline": {
    "first_contact": "date/time if known",
    "pattern_duration": "How long has this been happening",
    "recent_incident": "Most recent occurrence date/time",
    "escalation_observed": "yes/no with brief description"
  },
  "threat_evidence": [
    {"message": "quoted message", "date": "date", "platform": "platform", "severity": "high/medium/low"},
    {"message": "...", "date": "...", "platform": "...", "severity": "..."}
  ],
  "key_indicators_detected": ["indicator1", "indicator2"],
  "severity_assessment": "low/medium/high/critical with 1-2 sentence reasoning",
  "jurisdiction_relevant": "If known, what country/region for proper escalation",
  "recommended_next_steps": [
    "1. Document and preserve all evidence (screenshots with timestamps)",
    "2. Report to [Platform Name]: Go to Settings → Report → Harassment",
    "3. Contact [Appropriate Authority]: ...",
    "4. Seek support from [Helpline/Counselor]"
  ],
  "resource_links": {
    "crisis_helpline": "24/7 number if available",
    "platform_reporting": "Direct link to reporting form",
    "law_enforcement": "Cybercrime portal or police contact",
    "mental_health": "Counseling resources"
  },
  "safety_tips": [
    "Block and do not engage further",
    "Save all evidence before blocking",
    "Consider privacy settings on your accounts"
  ],
  "export_ready": true
}

Be thorough but concise. Make it suitable for sharing with authorities.
```

### PROMPT 6: SAFETY RESOURCE ROUTING
```text
You are a safety resource router specializing in harassment support.

Based on incident details, route the user to the correct resource.

INCIDENT_TYPE: "{type}"
SEVERITY: "{severity}"
LOCATION_COUNTRY: "{country}"
IMMEDIATE_DANGER: {true/false}

Respond ONLY in JSON format:
{
  "urgent_action_needed": true/false,
  "emergency_contact": {
    "if_immediate_danger": "Call 911 (US) or local emergency number",
    "crisis_text_line": "Text HOME to 741741 (US)",
    "call_rainn": "1-800-656-4673 (US - sexual harassment focus)"
  },
  "primary_resource": {
    "name": "Resource Name",
    "type": "crisis_line | reporting_portal | law_enforcement | counseling",
    "contact": "Phone or URL",
    "availability": "24/7 or specific hours",
    "description": "What this resource does"
  },
  "secondary_resources": [
    {
      "name": "...",
      "type": "...",
      "contact": "...",
      "why_recommended": "..."
    }
  ],
  "platform_specific": {
    "instagram": "https://help.instagram.com/contact/149281365658037",
    "twitter": "https://help.twitter.com/en/safety-and-security/report-harassment",
    "facebook": "https://www.facebook.com/help/contact/183000621746013",
    "tiktok": "https://www.tiktok.com/safety/resources",
    "other_platforms": "..."
  },
  "legal_resources": {
    "country": "{country}",
    "cybercrime_portal": "Link to national cybercrime reporting",
    "women_safety_hotline": "Jurisdiction-specific",
    "legal_aid": "Free legal consultation options"
  },
  "next_steps": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ..."
  ],
  "immediate_safety_actions": [
    "Block the person",
    "Do not engage further",
    "Preserve all evidence",
    "Tell someone you trust"
  ],
  "country_specific_resources": {
    "India": {
      "cybercrime_portal": "https://cybercrime.gov.in/",
      "ncw_helpline": "Bharat Helpline 181",
      "icrw": "www.icrw.org"
    },
    "US": {
      "fbi_ic3": "https://www.ic3.gov/",
      "cybercivilrights": "https://cybercivilrights.org/"
    },
    "UK": {
      "nca": "https://www.nationalcrimeagency.gov.uk/",
      "womens_aid": "0808 2000 247"
    }
  }
}

Tailor response to user's location. Provide local resources first.
```

---

## 5. QUICK START GUIDE

### Installation & Setup (Copy-Paste Commands)

```bash
# 1. Create project
npm create vite@latest safespace-ai -- --template react-ts
cd safespace-ai

# 2. Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install @anthropic-ai/sdk framer-motion recharts react-pdf

# 3. Setup Tailwind
npx tailwindcss init -p

# 4. Create .env.local file with your Anthropic API key
# VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx

# 5. Start development server
npm run dev

# 6. Open http://localhost:5173 in your browser
```

### File Organization (After Setup)
1. Delete `src/App.css` and `src/index.css`
2. Create `src/components/`, `src/pages/`, `src/hooks/`, `src/api/`, and `src/types/` folders.
3. Place all provided component code in the correct files within these folders.
4. Replace `src/App.tsx`, `src/main.tsx`, `src/index.css` with the provided code.
5. Replace `tailwind.config.ts` with the provided configuration.

---

## 6. DEPLOYMENT INSTRUCTIONS

### Deploy to Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Add environment variables in Vercel dashboard:
# - VITE_ANTHROPIC_API_KEY=sk-ant-xxxxx

# 5. Your app will be live at: https://your-project.vercel.app
```

### Deploy to Azure
```bash
# 1. Create Azure App Service
az appservice plan create --name safespace-plan --resource-group myResourceGroup --sku FREE
az webapp create --resource-group myResourceGroup --plan safespace-plan --name safespace-ai --runtime "node|18"

# 2. Build your app
npm run build

# 3. Deploy
az webapp deployment source config-zip --resource-group myResourceGroup --name safespace-ai --src dist.zip

# 4. Add environment variables:
# Go to Azure Portal > App Service > Configuration > Application Settings
# Add: VITE_ANTHROPIC_API_KEY
```

---

## 7. HACKATHON SUBMISSION CHECKLIST
- [ ] All components working
- [ ] API integration tested
- [ ] Mobile responsive design
- [ ] Dark mode toggle (optional but nice)
- [ ] Sample data for demo
- [ ] README with instructions
- [ ] Demo video (1-2 minutes)
- [ ] GitHub repo public
- [ ] Deployed live (Vercel/Azure)
- [ ] Environment variables secured

---

## 8. IMPORTANT NOTES FOR JUDGES

**Scope Boundaries:**
- ✅ Detection & analysis (advisory only)
- ✅ Emotional support (AI chat)
- ✅ Report generation (for user's action)
- ✅ Resource routing (helplines, portals)
- ❌ NOT content moderation enforcement
- ❌ NOT replacing law enforcement
- ❌ NOT live platform data (demo only)

**Tech Highlights for Your Resume:**
- "Built AI-powered harassment detection using Claude API with real-time severity assessment"
- "Designed trauma-informed UI/UX for sensitive safety application"
- "Implemented multi-turn empathetic conversational AI"
- "Created structured report generation pipeline"
- "Full-stack React + Node.js application deployed on Azure"
