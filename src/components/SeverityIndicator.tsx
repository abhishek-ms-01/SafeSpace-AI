import { motion } from 'framer-motion'
import type { SeverityAssessment } from '../types'

interface SeverityIndicatorProps {
  assessment: SeverityAssessment | null
}

const LEVEL_CONFIG = {
  low: {
    bg: 'bg-success-100 dark:bg-green-900/20',
    border: 'border-success-500',
    text: 'text-success-700 dark:text-green-300',
    badge: 'bg-success-500',
    icon: '✅',
    label: 'Low Severity',
  },
  medium: {
    bg: 'bg-warning-100 dark:bg-yellow-900/20',
    border: 'border-warning-500',
    text: 'text-warning-700 dark:text-yellow-300',
    badge: 'bg-warning-500',
    icon: '⚠️',
    label: 'Medium Severity',
  },
  high: {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    border: 'border-orange-500',
    text: 'text-orange-700 dark:text-orange-300',
    badge: 'bg-orange-500',
    icon: '🔴',
    label: 'High Severity',
  },
  critical: {
    bg: 'bg-danger-100 dark:bg-red-900/20',
    border: 'border-danger-600',
    text: 'text-danger-700 dark:text-red-300',
    badge: 'bg-danger-600',
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
      className={`rounded-xl border-2 p-5 ${cfg.bg} ${cfg.border} shadow-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Header — icon + level + score */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl" role="img" aria-label={cfg.label}>{cfg.icon}</span>
        <div>
          <p className={`text-lg font-bold ${cfg.text}`}>{cfg.label}</p>
          <p className={`text-sm ${cfg.text} opacity-70`}>
            Score: {assessment.severity_score}/10 · Safety index: {assessment.safety_score}/100
          </p>
        </div>
      </div>

      {/* Risk factors */}
      {activeRisks.length > 0 && (
        <div className="mb-4">
          <p className={`text-xs uppercase tracking-wider mb-2 ${cfg.text} opacity-70`}>
            Risk Factors Detected
          </p>
          <ul className="space-y-1.5">
            {activeRisks.map((key, i) => (
              <motion.li
                key={key}
                className={`flex items-center gap-2 text-sm font-medium ${cfg.text}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                {RISK_LABELS[key] ?? key}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Reasoning */}
      <div className="mb-4">
        <p className={`text-xs uppercase tracking-wider mb-1 ${cfg.text} opacity-70`}>Assessment</p>
        <p className={`text-sm leading-relaxed ${cfg.text}`}>{assessment.reasoning}</p>
      </div>

      {/* Recommended action */}
      <motion.div
        className="pt-3 border-t border-current/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className={`text-xs uppercase tracking-wider mb-1 ${cfg.text} opacity-70`}>
          Recommended Action
        </p>
        <p className={`text-sm font-semibold ${cfg.text}`}>
          {ACTION_LABELS[assessment.recommended_action] ?? assessment.recommended_action}
        </p>
      </motion.div>
    </motion.div>
  )
}
