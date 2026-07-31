import { motion } from 'framer-motion'

interface NotFoundProps {
  onBack?: () => void
}

export function NotFound({ onBack }: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="card p-12 text-center max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          The page you're looking for doesn't exist.
        </p>
        {onBack && (
          <motion.button
            onClick={onBack}
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl text-sm transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ← Go Home
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
