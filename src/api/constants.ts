// ─────────────────────────────────────────────────────────────
// SafeSpace AI — API Constants (Groq)
// ─────────────────────────────────────────────────────────────

// ── Groq Models ──────────────────────────────────────────────
// Fast model: detection, severity, chat (low latency)
export const GROQ_MODEL_FAST  = 'llama-3.1-8b-instant'
// Smart model: report generation, resource routing (higher quality)
export const GROQ_MODEL_SMART = 'llama-3.1-70b-versatile'

// ── Token Limits ─────────────────────────────────────────────
export const MAX_TOKENS_DETECTION  = 512
export const MAX_TOKENS_SEVERITY   = 512
export const MAX_TOKENS_CHAT       = 400
export const MAX_TOKENS_REPORT     = 2500
export const MAX_TOKENS_RESOURCES  = 1500

// ── Severity Score Thresholds ────────────────────────────────
export const SEVERITY_THRESHOLDS = {
  LOW:      { min: 0,  max: 3  },
  MEDIUM:   { min: 4,  max: 6  },
  HIGH:     { min: 7,  max: 8  },
  CRITICAL: { min: 9,  max: 10 },
} as const

// ── App Info ─────────────────────────────────────────────────
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'SafeSpace AI'
export const APP_ENV  = import.meta.env.VITE_APP_ENV  ?? 'development'
export const IS_DEV   = APP_ENV === 'development'

// ── Static Crisis Resources (fallback if API fails) ──────────
export const CRISIS_RESOURCES = {
  EMERGENCY:           '911 (US) / 999 (UK) / 112 (EU)',
  CRISIS_TEXT_LINE:    'Text HOME to 741741',
  RAINN_HOTLINE:       '1-800-656-HOPE (4673)',
  CYBER_CIVIL_RIGHTS:  'https://cybercivilrights.org/',
  NATIONAL_DV_HOTLINE: '1-800-799-7233',
} as const
