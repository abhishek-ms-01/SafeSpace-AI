// ─────────────────────────────────────────────────────────────
// SafeSpace AI — Severity / Triage Color Utilities
//
// Maps SeverityAssessment fields (severity_level, severity_score)
// and CorrelationResult same_actor_likelihood to one of three
// standardized triage labels used across the UI.
//
// Triage levels:
//   "Immediate Safety Concern"   → red    (critical / high severity)
//   "Needs Review"               → amber  (medium severity)
//   "Low Risk / Informational"   → green  (low severity)
// ─────────────────────────────────────────────────────────────

export interface TriageInfo {
  label: string
  /** Tailwind classes for text + background + border (pill style) */
  colorClass: string
  /** Tailwind class for a solid dot / accent indicator */
  dotClass: string
}

// ── Pre-defined triage configs ────────────────────────────────
const IMMEDIATE: TriageInfo = {
  label: 'Immediate Safety Concern',
  colorClass: 'bg-red-500/10 border-red-500/20 text-red-400',
  dotClass: 'bg-red-500',
}

const NEEDS_REVIEW: TriageInfo = {
  label: 'Needs Review',
  colorClass: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  dotClass: 'bg-yellow-500',
}

const LOW_RISK: TriageInfo = {
  label: 'Low Risk / Informational',
  colorClass: 'bg-green-500/10 border-green-500/20 text-green-400',
  dotClass: 'bg-green-500',
}

// ── Primary mapping: SeverityAssessment fields ────────────────
/**
 * Maps a SeverityAssessment's severity_level and severity_score
 * to a triage label + colour config.
 *
 * Uses severity_level as the primary signal; falls back to
 * severity_score if the level string is unexpected.
 *
 * Thresholds (aligned with constants.ts SEVERITY_THRESHOLDS):
 *   critical (9-10) → Immediate Safety Concern
 *   high     (7-8)  → Immediate Safety Concern
 *   medium   (4-6)  → Needs Review
 *   low      (0-3)  → Low Risk / Informational
 */
export function getTriageLevel(
  severityScore: number,
  severityLevel: string
): TriageInfo {
  // Primary: use the string label
  switch (severityLevel) {
    case 'critical':
    case 'high':
      return IMMEDIATE
    case 'medium':
      return NEEDS_REVIEW
    case 'low':
      return LOW_RISK
  }

  // Fallback: use the numeric score if label is unrecognized
  if (severityScore >= 7) return IMMEDIATE
  if (severityScore >= 4) return NEEDS_REVIEW
  return LOW_RISK
}

// ── Secondary mapping: CorrelationResult likelihood ───────────
/**
 * Maps MultiPlatformCorrelator's same_actor_likelihood to triage.
 *
 *   high   → Immediate Safety Concern
 *   medium → Needs Review
 *   low    → Low Risk / Informational
 */
export function getLikelihoodTriage(
  likelihood: 'low' | 'medium' | 'high'
): TriageInfo {
  switch (likelihood) {
    case 'high':   return IMMEDIATE
    case 'medium': return NEEDS_REVIEW
    case 'low':    return LOW_RISK
  }
}
