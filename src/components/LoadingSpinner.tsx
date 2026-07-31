import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  text?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ text, fullScreen = true }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'min-h-screen' : 'py-12'}`}>
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
