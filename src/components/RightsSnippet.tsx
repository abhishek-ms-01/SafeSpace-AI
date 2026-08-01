// ─────────────────────────────────────────────────────────────
// RightsSnippet — Legal/rights awareness pill card
//
// Renders the hardcoded rights snippet for a given ThreatType.
// Styled with glass-card to match the existing ResourcesPanel cards.
// Includes a disclaimer that this is general awareness, not legal advice.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import type { ThreatType } from '../types'
import { getRightsSnippet } from '../data/rightsSnippets'

interface RightsSnippetProps {
  threatType: ThreatType
}

export function RightsSnippet({ threatType }: RightsSnippetProps) {
  const snippet = getRightsSnippet(threatType)

  return (
    <motion.div
      className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-900/10 p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base shrink-0">⚖️</span>
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
          Know Your Rights
        </h3>
      </div>

      {/* Headline */}
      <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 leading-snug mb-1.5">
        {snippet.headline}
      </p>

      {/* Detail */}
      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-2">
        {snippet.detail}
      </p>

      {/* Disclaimer */}
      <p className="text-[10px] text-slate-500 dark:text-slate-600 italic leading-snug">
        General awareness only — not legal advice. Laws vary by country.
      </p>
    </motion.div>
  )
}
