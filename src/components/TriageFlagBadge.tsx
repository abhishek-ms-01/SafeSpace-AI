// ─────────────────────────────────────────────────────────────
// TriageFlagBadge — Reusable triage level pill badge
//
// A pure display component: accepts a pre-computed TriageInfo
// (from getTriageLevel or getLikelihoodTriage) and renders a
// colour-coded pill consistent with ThreatDetectionPanel badges.
// ─────────────────────────────────────────────────────────────

import type { TriageInfo } from '../utils/severityColors'

interface TriageFlagBadgeProps {
  /** Pre-computed triage info — use getTriageLevel() or getLikelihoodTriage() */
  triage: TriageInfo
  /** Optional extra Tailwind classes on the wrapper */
  className?: string
}

export function TriageFlagBadge({ triage, className = '' }: TriageFlagBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full
        text-[11px] font-bold border
        ${triage.colorClass}
        ${className}
      `}
    >
      {/* Solid colour dot — matches the risk factor pill style */}
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${triage.dotClass}`} />
      {triage.label}
    </span>
  )
}
