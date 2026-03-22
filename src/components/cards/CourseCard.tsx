import Link from 'next/link'
import type { Course, UserProgress } from '@/types'
import { Badge } from '@/components/atoms/Badge'
import { categoryGradient, getCourseState, getCourseProgress } from '@/lib/mock-data'

interface CourseCardProps {
  course: Course
  progress: UserProgress
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const state = getCourseState(course, progress)
  const pct   = getCourseProgress(course, progress)
  const isLocked = state === 'locked'

  return (
    <Link href={isLocked ? '#' : `/courses/${course.slug}`}
      className={`group relative block rounded-2xl overflow-hidden shadow-card hover:shadow-brand-lg transition-[transform,box-shadow] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${isLocked ? 'cursor-default' : ''}`}
      tabIndex={isLocked ? -1 : undefined}
      aria-disabled={isLocked}>

      {/* Gradient header */}
      <div className={`h-28 bg-gradient-to-br ${categoryGradient(course.category)} relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-3 left-3">
          <Badge variant="tag" category={course.category}>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 text-white/80 text-xs font-mono">{course.xpTotal} XP</div>
      </div>

      {/* Body */}
      <div className="bg-white p-4">
        <h3 className="font-semibold text-brand-900 text-sm mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-brand-900/50 text-xs mb-3">{course.lessonCount} lessons · {course.difficulty}</p>

        {/* Progress bar */}
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
          className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-[width]" style={{ width: `${pct}%` }} />
        </div>
        {pct > 0 && <p className="text-xs text-brand-900/50 mt-1">{pct}% complete</p>}
      </div>

      {/* Lock overlay */}
      {isLocked && (
        <div aria-label="Locked course" className="absolute inset-0 bg-white/70 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center gap-2">
          <span className="text-2xl">🔒</span>
          <p className="text-xs font-medium text-brand-900/70 text-center px-4">Complete prerequisite quest to unlock</p>
        </div>
      )}
    </Link>
  )
}
