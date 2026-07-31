import { useState } from 'react'
import { motion } from 'framer-motion'

interface MessageInputProps {
  onSubmit: (message: string) => void
  loading?: boolean
  placeholder?: string
}

export function MessageInput({
  onSubmit,
  loading = false,
  placeholder = 'Paste the message or describe what happened...',
}: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !loading) {
      onSubmit(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter submits
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const hasContent = message.trim().length > 0

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full space-y-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Textarea */}
      <div className="relative">
        <textarea
          id="message-input"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          rows={5}
          aria-label="Describe the harassment or paste the message"
          className="
            w-full min-h-[120px] max-h-[300px]
            px-4 py-3
            bg-white dark:bg-gray-900
            border-2 border-gray-200 dark:border-gray-700
            rounded-xl
            text-gray-800 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            text-base leading-relaxed
            resize-y
            transition-all duration-200
            focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          "
        />
        {/* Character hint */}
        <p className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-600 pointer-events-none select-none">
          {message.length > 0 ? `${message.length} chars` : 'Ctrl+Enter to submit'}
        </p>
      </div>

      {/* Submit row */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          🔒 Anonymous & private — no data is stored
        </p>

        <motion.button
          type="submit"
          disabled={!hasContent || loading}
          aria-label="Analyze message for threats"
          className="
            flex items-center gap-2
            px-6 py-2.5
            bg-primary-500 hover:bg-primary-600 active:bg-primary-700
            text-white font-semibold text-sm
            rounded-xl
            transition-colors duration-150
            disabled:opacity-40 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            shadow-md hover:shadow-lg
          "
          whileHover={hasContent && !loading ? { scale: 1.03 } : {}}
          whileTap={hasContent && !loading ? { scale: 0.97 } : {}}
        >
          {loading ? (
            <>
              {/* Mini spinner inside button */}
              <motion.span
                className="block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              Analyzing...
            </>
          ) : (
            <>
              <span>🔍</span>
              Analyze
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  )
}
