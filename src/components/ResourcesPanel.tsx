import { motion } from 'framer-motion'
import type { SafetyResources } from '../types'

interface ResourcesPanelProps {
  resources: SafetyResources | null
}

const STAGGER = { animate: { transition: { staggerChildren: 0.08 } } }
const ITEM = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

export function ResourcesPanel({ resources }: ResourcesPanelProps) {
  if (!resources) return null

  return (
    <motion.div className="space-y-4" variants={STAGGER} initial="initial" animate="animate">

      {/* Emergency block */}
      {resources.urgent_action_needed && (
        <motion.div
          variants={ITEM}
          className="rounded-xl border-2 border-danger-600 bg-danger-100 dark:bg-red-900/20 p-5"
        >
          <h3 className="flex items-center gap-2 text-base font-bold text-danger-700 dark:text-red-300 mb-3">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>🚨</motion.span>
            Urgent Action Needed
          </h3>
          <div className="space-y-1.5 text-sm text-danger-700 dark:text-red-300 font-medium">
            <p>🆘 {resources.emergency_contact.if_immediate_danger}</p>
            <p>💬 Crisis Text: {resources.emergency_contact.crisis_text_line}</p>
            <p>📞 RAINN: {resources.emergency_contact.call_rainn}</p>
          </div>
        </motion.div>
      )}

      {/* Primary resource */}
      <motion.div
        variants={ITEM}
        className="rounded-xl border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 p-5"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3">
          Primary Resource
        </h3>
        <p className="font-bold text-gray-900 dark:text-white text-base mb-1">
          {resources.primary_resource.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-0.5">
          {resources.primary_resource.type} · {resources.primary_resource.availability}
        </p>
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
          {resources.primary_resource.contact}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{resources.primary_resource.description}</p>
      </motion.div>

      {/* Secondary resources */}
      {resources.secondary_resources.length > 0 && (
        <motion.div variants={ITEM}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Additional Resources
          </h3>
          <div className="space-y-2">
            {resources.secondary_resources.map((res, i) => (
              <motion.div
                key={i}
                className="card p-3 hover:shadow-md transition-shadow cursor-default"
                whileHover={{ scale: 1.01 }}
              >
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{res.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{res.type} · {res.contact}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{res.why_recommended}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Immediate safety actions */}
      {resources.immediate_safety_actions.length > 0 && (
        <motion.div
          variants={ITEM}
          className="rounded-xl border-2 border-success-500 bg-success-100 dark:bg-green-900/20 p-5"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-success-700 dark:text-green-300 mb-3">
            ✅ Take These Steps Now
          </h3>
          <ul className="space-y-2">
            {resources.immediate_safety_actions.map((action, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-success-700 dark:text-green-300"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span className="shrink-0 font-bold">{i + 1}.</span>
                <span>{action}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
}
