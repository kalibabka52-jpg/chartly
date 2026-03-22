'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Badge } from '@/types'
import { Button } from '@/components/atoms/Button'

interface BadgeUnlockOverlayProps {
  badge: Badge | null
  onClose: () => void
}

export function BadgeUnlockOverlay({ badge, onClose }: BadgeUnlockOverlayProps) {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-900/90 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="bg-white rounded-3xl p-12 flex flex-col items-center gap-6 max-w-sm mx-4 text-center">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-7xl">
              {badge.emoji}
            </motion.div>
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">Badge Unlocked!</p>
              <h2 className="font-display text-2xl font-bold text-brand-900">{badge.name}</h2>
              <p className="text-brand-900/60 text-sm mt-2">{badge.description}</p>
            </div>
            <Button onClick={onClose} size="lg">Continue</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
