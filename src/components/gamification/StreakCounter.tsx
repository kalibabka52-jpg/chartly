interface StreakCounterProps {
  days: number
  className?: string
}

export function StreakCounter({ days, className = '' }: StreakCounterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg">🔥</span>
      <span className="text-white/80 text-sm font-semibold">{days} day streak</span>
    </div>
  )
}
