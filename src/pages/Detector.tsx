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
    <>
      {/* ── DESKTOP LAYOUT (md+): fixed viewport, no scroll ── */}
      <div className="hidden md:flex h-screen flex-col overflow-hidden px-4 pt-3 pb-3">

        {/* Header */}
        <motion.div
          className="shrink-0 flex items-center gap-3 mb-3"
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-white/10 text-slate-400 hover:text-white bg-white/5 flex items-center justify-center transition-all shrink-0"
            whileHover={{ scale: 1.06, x: -2 }} whileTap={{ scale: 0.94 }}
          >
            <span className="text-sm font-bold">←</span>
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">🛡 SafeSpace AI — Incident Analysis</h1>
            <p className="text-xs text-gray-500 dark:text-slate-400">Share what happened and we'll help you understand and document it.</p>
          </div>
          <div className="flex-1" />
          <div className="w-44 shrink-0" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults && (
            <motion.div key="input" className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-8 w-full max-w-2xl border border-white/5 bg-white/[0.02] rounded-2xl">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-1">What happened?</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Paste the harassing message, or describe the situation in your own words.</p>
                <MessageInput onSubmit={analyzeMessage} loading={detectLoading} />
                {detectError && (
                  <motion.p className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    ⚠ {detectError}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {showResults && (
            <motion.div key="results" className="flex-1 min-h-0 flex flex-col gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            >
              <div className={`flex-1 min-h-0 grid gap-4 items-stretch ${threatDetected ? 'grid-cols-3' : 'grid-cols-2 max-w-4xl mx-auto w-full'}`}>
                <div className="min-h-0 overflow-y-auto custom-scroll h-full">
                  <ThreatDetectionPanel result={detectionResult} loading={detectLoading} />
                </div>
                {severityAssessment && (
                  <div className="min-h-0 overflow-y-auto custom-scroll h-full">
                    <SeverityIndicator assessment={severityAssessment} />
                  </div>
                )}
                {threatDetected && (
                  <motion.div className="glass-card overflow-hidden flex flex-col border border-white/5 dark:border-slate-800/50 min-h-0"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.15 }}
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

              <motion.div className="shrink-0 flex items-center justify-between pt-1"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                <motion.button onClick={reset}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  ← Analyze Another
                </motion.button>
                {threatDetected && severityAssessment && (
                  <motion.button onClick={handleContinue}
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

      {/* ── MOBILE LAYOUT (< md): scrollable single column ── */}
      <div className="md:hidden min-h-screen flex flex-col px-4 pt-4 pb-24">

        {/* Mobile Header */}
        <div className="flex items-center gap-3 mb-5 pr-20">
          <motion.button onClick={onBack}
            className="w-9 h-9 rounded-full border border-white/10 text-slate-400 hover:text-white bg-white/5 flex items-center justify-center shrink-0"
            whileTap={{ scale: 0.92 }}
          >
            <span className="text-sm font-bold">←</span>
          </motion.button>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white">🛡 SafeSpace AI</h1>
            <p className="text-xs text-slate-400">Incident Analysis</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Mobile Input */}
          {!showResults && (
            <motion.div key="m-input"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.02] mb-4">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-1">What happened?</h2>
                <p className="text-sm text-slate-400 mb-4">Describe the situation or paste the message below.</p>
                <MessageInput onSubmit={analyzeMessage} loading={detectLoading} />
                {detectError && (
                  <p className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    ⚠ {detectError}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Mobile Results */}
          {showResults && (
            <motion.div key="m-results" className="flex flex-col gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            >
              {/* Analysis panel */}
              <ThreatDetectionPanel result={detectionResult} loading={detectLoading} />

              {/* Severity panel */}
              {severityAssessment && <SeverityIndicator assessment={severityAssessment} />}

              {/* Chat companion */}
              {threatDetected && (
                <motion.div className="glass-card rounded-2xl border border-white/5 dark:border-slate-800/50 overflow-hidden flex flex-col"
                  style={{ minHeight: '340px' }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                >
                  <div className="px-4 py-3 border-b border-white/[0.06] shrink-0">
                    <h2 className="text-sm font-bold text-gray-800 dark:text-white">💬 Support Companion</h2>
                    <p className="text-xs text-slate-400 mt-0.5">A safe space to talk through what happened</p>
                  </div>
                  <div className="flex-1" style={{ minHeight: '280px' }}>
                    <ChatCompanion messages={chatHistory} onSendMessage={sendMessage} loading={chatLoading} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile sticky bottom action bar */}
        {showResults && (
          <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-gray-950/95 backdrop-blur border-t border-white/[0.06] flex items-center justify-between gap-3">
            <motion.button onClick={reset}
              className="flex-1 py-2.5 bg-slate-800 text-slate-200 font-bold rounded-full text-sm hover:bg-slate-700 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              ← New Analysis
            </motion.button>
            {threatDetected && severityAssessment && (
              <motion.button onClick={handleContinue}
                className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full text-sm shadow-lg"
                whileTap={{ scale: 0.97 }}
              >
                Safety Report →
              </motion.button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
