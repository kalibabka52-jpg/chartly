'use client'
import { motion } from 'framer-motion'

interface XPBarProps {
  current: number
  max: number
  level: number
  className?: string
}

export function XPBar({ current, max, level, className = '' }: XPBarProps) {
  const pct = Math.min((current / max) * 100, 100)
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between text-xs text-white/60">
        <span>Lv {level}</span>
        <span>{current}/{max} XP</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        />
      </div>
    </div>
  )
}
