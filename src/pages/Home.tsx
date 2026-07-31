import { motion } from 'framer-motion'

interface HomeProps {
  onStart: () => void
}

const STEPS = [
  { icon: '🛡️', title: 'Document & Safe Paste', desc: 'Securely enter harassment transcripts, messages, or descriptions of what occurred.' },
  { icon: '⚖️', title: 'Objective Analysis', desc: 'Our privacy-focused AI instantly evaluates threat levels, severity, and potential risks.' },
  { icon: '🤝', title: 'Trauma-Informed Support', desc: 'Process the situation safely and privately with a companion designed for high-stress incidents.' },
  { icon: '📋', title: 'Standardized Incident Records', desc: 'Download a structured PDF or text report and instantly connect with vetted support resources.' },
]

const TRUST_PILLS = [
  { icon: '🔒', title: 'Zero Data Retention', desc: 'All texts are processed in-memory and never saved to a database' },
  { icon: '💾', title: 'Local Storage Only', desc: 'Incident reports and chat histories remain strictly on your local device' },
  { icon: '⚡', title: 'Immediate Purge Option', desc: 'Wipe all session data instantly at any moment with the panic exit' },
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
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <motion.div
        className="w-full max-w-4xl z-10"
        variants={CONTAINER}
        initial="hidden"
        animate="show"
      >
        {/* Support Pill Badge */}
        <motion.div variants={ITEM} className="flex justify-center mb-6">
          <div className="
            inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-primary-50/80 dark:bg-primary-950/20
            border border-primary-200/50 dark:border-primary-800/30
            backdrop-blur-md shadow-sm
          ">
            <span className="text-sm">🛡️</span>
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
              SECURE & ANONYMOUS INCIDENT RESPONSE
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={ITEM} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight max-w-3xl mx-auto">
            Regain control of your <br />
            <span className="text-gradient">digital security and peace of mind.</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            SafeSpace AI helps women understand the impact of online abuse, structure secure evidence records, and access trauma-informed resources—privately, immediately, and completely anonymous.
          </p>
        </motion.div>

        {/* Steps section */}
        <motion.div
          variants={ITEM}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 flex gap-4 items-start relative overflow-hidden"
              variants={ITEM}
              whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.15)' }}
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 text-lg flex items-center justify-center font-bold">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA & Trust Badges */}
        <motion.div variants={ITEM} className="space-y-12 text-center">
          <div className="max-w-md mx-auto relative group">
            {/* Glow backing */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300" />
            <motion.button
              onClick={onStart}
              className="
                relative w-full py-4 px-10
                bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
                text-white text-lg font-bold rounded-full
                shadow-xl transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              "
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Begin Incident Analysis"
            >
              Begin Secure Analysis 🛡️ →
            </motion.button>
          </div>

          {/* Trust cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-gray-100/50 dark:border-slate-900/30">
            {TRUST_PILLS.map((pill, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-gray-50/50 dark:bg-slate-900/10 border border-gray-100/50 dark:border-slate-800/10">
                <span className="text-lg mb-2">{pill.icon}</span>
                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 mb-0.5">{pill.title}</span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500 text-center">{pill.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
