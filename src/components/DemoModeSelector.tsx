// ─────────────────────────────────────────────────────────────
// DemoModeSelector — Try-a-scenario pill row
//
// Renders 3 pill buttons, one per demo category.
// Clicking a pill calls onSelectScenario(scenario) — it does NOT
// trigger any API call itself. The parent (Detector.tsx) decides
// what to do with the selected scenario.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { DEMO_SCENARIOS } from '../data/demoScenarios'
import type { DemoScenario } from '../data/demoScenarios'

interface DemoModeSelectorProps {
  /** Called when the user picks a scenario — no API call made here */
  onSelectScenario: (scenario: DemoScenario) => void
  /** ID of the currently active scenario (for active styling) */
  activeDemoId?: string | null
}

const CATEGORY_CONFIG = {
  stalking:  { icon: '👁️', color: 'hover:border-orange-500/40 hover:text-orange-300' },
  blackmail: { icon: '💰', color: 'hover:border-red-500/40 hover:text-red-300'    },
  doxxing:   { icon: '🌐', color: 'hover:border-purple-500/40 hover:text-purple-300' },
} as const

export function DemoModeSelector({ onSelectScenario, activeDemoId }: DemoModeSelectorProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Label */}
        <span className="text-[10px] tracking-widest font-extrabold uppercase text-slate-500 shrink-0">
          Try a demo:
        </span>

        {/* Scenario pills */}
        {DEMO_SCENARIOS.map((scenario, i) => {
          const cfg = CATEGORY_CONFIG[scenario.category]
          const isActive = activeDemoId === scenario.id

          return (
            <motion.button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1 rounded-full
                text-[11px] font-bold
                border transition-all duration-200
                ${isActive
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                  : `bg-white/[0.03] border-white/10 text-slate-400 ${cfg.color}`
                }
              `}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`Load ${scenario.label}`}
            >
              <span>{cfg.icon}</span>
              {scenario.label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
