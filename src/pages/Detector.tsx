import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageInput } from '../components/MessageInput'
import { ChatCompanion } from '../components/ChatCompanion'
import { useDetection } from '../hooks/useDetection'
import { useChat } from '../hooks/useChat'
import type { ThreatType, SeverityLevel } from '../types'

interface DetectorProps {
  onCompleteAnalysis: (threatType: ThreatType, severity: SeverityLevel) => void
  onBack: () => void
}

function getSeverityColor(score: number) {
  if (score <= 3) return { color: '#22c55e', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', label: 'Low Threat', bar: 'bg-gradient-to-r from-green-500 to-emerald-400' }
  if (score <= 6) return { color: '#eab308', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', label: 'Medium Threat', bar: 'bg-gradient-to-r from-yellow-500 to-amber-400' }
  if (score <= 8) return { color: '#f97316', bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', label: 'High Threat', bar: 'bg-gradient-to-r from-orange-500 to-amber-500' }
  return { color: '#ef4444', bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', label: 'Critical Threat', bar: 'bg-gradient-to-r from-red-600 to-rose-500' }
}

const ACTION_LABELS: Record<string, string> = {
  document_only: '📄 Document & keep records',
  report_to_platform: '🚩 Report to platform',
  contact_helpline: '📞 Contact a helpline',
  emergency_services: '🚨 Contact emergency services',
}
const RISK_LABELS: Record<string, string> = {
  immediate_threat: 'Immediate threat',
  escalation_pattern: 'Escalation pattern',
  personal_info_exposed: 'Personal info exposed',
  coordination_suspected: 'Coordinated abuse',
  repeated_contact: 'Repeated contact',
}

export function Detector({ onCompleteAnalysis, onBack }: DetectorProps) {
  const {
    loading: detectLoading,
    error: detectError,
    detectionResult,
    severityAssessment,
    analyzeMessage,
    reset,
  } = useDetection()

  const { chatHistory, loading: chatLoading, startChat, sendMessage } = useChat()

  useEffect(() => {
    if (detectionResult?.threat_detected && chatHistory.length === 0) startChat()
  }, [detectionResult, chatHistory.length, startChat])

  const handleContinue = () => {
    if (detectionResult && severityAssessment)
      onCompleteAnalysis(detectionResult.threat_type, severityAssessment.severity_level)
  }

  const showResults = detectionResult !== null
  const threatDetected = detectionResult?.threat_detected === true
  const score = detectionResult?.threat_detected ? (detectionResult.severity_score ?? 0) : 0
  const theme = getSeverityColor(score)
  const barPct = (score / 10) * 100

  const activeRisks = severityAssessment
    ? Object.entries(severityAssessment.risk_factors).filter(([, v]) => v).map(([k]) => k)
    : []

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-canvas, #050811)' }}>

      {/* ══ TOP NAV BAR ══ */}
      <motion.header
        className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            className="w-8 h-8 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5 flex items-center justify-center transition-all"
            whileHover={{ scale: 1.08, x: -1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back"
          >
            <span className="text-sm font-bold">←</span>
          </motion.button>
          <div className="h-5 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-base">🛡</span>
            <span className="text-sm font-bold text-white">SafeSpace AI</span>
            <span className="text-white/20">/</span>
            <span className="text-sm text-slate-400">Incident Analysis</span>
          </div>
        </div>

        {showResults && (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              ← New Analysis
            </motion.button>
            {threatDetected && severityAssessment && (
              <motion.button
                onClick={handleContinue}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg transition-all"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Generate Safety Report →
              </motion.button>
            )}
          </div>
        )}
      </motion.header>

      {/* ══ INPUT PHASE ══ */}
      <AnimatePresence mode="wait">
        {!showResults && (
          <motion.div
            key="input"
            className="flex-1 flex items-center justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="glass-card p-8 w-full max-w-2xl border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur">
              <h2 className="text-base font-bold text-white mb-1">What happened?</h2>
              <p className="text-sm text-slate-400 mb-5">
                Paste the harassing message, or describe the situation in your own words.
              </p>
              <MessageInput onSubmit={analyzeMessage} loading={detectLoading} />
              {detectError && (
                <motion.p
                  className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  ⚠ {detectError}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* ══ DASHBOARD PHASE ══ */}
        {showResults && (
          <motion.div
            key="dashboard"
            className="flex-1 min-h-0 flex overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── MAIN CONTENT (left + center) ── */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

              {/* ── METRIC CARDS ROW ── */}
              <motion.div
                className="shrink-0 grid grid-cols-3 gap-3 px-5 py-3 border-b border-white/[0.05]"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                {/* Card 1 — Threat Status */}
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${theme.bg} border ${theme.border}`}>
                    {threatDetected ? '⚠️' : '✅'}
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Status</p>
                    <p className={`text-sm font-black ${theme.text}`}>
                      {threatDetected ? 'Threat Detected' : 'No Threat'}
                    </p>
                  </div>
                </div>

                {/* Card 2 — Threat Type */}
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 bg-purple-500/10 border border-purple-500/20">
                    🎯
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Threat Type</p>
                    <p className="text-sm font-black text-white capitalize">
                      {detectionResult?.threat_type?.replace(/_/g, ' ') || 'None'}
                    </p>
                  </div>
                </div>

                {/* Card 3 — Severity Score */}
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${theme.bg} border ${theme.border}`}>
                    <span className={`text-sm font-black ${theme.text}`}>{score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Severity</p>
                    <p className={`text-xs font-black ${theme.text}`}>{theme.label}</p>
                    <div className="mt-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${theme.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${barPct}%` }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── MAIN BODY — 2 panel columns ── */}
              <div className="flex-1 min-h-0 grid grid-cols-2 gap-0 divide-x divide-white/[0.05] overflow-hidden">

                {/* PANEL LEFT — Key indicators + AI reasoning */}
                <motion.div
                  className="flex flex-col overflow-y-auto custom-scroll px-5 py-4 gap-4"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Key Indicators */}
                  {detectionResult?.key_indicators && detectionResult.key_indicators.length > 0 && (
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                        Key Indicators
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {detectionResult.key_indicators.map((ind, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-medium"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Reasoning */}
                  {detectionResult?.reasoning && (
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                        AI Reasoning
                      </p>
                      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 border-l-2 border-l-indigo-500">
                        <p className="text-sm text-slate-300 leading-relaxed">{detectionResult.reasoning}</p>
                      </div>
                    </div>
                  )}

                  {/* Immediate safety alert */}
                  {detectionResult?.immediate_safety_concerns && (
                    <motion.div
                      className="rounded-xl bg-red-500/10 border border-red-500/25 p-4 flex items-start gap-3"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-xl shrink-0">🚨</span>
                      <div>
                        <p className="text-xs font-bold text-red-400 mb-0.5">Immediate Safety Concern</p>
                        <p className="text-xs text-red-300 leading-relaxed">
                          Please consider contacting emergency services or a crisis helpline right now.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* No threat */}
                  {!threatDetected && (
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 border-l-2 border-l-green-500">
                      <p className="text-xs text-green-300 leading-relaxed">
                        No harassment indicators were detected. If something still feels wrong, trust your instincts and reach out for support.
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* PANEL RIGHT — Severity details */}
                <motion.div
                  className="flex flex-col overflow-y-auto custom-scroll px-5 py-4 gap-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {severityAssessment ? (
                    <>
                      {/* Safety score gauge */}
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-3">
                          Safety Index
                        </p>
                        <div className="flex items-center gap-4">
                          {/* Circular gauge */}
                          <div className="relative w-16 h-16 shrink-0">
                            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                              <motion.circle
                                cx="28" cy="28" r="22" fill="none"
                                stroke={theme.color} strokeWidth="5"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 22}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - severityAssessment.safety_score / 100) }}
                                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                              />
                            </svg>
                            <span className={`absolute inset-0 flex items-center justify-center text-xs font-black ${theme.text}`}>
                              {severityAssessment.safety_score}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Safety Score</p>
                            <p className="text-xs text-slate-400 mt-0.5">{severityAssessment.safety_score}/100</p>
                            <p className={`text-xs font-bold mt-1 ${theme.text}`}>{theme.label}</p>
                          </div>
                        </div>
                      </div>

                      {/* Risk Factors */}
                      {activeRisks.length > 0 && (
                        <div>
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                            Risk Factors
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {activeRisks.map((key, i) => (
                              <motion.div
                                key={key}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/15"
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.06 }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                <span className="text-xs font-semibold text-red-300">{RISK_LABELS[key] ?? key}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Assessment */}
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                          Assessment
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">{severityAssessment.reasoning}</p>
                      </div>

                      {/* Recommended Action */}
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                          Recommended Action
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-bold text-white">
                          {ACTION_LABELS[severityAssessment.recommended_action] ?? severityAssessment.recommended_action}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600 text-sm">
                      Severity analysis pending...
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* ── CHAT SIDEBAR ── */}
            {threatDetected && (
              <motion.div
                className="w-72 shrink-0 flex flex-col border-l border-white/[0.06] bg-white/[0.01]"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="px-4 py-3.5 border-b border-white/[0.06] shrink-0">
                  <h2 className="text-xs font-bold text-white flex items-center gap-2">
                    <span>💬</span> Support Companion
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">Safe space to talk through what happened</p>
                </div>
                <div className="flex-1 min-h-0">
                  <ChatCompanion
                    messages={chatHistory}
                    onSendMessage={sendMessage}
                    loading={chatLoading}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
