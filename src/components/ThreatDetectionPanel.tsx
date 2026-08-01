import { motion } from 'framer-motion'
import type { DetectionResult } from '../types'

interface ThreatDetectionPanelProps {
  result: DetectionResult | null
  loading?: boolean
}

// Maps severity score → color tokens
function getSeverityTheme(score: number) {
  if (score <= 3) return {
    accent: 'bg-green-500',
    glow: 'shadow-green-500/10',
    text: 'text-green-400',
    bar: 'bg-gradient-to-r from-green-500 to-emerald-400',
    icon: '✅',
    label: 'Low Threat',
  }
  if (score <= 6) return {
    accent: 'bg-yellow-500',
    glow: 'shadow-yellow-500/10',
    text: 'text-yellow-400',
    bar: 'bg-gradient-to-r from-yellow-500 to-amber-400',
    icon: '⚠️',
    label: 'Medium Threat',
  }
  if (score <= 8) return {
    accent: 'bg-orange-500',
    glow: 'shadow-orange-500/10',
    text: 'text-orange-400',
    bar: 'bg-gradient-to-r from-orange-500 to-amber-500',
    icon: '🔴',
    label: 'High Threat',
  }
  return {
    accent: 'bg-red-500',
    glow: 'shadow-red-500/10',
    text: 'text-red-400',
    bar: 'bg-gradient-to-r from-red-500 to-rose-400',
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


export function ThreatDetectionPanel({ result, loading = false }: ThreatDetectionPanelProps) {
  if (loading) {
    return (
      <div className="glass-card p-6 border border-white/5 dark:border-slate-800/50 backdrop-blur-md relative overflow-hidden bg-slate-950/20 shadow-xl rounded-2xl min-h-full">
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
      className="glass-card p-6 border border-white/5 dark:border-slate-800/50 backdrop-blur-md relative overflow-hidden bg-slate-950/20 shadow-xl rounded-2xl min-h-full"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Top Accent Color Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.accent}`} />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 mt-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">Analysis Results</h3>
        <span className="text-2xl" role="img" aria-label={theme.label}>{theme.icon}</span>
      </div>

      {/* Threat detected badge */}
      <div className="mb-6">
        <span className={`
          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border
          ${result.threat_detected
            ? 'bg-red-500/10 text-red-455 dark:text-red-400 border-red-500/20 shadow-sm shadow-red-500/10'
            : 'bg-green-500/10 text-green-455 dark:text-green-400 border-green-500/20 shadow-sm shadow-green-500/10'}
        `}>
          {result.threat_detected ? '⚠ Threat Detected' : '✓ No Threat Detected'}
        </span>
      </div>

      {result.threat_detected && (
        <div className="space-y-5">
          {/* Threat type */}
          <div>
            <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-1">
              Threat Type
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white capitalize tracking-wide">
              {result.threat_type.replace(/_/g, ' ')}
            </p>
          </div>

          {/* Severity score bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500">
                Severity Score
              </p>
              <p className={`text-xs font-black ${theme.text}`}>
                {result.severity_score}/10 — {theme.label}
              </p>
            </div>
            <div className="w-full h-3 bg-slate-900/50 dark:bg-slate-900/60 rounded-full overflow-hidden p-0.5 border border-white/5">
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
            <div>
              <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-2.5">
                Key Indicators
              </p>
              <div className="flex flex-wrap gap-2">
                {result.key_indicators.map((ind, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reasoning */}
          <div>
            <p className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-1.5">
              AI Reasoning
            </p>
            <div className="p-3.5 rounded-lg bg-white/5 border-l-2 border-indigo-500 dark:border-indigo-400/70 text-sm text-gray-600 dark:text-slate-350 leading-relaxed font-sans">
              {result.reasoning}
            </div>
          </div>

          {/* Immediate safety concern banner */}
          {result.immediate_safety_concerns && (
            <motion.div
              className="p-3 bg-red-650/10 border border-red-500/20 text-red-250 dark:text-red-200 rounded-lg text-xs font-semibold flex items-start gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-lg shrink-0">🚨</span>
              <span className="leading-relaxed">
                Immediate safety concern detected. Please consider contacting emergency services
                or a crisis helpline right now.
              </span>
            </motion.div>
          )}
        </div>
      )}

      {/* Safe message */}
      {!result.threat_detected && (
        <motion.div
          className="p-3.5 rounded-lg bg-white/5 border-l-2 border-green-500 dark:border-green-400/70 text-sm text-gray-600 dark:text-slate-350 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No harassment indicators were detected in this message. If something still feels
          wrong, trust your instincts and reach out for support.
        </motion.div>
      )}
    </motion.div>
  )
}
