import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageInput } from '../components/MessageInput'
import { ThreatDetectionPanel } from '../components/ThreatDetectionPanel'
import { SeverityIndicator } from '../components/SeverityIndicator'
import { ChatCompanion } from '../components/ChatCompanion'
import { useDetection } from '../hooks/useDetection'
import { useChat } from '../hooks/useChat'
import type { ThreatType, SeverityLevel } from '../types'

interface DetectorProps {
  onCompleteAnalysis: (threatType: ThreatType, severity: SeverityLevel) => void
}

export function Detector({ onCompleteAnalysis }: DetectorProps) {
  const {
    loading: detectLoading,
    error: detectError,
    detectionResult,
    severityAssessment,
    analyzeMessage,
    reset,
  } = useDetection()

  const {
    chatHistory,
    loading: chatLoading,
    startChat,
    sendMessage,
  } = useChat()

  // Auto-start companion chat when a threat is first detected
  useEffect(() => {
    if (detectionResult?.threat_detected && chatHistory.length === 0) {
      startChat()
    }
  }, [detectionResult, chatHistory.length, startChat])

  const handleContinue = () => {
    if (detectionResult && severityAssessment) {
      onCompleteAnalysis(detectionResult.threat_type, severityAssessment.severity_level)
    }
  }

  const showResults = detectionResult !== null
  const threatDetected = detectionResult?.threat_detected === true

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🛡 SafeSpace AI — Incident Analysis
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Share what happened and we'll help you understand and document it.
          </p>
        </motion.div>

        {/* Input phase — shown before analysis */}
        {!showResults && (
          <motion.div
            className="card p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
              What happened?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Paste the harassing message, or describe the situation in your own words.
            </p>
            <MessageInput
              onSubmit={analyzeMessage}
              loading={detectLoading}
            />
            {detectError && (
              <motion.p
                className="mt-3 text-sm text-danger-600 dark:text-red-400 bg-danger-100 dark:bg-red-900/20 rounded-lg px-4 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⚠ {detectError}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Results phase — 2-column grid */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className={`grid gap-6 ${threatDetected ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>

              {/* LEFT — Detection + Severity */}
              <div className="space-y-5">
                <ThreatDetectionPanel result={detectionResult} loading={detectLoading} />
                {severityAssessment && <SeverityIndicator assessment={severityAssessment} />}
              </div>

              {/* RIGHT — Chat companion (only if threat detected) */}
              {threatDetected && (
                <motion.div
                  className="card overflow-hidden flex flex-col"
                  style={{ minHeight: '500px' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
                    <h2 className="font-semibold text-gray-800 dark:text-white text-sm">
                      💬 Support Companion
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      A safe space to talk through what happened
                    </p>
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
            </div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={reset}
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                ← Analyze Another
              </motion.button>

              {threatDetected && severityAssessment && (
                <motion.button
                  onClick={handleContinue}
                  className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors text-sm shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Generate Safety Report →
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
