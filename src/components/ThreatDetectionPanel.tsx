import { motion } from 'framer-motion'
import type { DetectionResult } from '../types'

interface ThreatDetectionPanelProps {
  result: DetectionResult | null
  loading?: boolean
}

// Maps severity score → color tokens
function getSeverityTheme(score: number) {
  if (score <= 3) return {
    bg: 'bg-success-100 dark:bg-green-900/20',
    border: 'border-success-500',
    text: 'text-success-700 dark:text-green-300',
    bar: 'bg-success-500',
    icon: '✅',
    label: 'Low Threat',
  }
  if (score <= 6) return {
    bg: 'bg-warning-100 dark:bg-yellow-900/20',
    border: 'border-warning-500',
    text: 'text-warning-700 dark:text-yellow-300',
    bar: 'bg-warning-500',
    icon: '⚠️',
    label: 'Medium Threat',
  }
  if (score <= 8) return {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    border: 'border-orange-500',
    text: 'text-orange-700 dark:text-orange-300',
    bar: 'bg-orange-500',
    icon: '🔴',
    label: 'High Threat',
  }
  return {
    bg: 'bg-danger-100 dark:bg-red-900/20',
    border: 'border-danger-500',
    text: 'text-danger-700 dark:text-red-300',
    bar: 'bg-danger-500',
    icon: '🚨',
    label: 'Critical Threat',
  }
}

// Skeleton loading state
function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        ))}
      </div>
    </div>
  )
}

const STAGGER = {
  animate: { transition: { staggerChildren: 0.07 } },
}
const ITEM = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0 },
}

export function ThreatDetectionPanel({ result, loading = false }: ThreatDetectionPanelProps) {
  if (loading) {
    return (
      <div className="card p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
          <motion.span
            className="block w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          Analyzing your message...
        </p>
        <Skeleton />
      </div>
    )
  }

  if (!result) return null

  const score = result.threat_detected ? result.severity_score : 0
  const theme = getSeverityTheme(score)
  const barPercent = (score / 10) * 100

  return (
    <motion.div
      className={`rounded-xl border-2 p-6 ${theme.bg} ${theme.border} shadow-md`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className={`text-lg font-bold ${theme.text}`}>Analysis Results</h3>
        <span className="text-2xl" role="img" aria-label={theme.label}>{theme.icon}</span>
      </div>

      {/* Threat detected badge */}
      <div className="mb-4">
        <span className={`
          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold
          ${result.threat_detected
            ? 'bg-danger-600 text-white'
            : 'bg-success-600 text-white'}
        `}>
          {result.threat_detected ? '⚠ Threat Detected' : '✓ No Threat Detected'}
        </span>
      </div>

      {result.threat_detected && (
        <>
          {/* Threat type */}
          <div className="mb-4">
            <p className={`text-xs uppercase tracking-wider mb-1 ${theme.text} opacity-70`}>Threat Type</p>
            <p className={`text-base font-semibold ${theme.text} capitalize`}>
              {result.threat_type.replace(/_/g, ' ')}
            </p>
          </div>

          {/* Severity score bar */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1.5">
              <p className={`text-xs uppercase tracking-wider ${theme.text} opacity-70`}>
                Severity Score
              </p>
              <p className={`text-sm font-bold ${theme.text}`}>
                {result.severity_score}/10 — {theme.label}
              </p>
            </div>
            <div className="w-full h-3.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-gray-350/20 dark:border-slate-750/30">
              <motion.div
                className={`h-full rounded-full ${theme.bar} shadow-inner`}
                initial={{ width: 0 }}
                animate={{ width: `${barPercent}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Key indicators */}
          {result.key_indicators.length > 0 && (
            <div className="mb-4">
              <p className={`text-xs uppercase tracking-wider mb-2 ${theme.text} opacity-70`}>
                Key Indicators
              </p>
              <motion.ul className="space-y-1.5" variants={STAGGER} animate="animate">
                {result.key_indicators.map((ind, i) => (
                  <motion.li
                    key={i}
                    variants={ITEM}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2 text-sm ${theme.text}`}
                  >
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>{ind}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          )}

          {/* Reasoning */}
          <div className="mb-4">
            <p className={`text-xs uppercase tracking-wider mb-1 ${theme.text} opacity-70`}>
              AI Reasoning
            </p>
            <p className={`text-sm leading-relaxed ${theme.text}`}>{result.reasoning}</p>
          </div>

          {/* Immediate safety concern banner */}
          {result.immediate_safety_concerns && (
            <motion.div
              className="mt-4 p-3 bg-danger-600 text-white rounded-lg text-sm font-medium flex items-start gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-lg shrink-0">🚨</span>
              <span>
                Immediate safety concern detected. Please consider contacting emergency services
                or a crisis helpline right now.
              </span>
            </motion.div>
          )}
        </>
      )}

      {/* Safe message */}
      {!result.threat_detected && (
        <motion.p
          className="text-success-700 dark:text-green-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No harassment indicators were detected in this message. If something still feels
          wrong, trust your instincts and reach out for support.
        </motion.p>
      )}
    </motion.div>
  )
}
