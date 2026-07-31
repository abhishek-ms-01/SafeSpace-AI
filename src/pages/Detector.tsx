import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageInput } from '../components/MessageInput'
import { ThreatDetectionPanel } from '../components/ThreatDetectionPanel'
import { SeverityIndicator } from '../components/SeverityIndicator'
import { ChatCompanion } from '../components/ChatCompanion'
import { useDetection } from '../hooks/useDetection'
import { useChat } from '../hooks/useChat'
import type { ThreatType, SeverityLevel } from '../types'

interface DetectorProps {
  onCompleteAnalysis: (threatType: ThreatType, severity: SeverityLevel) => void
  onBack: () => void
}

export function Detector({ onCompleteAnalysis, onBack }: DetectorProps) {
  const {
    loading: detectLoading, error: detectError,
    detectionResult, severityAssessment, analyzeMessage, reset,
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

  return (
    <div className="h-screen flex flex-col overflow-hidden px-4 pt-3 pb-3">

      {/* ── Header ── */}
      <motion.div
        className="shrink-0 flex items-center gap-3 mb-3"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={onBack}
          className="w-9 h-9 rounded-full border border-white/10 text-slate-400 hover:text-white bg-white/5 flex items-center justify-center transition-all shrink-0"
          whileHover={{ scale: 1.06, x: -2 }} whileTap={{ scale: 0.94 }}
          aria-label="Back"
        >
          <span className="text-sm font-bold">←</span>
        </motion.button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            🛡 SafeSpace AI — Incident Analysis
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Share what happened and we'll help you understand and document it.
          </p>
        </div>
        {/* spacer so Exit Quickly button never overlaps */}
        <div className="flex-1" />
        <div className="w-44 shrink-0" />
      </motion.div>

      <AnimatePresence mode="wait">

        {/* ── INPUT PHASE ── */}
        {!showResults && (
          <motion.div
            key="input"
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card p-8 w-full max-w-2xl border border-white/5 bg-white/[0.02] rounded-2xl">
              <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-1">What happened?</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
                Paste the harassing message, or describe the situation in your own words.
              </p>
              <MessageInput onSubmit={analyzeMessage} loading={detectLoading} />
              {detectError && (
                <motion.p className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  ⚠ {detectError}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* ── RESULTS PHASE ── */}
        {showResults && (
          <motion.div
            key="results"
            className="flex-1 min-h-0 flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Main content row — all columns equal height */}
            <div className={`flex-1 min-h-0 grid gap-4 items-stretch ${threatDetected ? 'grid-cols-3' : 'grid-cols-2 max-w-4xl mx-auto w-full'}`}>

              {/* COL 1 — Threat Detection */}
              <div className="min-h-0 overflow-y-auto custom-scroll h-full">
                <ThreatDetectionPanel result={detectionResult} loading={detectLoading} />
              </div>

              {/* COL 2 — Severity */}
              {severityAssessment && (
                <div className="min-h-0 overflow-y-auto custom-scroll h-full">
                  <SeverityIndicator assessment={severityAssessment} />
                </div>
              )}

              {/* COL 3 — Chat (threat only) */}
              {threatDetected && (
                <motion.div
                  className="glass-card overflow-hidden flex flex-col border border-white/5 dark:border-slate-800/50 min-h-0"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                >
                  <div className="px-4 py-3 border-b border-white/[0.06] shrink-0">
                    <h2 className="text-sm font-bold text-gray-800 dark:text-white">💬 Support Companion</h2>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">A safe space to talk through what happened</p>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ChatCompanion messages={chatHistory} onSendMessage={sendMessage} loading={chatLoading} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action buttons */}
            <motion.div
              className="shrink-0 flex items-center justify-between pt-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={reset}
                className="px-5 py-2.5 bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors text-sm"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                ← Analyze Another
              </motion.button>

              {threatDetected && severityAssessment && (
                <motion.button
                  onClick={handleContinue}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-full text-sm shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  Generate Safety Report →
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
