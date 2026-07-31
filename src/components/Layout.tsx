import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useDarkMode } from '../hooks/useDarkMode'

interface LayoutProps {
  children: ReactNode
  showDarkModeToggle?: boolean
}

export function Layout({ children, showDarkModeToggle = true }: LayoutProps) {
  const { isDarkMode, toggle } = useDarkMode()

  const handlePanicExit = () => {
    try {
      sessionStorage.clear()
      localStorage.clear()
    } catch (e) {}
    window.location.replace('https://www.google.com')
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-gradient-canvas"
    >
      {/* Top Header Actions (Exit Quickly + Dark Mode Toggle) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <motion.button
          onClick={handlePanicExit}
          className="
            px-4 h-10 rounded-full
            bg-red-600 hover:bg-red-700
            text-white text-sm font-semibold shadow-lg
            flex items-center gap-1.5 transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>✕</span> Exit Quickly
        </motion.button>

        {showDarkModeToggle && (
          <motion.button
            onClick={toggle}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="
              w-10 h-10 rounded-full
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              shadow-lg hover:shadow-xl
              flex items-center justify-center text-lg
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
            "
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.92 }}
          >
            <motion.span
              key={isDarkMode ? 'sun' : 'moon'}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.span>
          </motion.button>
        )}
      </div>

      {/* Page content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        {children}
      </motion.main>
    </div>
  )
}
