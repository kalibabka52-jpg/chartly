'use client'
import { useEffect, useState } from 'react'

interface XPFloaterProps {
  amount: number
  onDone?: () => void
}

export function XPFloater({ amount, onDone }: XPFloaterProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); onDone?.() }, 1200)
    return () => clearTimeout(t)
  }, [onDone])

  if (!visible) return null
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-float-up">
      <div className="bg-brand-600 text-white font-bold px-6 py-3 rounded-full shadow-brand-lg text-lg">
        +{amount} XP
      </div>
    </div>
  )
}
