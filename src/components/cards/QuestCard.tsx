import type { Quest, UserProgress } from '@/types'
import { Badge } from '@/components/atoms/Badge'
import { getQuestProgress } from '@/lib/mock-data'

interface QuestCardProps {
  quest: Quest
  progress: UserProgress
}

export function QuestCard({ quest, progress }: QuestCardProps) {
  const { completed, total } = getQuestProgress(quest, progress)
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-brand-900 text-sm mb-0.5">{quest.title}</h3>
          <p className="text-brand-900/50 text-xs">{quest.description}</p>
        </div>
        <Badge variant="icon" emoji={quest.badgeEmoji} />
      </div>

      {/* Progress bar with knob */}
      <div className="relative h-2 bg-brand-100 rounded-full mb-2">
        <div className="h-full bg-brand-600 rounded-full transition-[width]" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-600 rounded-full border-2 border-white shadow transition-[left]"
          style={{ left: `calc(${pct}% - 6px)` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-brand-900/50">
        <span>{completed}/{total} courses</span>
        <span>+{quest.xpBonus} XP bonus</span>
      </div>
    </div>
  )
}
