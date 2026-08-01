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
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 90,
      damping: 15,
      mass: 0.8,
    },
  },
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-16 relative overflow-hidden bg-gradient-canvas">
      {/* Interactive ambient floating background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[100px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 dark:bg-indigo-500/10 blur-[120px]"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-6xl z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
        variants={CONTAINER}
        initial="hidden"
        animate="show"
      >
        {/* Left Column: Hero Copy & CTA */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-start text-left space-y-6">
          {/* Support Pill Badge */}
          <motion.div variants={ITEM} className="flex justify-start">
            <div className="
              inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-primary-500/10 dark:bg-primary-500/10
              border border-primary-500/20 dark:border-primary-500/20
              backdrop-blur-md shadow-sm
            ">
              <span className="text-sm">🛡️</span>
              <span className="text-xs font-bold text-primary-600 dark:text-primary-300 uppercase tracking-wider">
                SafeSpace AI — You are safe here
              </span>
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.div variants={ITEM}>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight font-display">
              Don't face the <br />
              digital shadows alone. <br />
              <span className="text-gradient">We are here to help. <br />Just tell us.</span>
            </h1>
          </motion.div>

          {/* Hero Subtitle */}
          <motion.p variants={ITEM} className="text-gray-500 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-lg">
            SafeSpace AI provides an entirely anonymous, private sanctuary to evaluate online abuse, receive trauma-informed support, and generate secure incident logs. No tracking, no judgment. Just help.
          </motion.p>

          {/* Impact Stat Block */}
          <motion.div variants={ITEM} className="w-full">
            <div className="glass-card px-5 py-4 grid grid-cols-3 divide-x divide-white/[0.06]">
              <div className="flex flex-col items-center text-center px-3 first:pl-0 last:pr-0">
                <span className="text-2xl font-black text-gradient leading-none mb-1">1 in 3</span>
                <span className="text-[10px] text-slate-400 leading-snug">people experience online harassment</span>
              </div>
              <div className="flex flex-col items-center text-center px-3">
                <span className="text-2xl font-black text-gradient leading-none mb-1">73%</span>
                <span className="text-[10px] text-slate-400 leading-snug">of victims never report the incident</span>
              </div>
              <div className="flex flex-col items-center text-center px-3 first:pl-0 last:pr-0">
                <span className="text-2xl font-black text-gradient leading-none mb-1">40%</span>
                <span className="text-[10px] text-slate-400 leading-snug">experience severe forms like stalking or threats</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={ITEM} className="w-full max-w-sm relative group pt-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-45 group-hover:opacity-75 transition duration-300" />
            <motion.button
              onClick={onStart}
              className="
                relative w-full py-4 px-8
                bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
                text-white text-base md:text-lg font-bold rounded-full
                shadow-xl transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              "
              whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              aria-label="Begin Incident Analysis"
            >
              Begin Secure Analysis 🛡️ →
            </motion.button>
          </motion.div>

          {/* Trust Badges — Simple Side-by-Side Horizontal Row */}
          <motion.div variants={ITEM} className="w-full pt-6 border-t border-gray-100/50 dark:border-slate-900/30">
            <div className="flex flex-wrap gap-2">
              {TRUST_PILLS.map((pill, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-1.5 px-3 py-1 rounded-full
                    bg-primary-500/5 dark:bg-primary-500/10
                    border border-primary-500/10 dark:border-primary-500/20
                  "
                >
                  <span className="text-xs shrink-0">{pill.icon}</span>
                  <span className="text-[11px] font-bold text-gray-850 dark:text-slate-200 shrink-0">
                    {pill.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Steps section — 2x2 Grid */}
        <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 flex flex-col items-start relative overflow-hidden"
              variants={ITEM}
              whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.25)', scale: 1.01 }}
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 text-lg flex items-center justify-center font-bold mb-3">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base mb-1.5">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
