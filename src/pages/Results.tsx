import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { IncidentReport } from '../components/IncidentReport'
import { ResourcesPanel } from '../components/ResourcesPanel'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useReportGeneration } from '../hooks/useReportGeneration'
import type { ThreatType, SeverityLevel } from '../types'

interface ResultsProps {
  threatType: ThreatType
  severity: SeverityLevel
  onBack: () => void
}

export function Results({ threatType, severity, onBack }: ResultsProps) {
  const {
    report,
    resources,
    loading,
    error,
    generateIncidentReport,
    downloadReportAsJSON,
    downloadReportAsText,
  } = useReportGeneration()

  // Auto-generate report on mount using the passed analysis data
  useEffect(() => {
    generateIncidentReport(
      threatType,
      severity,
      [`Incident type: ${threatType}`, `Severity level: ${severity}`],
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-slate-200 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 rounded-full transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Go back to home"
          >
            ← Back
          </motion.button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              📋 Your Safety Report
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
              Generated for {threatType.replace(/_/g, ' ')} — {severity} severity
            </p>
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div
            className="glass-card p-12 text-center border-primary-200/25 dark:border-slate-800/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LoadingSpinner fullScreen={false} text="Generating your personalized safety report..." />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
              This may take 15–30 seconds. Please wait.
            </p>
          </motion.div>
        )}

        {/* Error state */}
        {error && !loading && (
          <motion.div
            className="glass-card p-8 text-center max-w-lg mx-auto border-primary-200/25 dark:border-slate-800/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-semibold text-gray-800 dark:text-white mb-2">
              Failed to generate report
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{error}</p>
            <motion.button
              onClick={() => generateIncidentReport(threatType, severity, [`Incident: ${threatType}`])}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full text-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* Results — 2-column grid */}
        {!loading && !error && report && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* LEFT — Incident report */}
            <IncidentReport
              report={report}
              onDownloadJSON={downloadReportAsJSON}
              onDownloadText={downloadReportAsText}
            />

            {/* RIGHT — Safety resources */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                🛡 Safety Resources
              </h2>
              <ResourcesPanel resources={resources} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
