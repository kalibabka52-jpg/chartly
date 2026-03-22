import type { Badge } from '@/types'
import { Badge as BadgeAtom } from '@/components/atoms/Badge'

interface BadgeGridProps {
  badges: Badge[]
  earnedIds: string[]
}

export function BadgeGrid({ badges, earnedIds }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
      {badges.map(badge => (
        <BadgeAtom key={badge.id} variant="icon" emoji={badge.emoji} label={badge.name}
          locked={!earnedIds.includes(badge.id)} />
      ))}
    </div>
  )
}
