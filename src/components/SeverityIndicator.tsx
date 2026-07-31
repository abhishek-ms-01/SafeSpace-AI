import { motion } from 'framer-motion'
import type { SeverityAssessment } from '../types'

interface SeverityIndicatorProps {
  assessment: SeverityAssessment | null
}

const LEVEL_CONFIG = {
  low: {
    accent: 'bg-green-500',
    text: 'text-green-400',
    icon: '✅',
    label: 'Low Severity',
  },
  medium: {
    accent: 'bg-yellow-500',
    text: 'text-yellow-400',
    icon: '⚠️',
    label: 'Medium Severity',
  },
  high: {
    accent: 'bg-orange-500',
    text: 'text-orange-400',
    icon: '🔴',
    label: 'High Severity',
  },
  critical: {
    accent: 'bg-red-500',
    text: 'text-red-400',
    icon: '🚨',
    label: 'Critical Severity',
  },
}

const ACTION_LABELS: Record<string, string> = {
  document_only: '📄 Document & keep records',
  report_to_platform: '🚩 Report to platform',
  contact_helpline: '📞 Contact a helpline',
  emergency_services: '🚨 Contact emergency services',
}

const RISK_LABELS: Record<string, string> = {
  immediate_threat: 'Immediate threat present',
  escalation_pattern: 'Escalation pattern detected',
  personal_info_exposed: 'Personal information exposed',
  coordination_suspected: 'Coordinated abuse suspected',
  repeated_contact: 'Repeated unwanted contact',
}

export function SeverityIndicator({ assessment }: SeverityIndicatorProps) {
  if (!assessment) return null

  const cfg = LEVEL_CONFIG[assessment.severity_level]

  // Build list of active risk factors
  const activeRisks = Object.entries(assessment.risk_factors)
    .filter(([, v]) => v)
    .map(([k]) => k)

  return (
    <motion.div
      className="glass-card p-6 border border-white/5 dark:border-slate-800/50 backdrop-blur-md relative overflow-hidden bg-slate-950/20 shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Top Accent Color Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${cfg.accent}`} />

      {/* Header — icon + level + score */}
      <div className="flex items-center gap-3 mb-5 mt-1">
        <span className="text-2xl" role="img" aria-label={cfg.label}>{cfg.icon}</span>
        <div>
          <p className="text-lg font-bold text-gray-900 dark:text-white font-display">{cfg.label}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Score: {assessment.severity_score}/10 · Safety index: {assessment.safety_score}/100
          </p>
        </div>
      </div>

      {/* Risk factors */}
      {activeRisks.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-2">
            Risk Factors Detected
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activeRisks.map((key, i) => (
              <motion.span
                key={key}
                className="text-[11px] font-bold px-2.5 py-1 rounded bg-red-500/5 border border-red-500/10 text-red-500 dark:text-red-400 flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {RISK_LABELS[key] ?? key}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Reasoning */}
      <div className="mb-5">
        <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-1.5">Assessment</p>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-350">{assessment.reasoning}</p>
      </div>

      {/* Recommended action */}
      <motion.div
        className="pt-4 border-t border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-2">
          Recommended Action
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-900 dark:text-slate-200">
          {ACTION_LABELS[assessment.recommended_action] ?? assessment.recommended_action}
        </div>
      </motion.div>
    </motion.div>
  )
}
