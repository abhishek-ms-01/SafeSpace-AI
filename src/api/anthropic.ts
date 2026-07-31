// ─────────────────────────────────────────────────────────────
// SafeSpace AI — AI API Layer (powered by Groq)
// Same exported function signatures as before —
// everything else in the app imports from this file unchanged.
// ─────────────────────────────────────────────────────────────

import Groq from 'groq-sdk'
import { PROMPTS } from './prompts'
import {
  GROQ_MODEL_FAST,
  GROQ_MODEL_SMART,
  MAX_TOKENS_DETECTION,
  MAX_TOKENS_SEVERITY,
  MAX_TOKENS_CHAT,
  MAX_TOKENS_REPORT,
  MAX_TOKENS_RESOURCES,
} from './constants'
import type {
  DetectionResult,
  SeverityAssessment,
  ChatMessage,
  IncidentReport,
  SafetyResources,
  ThreatType,
  SeverityLevel,
} from '../types'

// ── Client Initialization ─────────────────────────────────────
const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

// ── Generic JSON Call Wrapper ─────────────────────────────────
/**
 * Sends a prompt to Groq and parses the JSON response.
 * Strips accidental markdown code fences before parsing.
 */
async function callGroq<T>(
  prompt: string,
  model: string,
  maxTokens: number,
  systemPrompt?: string
): Promise<T> {
  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    ...(systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }]
      : []),
    { role: 'user' as const, content: prompt },
  ]

  const response = await client.chat.completions.create({
    model,
    max_tokens: maxTokens,
    messages,
    // Ask the model to return only JSON
    response_format: { type: 'json_object' },
  })

  const raw = response.choices[0]?.message?.content ?? '{}'

  // Strip markdown fences just in case
  const clean = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  try {
    return JSON.parse(clean) as T
  } catch {
    console.error('[SafeSpace] Failed to parse Groq response:', clean)
    throw new Error('The AI returned an unexpected format. Please try again.')
  }
}

// ── 1. Threat Detection ───────────────────────────────────────
/**
 * Analyzes a message for signs of online harassment or threats.
 */
export async function detectThreat(message: string): Promise<DetectionResult> {
  if (!message.trim()) throw new Error('Message cannot be empty.')

  const prompt = PROMPTS.THREAT_DETECTION.replace('{message}', message)

  try {
    return await callGroq<DetectionResult>(
      prompt,
      GROQ_MODEL_FAST,
      MAX_TOKENS_DETECTION
    )
  } catch (error) {
    console.error('[SafeSpace] detectThreat error:', error)
    throw new Error('Failed to analyze the message. Please try again.')
  }
}

// ── 2. Severity Assessment ────────────────────────────────────
/**
 * Performs a deeper risk analysis and returns severity level + risk factors.
 */
export async function assessSeverity(
  message: string,
  context: string = ''
): Promise<SeverityAssessment> {
  const prompt = PROMPTS.SEVERITY_ASSESSMENT
    .replace('{message}', message)
    .replace('{context}', context || 'No additional context provided.')

  try {
    return await callGroq<SeverityAssessment>(
      prompt,
      GROQ_MODEL_FAST,
      MAX_TOKENS_SEVERITY
    )
  } catch (error) {
    console.error('[SafeSpace] assessSeverity error:', error)
    throw new Error('Failed to assess severity. Please try again.')
  }
}

// ── 3. Chat with Companion ────────────────────────────────────
/**
 * Sends a message to the empathetic AI companion.
 * Full conversation history is passed for context continuity.
 */
export async function chatWithCompanion(
  userMessage: string,
  chatHistory: ChatMessage[]
): Promise<string> {
  // Build history — Groq uses OpenAI-compatible format
  const historyMessages: Groq.Chat.ChatCompletionMessageParam[] = chatHistory.map(
    msg => ({ role: msg.role, content: msg.content })
  )

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: PROMPTS.EMPATHETIC_CHAT },
    ...historyMessages,
    { role: 'user', content: userMessage },
  ]

  try {
    const response = await client.chat.completions.create({
      model: GROQ_MODEL_FAST,
      max_tokens: MAX_TOKENS_CHAT,
      messages,
    })
    return (
      response.choices[0]?.message?.content ??
      "I'm here for you. Please continue."
    )
  } catch (error) {
    console.error('[SafeSpace] chatWithCompanion error:', error)
    throw new Error('Failed to send message. Please check your connection.')
  }
}

// ── 4. Generate Incident Report ───────────────────────────────
/**
 * Generates a comprehensive, exportable incident report.
 * Uses the smarter model for richer output.
 */
export async function generateReport(
  incidentType: ThreatType,
  severity: SeverityLevel,
  messages: string[],
  context: string = ''
): Promise<IncidentReport> {
  const prompt = PROMPTS.INCIDENT_REPORT
    .replace('{type}', incidentType)
    .replace('{severity}', severity)
    .replace('{messages}', messages.join('\n---\n'))
    .replace('{context}', context || 'No additional context provided.')

  // Try smart model first, fall back to fast model on rate-limit/error
  try {
    return await callGroq<IncidentReport>(prompt, GROQ_MODEL_SMART, MAX_TOKENS_REPORT)
  } catch (smartErr) {
    console.warn('[SafeSpace] Smart model failed, retrying with fast model:', smartErr)
    try {
      return await callGroq<IncidentReport>(prompt, GROQ_MODEL_FAST, MAX_TOKENS_REPORT)
    } catch (fastErr) {
      console.error('[SafeSpace] generateReport error (both models):', fastErr)
      throw new Error('Failed to generate incident report. Please try again.')
    }
  }
}

// ── 5. Route to Safety Resources ─────────────────────────────
/**
 * Returns localized safety resources based on incident type and severity.
 */
export async function routeToResources(
  incidentType: ThreatType,
  severity: SeverityLevel,
  country: string = 'US'
): Promise<SafetyResources> {
  const prompt = PROMPTS.SAFETY_ROUTING
    .replace('{type}', incidentType)
    .replace('{severity}', severity)
    .replace('{country}', country)

  // Try smart model first, fall back to fast model on rate-limit/error
  try {
    return await callGroq<SafetyResources>(prompt, GROQ_MODEL_SMART, MAX_TOKENS_RESOURCES)
  } catch (smartErr) {
    console.warn('[SafeSpace] Smart model failed for resources, retrying:', smartErr)
    try {
      return await callGroq<SafetyResources>(prompt, GROQ_MODEL_FAST, MAX_TOKENS_RESOURCES)
    } catch (fastErr) {
      console.error('[SafeSpace] routeToResources error (both models):', fastErr)
      throw new Error('Failed to fetch safety resources. Please try again.')
    }
  }
}
