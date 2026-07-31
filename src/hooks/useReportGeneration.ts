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
  downloadReportAsPDF: () => void
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

  /**
   * Opens a new print-ready window with the full report formatted as a
   * professional PDF document and triggers the browser Save-as-PDF dialog.
   */
  const downloadReportAsPDF = useCallback(() => {
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

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SafeSpace AI — Incident Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a2e;
      background: #fff;
      padding: 0;
    }
    /* ── Cover header ── */
    .cover {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%);
      color: #fff;
      padding: 40px 48px 32px;
      border-bottom: 4px solid #6366f1;
    }
    .cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(99,102,241,0.15);
      border: 1px solid rgba(99,102,241,0.4);
      border-radius: 100px;
      padding: 4px 14px;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #a5b4fc;
      margin-bottom: 16px;
    }
    .cover h1 {
      font-size: 22pt;
      font-weight: 900;
      letter-spacing: -0.02em;
      line-height: 1.2;
      margin-bottom: 8px;
    }
    .cover-meta {
      font-size: 9.5pt;
      color: #94a3b8;
      margin-top: 16px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    .cover-meta span { display: flex; align-items: center; gap: 5px; }
    /* ── Body ── */
    .body { padding: 36px 48px; }
    .section { margin-bottom: 28px; break-inside: avoid; }
    .section-title {
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #6366f1;
      border-bottom: 1.5px solid #e0e7ff;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .section p, .section li { font-size: 10.5pt; color: #334155; }
    .section ul, .section ol { padding-left: 18px; }
    .section li { margin-bottom: 4px; }
    /* ── Grid for resources ── */
    .res-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .res-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .res-card .label { font-size: 8pt; color: #94a3b8; font-weight: 600; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.07em; }
    .res-card .value { font-size: 10pt; color: #1e293b; font-weight: 500; }
    /* ── Steps ── */
    .step { display: flex; gap: 10px; margin-bottom: 8px; }
    .step-num {
      width: 22px; height: 22px;
      background: #6366f1;
      color: white;
      border-radius: 50%;
      font-size: 8.5pt;
      font-weight: 800;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }
    /* ── Tips ── */
    .tip { display: flex; gap: 8px; margin-bottom: 6px; font-size: 10.5pt; }
    .tip-icon { color: #22c55e; font-weight: 800; flex-shrink: 0; }
    /* ── Footer ── */
    .footer {
      margin-top: 40px;
      padding: 20px 48px;
      border-top: 1.5px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5pt;
      color: #94a3b8;
    }
    .footer strong { color: #6366f1; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .cover { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%) !important; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <div class="cover-badge">🛡 SafeSpace AI — Confidential</div>
    <h1>${report.report_title || 'Official Incident Report'}</h1>
    <div class="cover-meta">
      <span>📅 Generated: ${report.date_generated || new Date().toLocaleDateString()}</span>
      <span>🔒 Private &amp; Confidential</span>
      <span>⚡ Powered by SafeSpace AI</span>
    </div>
  </div>

  <div class="body">
    ${report.summary_for_authorities ? `
    <div class="section">
      <div class="section-title">Summary for Authorities</div>
      <p>${report.summary_for_authorities}</p>
    </div>` : ''}

    ${report.personal_summary ? `
    <div class="section">
      <div class="section-title">Personal Account</div>
      <p>${report.personal_summary}</p>
    </div>` : ''}

    <div class="section">
      <div class="section-title">Timeline</div>
      <ul>
        ${timeline.first_contact ? `<li><strong>First contact:</strong> ${timeline.first_contact}</li>` : ''}
        ${timeline.pattern_duration ? `<li><strong>Duration:</strong> ${timeline.pattern_duration}</li>` : ''}
        ${timeline.recent_incident ? `<li><strong>Most recent:</strong> ${timeline.recent_incident}</li>` : ''}
        ${timeline.escalation_observed ? `<li><strong>Escalation:</strong> ${timeline.escalation_observed}</li>` : ''}
      </ul>
    </div>

    ${keyIndicators.length > 0 ? `
    <div class="section">
      <div class="section-title">Key Indicators Detected</div>
      <ul>${keyIndicators.map((ind: string) => `<li>${ind}</li>`).join('')}</ul>
    </div>` : ''}

    ${report.severity_assessment ? `
    <div class="section">
      <div class="section-title">Severity Assessment</div>
      <p>${report.severity_assessment}</p>
    </div>` : ''}

    ${recommendedNextSteps.length > 0 ? `
    <div class="section">
      <div class="section-title">Recommended Next Steps</div>
      ${recommendedNextSteps.map((step: string, i: number) => `
      <div class="step">
        <div class="step-num">${i + 1}</div>
        <div>${step}</div>
      </div>`).join('')}
    </div>` : ''}

    <div class="section">
      <div class="section-title">Resources</div>
      <div class="res-grid">
        <div class="res-card"><div class="label">Crisis Helpline</div><div class="value">${resourceLinks.crisis_helpline}</div></div>
        <div class="res-card"><div class="label">Platform Reporting</div><div class="value">${resourceLinks.platform_reporting}</div></div>
        <div class="res-card"><div class="label">Law Enforcement</div><div class="value">${resourceLinks.law_enforcement}</div></div>
        <div class="res-card"><div class="label">Mental Health</div><div class="value">${resourceLinks.mental_health}</div></div>
      </div>
    </div>

    ${safetyTips.length > 0 ? `
    <div class="section">
      <div class="section-title">Safety Tips</div>
      ${safetyTips.map((tip: string) => `<div class="tip"><span class="tip-icon">✓</span><span>${tip}</span></div>`).join('')}
    </div>` : ''}
  </div>

  <div class="footer">
    <span>Generated by <strong>SafeSpace AI</strong> — You are not alone.</span>
    <span>🔒 Confidential — Do not share without consent</span>
  </div>

  <script>
    window.onload = function() { window.print(); }
  <\/script>
</body>
</html>`

    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
    }
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
    downloadReportAsPDF,
    reset,
  }
}
