import type { Lesson } from '@/types'

interface LessonRowProps {
  lesson: Lesson
  number: number
  onClick?: () => void
}

const statusIcon = { completed: '✅', active: '▶️', locked: '🔒' }
const statusColor = {
  completed: 'text-emerald-600',
  active:    'text-brand-600',
  locked:    'text-brand-900/30',
}

export function LessonRow({ lesson, number, onClick }: LessonRowProps) {
  return (
    <button
      onClick={lesson.status !== 'locked' ? onClick : undefined}
      disabled={lesson.status === 'locked'}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${lesson.status === 'active' ? 'bg-brand-50' : 'hover:bg-brand-50'} ${lesson.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <span className="text-sm w-5 shrink-0 text-center">{statusIcon[lesson.status]}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium truncate ${statusColor[lesson.status]}`}>
          {number}. {lesson.title}
        </p>
        <p className="text-brand-900/40 text-xs">{lesson.durationMinutes}m · {lesson.xpReward} XP</p>
      </div>
    </button>
  )
}
