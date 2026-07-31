import { motion } from 'framer-motion'

interface HomeProps {
  onStart: () => void
}

const STEPS = [
  { icon: '📋', title: 'Describe the incident', desc: 'Paste a message or describe what happened in your own words.' },
  { icon: '🔍', title: 'Get instant analysis', desc: 'Our AI identifies threat patterns and severity in seconds.' },
  { icon: '💬', title: 'Talk to a companion', desc: 'A compassionate AI companion listens and helps you process.' },
  { icon: '📄', title: 'Generate your report', desc: 'Download a structured report and access safety resources.' },
]

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const ITEM = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-2xl"
        variants={CONTAINER}
        initial="hidden"
        animate="show"
      >
        {/* Hero */}
        <motion.div variants={ITEM} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500 text-white text-3xl mb-5 shadow-lg">
            🛡
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            SafeSpace AI
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-2">
            You are not alone.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
            Anonymous AI-powered support for women experiencing online harassment, threats, or abuse.
          </p>
        </motion.div>

        {/* Steps card */}
        <motion.div
          variants={ITEM}
          className="card p-8 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 text-center">
            How it works
          </h2>
          <div className="space-y-5">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                variants={ITEM}
              >
                {/* Step number */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">
                    {step.icon} {step.title}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={ITEM} className="space-y-3">
          <motion.button
            onClick={onStart}
            className="
              w-full py-4 px-8
              bg-primary-500 hover:bg-primary-600 active:bg-primary-700
              text-white text-lg font-bold
              rounded-xl shadow-lg hover:shadow-xl
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Start the SafeSpace AI analysis"
          >
            Get Started — It's Free
          </motion.button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400 dark:text-gray-500">
            <span>🔒 Fully anonymous</span>
            <span>🚫 No data stored</span>
            <span>⚡ Instant results</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
