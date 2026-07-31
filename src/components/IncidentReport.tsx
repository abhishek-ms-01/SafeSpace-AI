import { motion } from 'framer-motion'
import type { IncidentReport as IncidentReportType } from '../types'

interface IncidentReportProps {
  report: IncidentReportType | null
  onDownloadJSON?: () => void
  onDownloadText?: () => void
  onDownloadPDF?: () => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      {children}
    </section>
  )
}

export function IncidentReport({ report, onDownloadJSON, onDownloadText, onDownloadPDF }: IncidentReportProps) {
  if (!report) return null

  // Safe fallbacks to prevent crashes
  const timeline = report.timeline || {
    first_contact: '',
    pattern_duration: 'N/A',
    recent_incident: 'N/A',
    escalation_observed: 'N/A'
  }
  const keyIndicators = report.key_indicators_detected || []
  const recommendedNextSteps = report.recommended_next_steps || []
  const resourceLinks = report.resource_links || {
    crisis_helpline: 'N/A',
    platform_reporting: 'N/A',
    law_enforcement: 'N/A',
    mental_health: 'N/A'
  }
  const safetyTips = report.safety_tips || []

  return (
    <motion.div
      className="card flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{report.report_title || 'Incident Report'}</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Generated: {report.date_generated || new Date().toLocaleDateString()}</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[500px] space-y-0">

        <Section title="Summary for Authorities">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {report.summary_for_authorities || 'No summary provided.'}
          </p>
        </Section>

        <Section title="Personal Account">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {report.personal_summary || 'No details provided.'}
          </p>
        </Section>

        <Section title="Timeline">
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {timeline.first_contact && <li><span className="font-medium">First contact:</span> {timeline.first_contact}</li>}
            {timeline.pattern_duration && <li><span className="font-medium">Duration:</span> {timeline.pattern_duration}</li>}
            {timeline.recent_incident && <li><span className="font-medium">Most recent:</span> {timeline.recent_incident}</li>}
            {timeline.escalation_observed && <li><span className="font-medium">Escalation:</span> {timeline.escalation_observed}</li>}
          </ul>
        </Section>

        {keyIndicators.length > 0 && (
          <Section title="Key Indicators Detected">
            <ul className="space-y-1">
              {keyIndicators.map((ind, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-primary-500 mt-0.5 shrink-0">•</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Severity Assessment">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {report.severity_assessment || 'No severity details provided.'}
          </p>
        </Section>

        {recommendedNextSteps.length > 0 && (
          <Section title="Recommended Next Steps">
            <ol className="space-y-2">
              {recommendedNextSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="shrink-0 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section title="Resources">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {[
              ['Crisis Helpline', resourceLinks.crisis_helpline],
              ['Platform Reporting', resourceLinks.platform_reporting],
              ['Law Enforcement', resourceLinks.law_enforcement],
              ['Mental Health', resourceLinks.mental_health],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className="font-medium text-gray-800 dark:text-gray-200 text-xs mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </Section>

        {safetyTips.length > 0 && (
          <Section title="Safety Tips">
            <ul className="space-y-1">
              {safetyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-success-600 shrink-0">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {/* Download buttons */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
        {onDownloadPDF && (
          <motion.button
            onClick={onDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            📑 Download PDF
          </motion.button>
        )}
        {onDownloadText && (
          <motion.button
            onClick={onDownloadText}
            className="flex items-center gap-2 px-4 py-2 bg-success-600 hover:bg-success-700 text-white text-sm font-semibold rounded-lg transition-colors"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            📄 Download Text
          </motion.button>
        )}
        {onDownloadJSON && (
          <motion.button
            onClick={onDownloadJSON}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            📥 Download JSON
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
