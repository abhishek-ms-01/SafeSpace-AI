// ─────────────────────────────────────────────────────────────
// useDetection — Threat analysis business logic
//
// Orchestrates two sequential API calls:
//   1. detectThreat()    → identifies if a threat exists + type
//   2. assessSeverity()  → deeper risk analysis (only if threat found)
//
// Returns all state + analyzeMessage() + reset() to the component.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react'
import { detectThreat, assessSeverity } from '../api/anthropic'
import type { DetectionResult, SeverityAssessment } from '../types'
import { getErrorMessage } from '../utils/errorHandler'

interface UseDetectionReturn {
  // State
  loading: boolean
  error: string | null
  detectionResult: DetectionResult | null
  severityAssessment: SeverityAssessment | null
  // Actions
  analyzeMessage: (message: string) => Promise<void>
  reset: () => void
}

export function useDetection(): UseDetectionReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const [severityAssessment, setSeverityAssessment] = useState<SeverityAssessment | null>(null)

  /**
   * Runs threat detection on the provided message.
   * If a threat is found, automatically runs severity assessment.
   * Both results are stored in state for components to consume.
   */
  const analyzeMessage = useCallback(async (message: string) => {
    // Guard: skip empty inputs
    if (!message.trim()) {
      setError('Please enter a message to analyze.')
      return
    }

    setLoading(true)
    setError(null)
    setDetectionResult(null)
    setSeverityAssessment(null)

    try {
      // Step 1: Detect if a threat exists
      const detection = await detectThreat(message)
      setDetectionResult(detection)

      // Step 2: If threat detected, run severity assessment
      if (detection.threat_detected) {
        const severity = await assessSeverity(message, detection.context_needed)
        setSeverityAssessment(severity)
      }
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
      console.error('[useDetection] analyzeMessage failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Resets all detection state back to initial values.
   * Call this when the user wants to analyze a new message.
   */
  const reset = useCallback(() => {
    setDetectionResult(null)
    setSeverityAssessment(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    loading,
    error,
    detectionResult,
    severityAssessment,
    analyzeMessage,
    reset,
  }
}
