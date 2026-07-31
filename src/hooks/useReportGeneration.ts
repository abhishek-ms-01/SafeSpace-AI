// ─────────────────────────────────────────────────────────────
// useReportGeneration — Incident report + resource routing logic
//
// Runs two parallel API calls after detection:
//   1. generateReport()      → structured incident report
//   2. routeToResources()    → localized safety resources
//
// Also handles downloading the report as JSON or plain text.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react'
import { generateReport, routeToResources } from '../api/anthropic'
import type { IncidentReport, SafetyResources, ThreatType, SeverityLevel } from '../types'

interface UseReportGenerationReturn {
  // State
  report: IncidentReport | null
  resources: SafetyResources | null
  loading: boolean
  error: string | null
  // Actions
  generateIncidentReport: (
    incidentType: ThreatType,
    severity: SeverityLevel,
    messages: string[],
    context?: string
  ) => Promise<void>
  downloadReportAsJSON: () => void
  downloadReportAsText: () => void
  reset: () => void
}

/** Triggers a browser file download with given content */
function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Formats a date as YYYY-MM-DD for filenames */
const dateStamp = () => new Date().toISOString().split('T')[0]

export function useReportGeneration(): UseReportGenerationReturn {
  const [report, setReport] = useState<IncidentReport | null>(null)
  const [resources, setResources] = useState<SafetyResources | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fires generateReport() and routeToResources() in parallel.
   * Both results are stored independently so the UI can render
   * whichever resolves first (though Promise.all waits for both).
   */
  const generateIncidentReport = useCallback(async (
    incidentType: ThreatType,
    severity: SeverityLevel,
    messages: string[],
    context = ''
  ) => {
    setLoading(true)
    setError(null)
    setReport(null)
    setResources(null)

    // Read user's country from localStorage (set during onboarding)
    const country = localStorage.getItem('userCountry') ?? 'US'

    try {
      // Run both calls in parallel for speed
      const [generatedReport, safetyResources] = await Promise.all([
        generateReport(incidentType, severity, messages, context),
        routeToResources(incidentType, severity, country),
      ])

      setReport(generatedReport)
      setResources(safetyResources)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to generate report.'
      setError(msg)
      console.error('[useReportGeneration] generateIncidentReport failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Downloads the incident report as a formatted JSON file.
   * Useful for sharing with legal professionals or law enforcement.
   */
  const downloadReportAsJSON = useCallback(() => {
    if (!report) return
    const content = JSON.stringify(report, null, 2)
    triggerDownload(content, `SafeSpace_Report_${dateStamp()}.json`, 'application/json')
  }, [report])

  /**
   * Downloads the incident report as a human-readable plain text file.
   * Formatted for easy reading and printing.
   */
  const downloadReportAsText = useCallback(() => {
    if (!report) return

    const timeline = report.timeline || {
      first_contact: 'Unknown',
      pattern_duration: 'N/A',
      recent_incident: 'N/A',
      escalation_observed: 'N/A',
    }
    const keyIndicators = report.key_indicators_detected || []
    const recommendedNextSteps = report.recommended_next_steps || []
    const resourceLinks = report.resource_links || {
      crisis_helpline: 'N/A',
      platform_reporting: 'N/A',
      law_enforcement: 'N/A',
      mental_health: 'N/A',
    }
    const safetyTips = report.safety_tips || []

    const lines: string[] = [
      '═══════════════════════════════════════════════════',
      '              SAFESPACE AI — INCIDENT REPORT       ',
      '═══════════════════════════════════════════════════',
      '',
      `Title:     ${report.report_title || 'Incident Report'}`,
      `Generated: ${report.date_generated || new Date().toLocaleDateString()}`,
      '',
      '─── SUMMARY FOR AUTHORITIES ───────────────────────',
      report.summary_for_authorities || 'N/A',
      '',
      '─── PERSONAL ACCOUNT ──────────────────────────────',
      report.personal_summary || 'N/A',
      '',
      '─── TIMELINE ──────────────────────────────────────',
      `First Contact:  ${timeline.first_contact ?? 'Unknown'}`,
      `Duration:       ${timeline.pattern_duration}`,
      `Most Recent:    ${timeline.recent_incident}`,
      `Escalation:     ${timeline.escalation_observed}`,
      '',
      '─── KEY INDICATORS DETECTED ───────────────────────',
      ...keyIndicators.map((ind: string) => `  • ${ind}`),
      '',
      '─── SEVERITY ASSESSMENT ───────────────────────────',
      report.severity_assessment || 'N/A',
      '',
      '─── RECOMMENDED NEXT STEPS ────────────────────────',
      ...recommendedNextSteps.map((step: string, i: number) => `  ${i + 1}. ${step}`),
      '',
      '─── RESOURCES ─────────────────────────────────────',
      `Crisis Helpline:    ${resourceLinks.crisis_helpline}`,
      `Platform Reporting: ${resourceLinks.platform_reporting}`,
      `Law Enforcement:    ${resourceLinks.law_enforcement}`,
      `Mental Health:      ${resourceLinks.mental_health}`,
      '',
      '─── IMMEDIATE SAFETY TIPS ─────────────────────────',
      ...safetyTips.map((tip: string) => `  • ${tip}`),
      '',
      '═══════════════════════════════════════════════════',
      '  Generated by SafeSpace AI — You are not alone.  ',
      '═══════════════════════════════════════════════════',
    ]

    triggerDownload(lines.join('\n'), `SafeSpace_Report_${dateStamp()}.txt`, 'text/plain')
  }, [report])

  /** Resets all report state back to initial values */
  const reset = useCallback(() => {
    setReport(null)
    setResources(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    report,
    resources,
    loading,
    error,
    generateIncidentReport,
    downloadReportAsJSON,
    downloadReportAsText,
    reset,
  }
}
