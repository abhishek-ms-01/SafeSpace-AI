// ─────────────────────────────────────────────────────────────
// useChat — Empathetic AI companion conversation logic
//
// Manages a multi-turn chat session with the Groq AI.
// Maintains full message history so the AI has context.
// startChat() seeds the first assistant message.
// sendMessage() appends user + assistant messages to history.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useRef } from 'react'
import { chatWithCompanion } from '../api/anthropic'
import type { ChatMessage } from '../types'

interface UseChatReturn {
  // State
  chatHistory: ChatMessage[]
  loading: boolean
  error: string | null
  // Actions
  startChat: () => void
  sendMessage: (message: string) => Promise<void>
  clearChat: () => void
}

/** Generates a unique message ID */
const makeId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

/** Initial greeting from the AI companion */
const INITIAL_MESSAGE: Omit<ChatMessage, 'id'> = {
  role: 'assistant',
  content:
    "I'm here with you. Take all the time you need — there's no judgment here. " +
    'Would you like to share what happened?',
  timestamp: new Date(),
}

export function useChat(): UseChatReturn {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ref to track history inside async callbacks without stale closures
  const historyRef = useRef<ChatMessage[]>([])

  const updateHistory = (updater: (prev: ChatMessage[]) => ChatMessage[]) => {
    setChatHistory(prev => {
      const next = updater(prev)
      historyRef.current = next
      return next
    })
  }

  /**
   * Seeds the chat with the AI's opening message.
   * Should be called once when a threat is detected and the
   * chat companion panel becomes visible.
   */
  const startChat = useCallback(() => {
    const initialMsg: ChatMessage = { ...INITIAL_MESSAGE, id: makeId() }
    historyRef.current = [initialMsg]
    setChatHistory([initialMsg])
    setError(null)
  }, [])

  /**
   * Sends a user message to the AI and appends both the user
   * message and the AI's response to the chat history.
   * Uses historyRef to avoid stale closure issues.
   */
  const sendMessage = useCallback(async (userContent: string) => {
    if (!userContent.trim()) return
    if (loading) return

    setError(null)

    // Append user message immediately so UI feels responsive
    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: userContent,
      timestamp: new Date(),
    }
    updateHistory(prev => [...prev, userMsg])

    setLoading(true)

    try {
      // Pass full history including new user message
      const currentHistory = [...historyRef.current]
      const responseText = await chatWithCompanion(userContent, currentHistory)

      const assistantMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      }
      updateHistory(prev => [...prev, assistantMsg])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send message.'
      setError(msg)
      console.error('[useChat] sendMessage failed:', err)

      // Remove the optimistically added user message on failure
      updateHistory(prev => prev.filter(m => m.id !== userMsg.id))
    } finally {
      setLoading(false)
    }
  }, [loading])

  /**
   * Clears the entire chat history and resets state.
   * Useful for starting a fresh conversation.
   */
  const clearChat = useCallback(() => {
    setChatHistory([])
    historyRef.current = []
    setError(null)
    setLoading(false)
  }, [])

  return {
    chatHistory,
    loading,
    error,
    startChat,
    sendMessage,
    clearChat,
  }
}
