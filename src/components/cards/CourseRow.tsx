import Link from 'next/link'
import type { Course, UserProgress } from '@/types'
import { getCourseProgress } from '@/lib/mock-data'

interface CourseRowProps {
  course: Course
  progress: UserProgress
}

export function CourseRow({ course, progress }: CourseRowProps) {
  const pct = getCourseProgress(course, progress)
  return (
    <Link href={`/courses/${course.slug}`}
      className="flex items-center gap-4 py-3 hover:bg-brand-50 rounded-xl px-2 -mx-2 transition-[background] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
      <span className="text-sm font-medium text-brand-900 flex-1 truncate group-hover:text-brand-600 transition-[color]">
        {course.title}
      </span>
      <div className="w-24 h-1.5 bg-brand-100 rounded-full overflow-hidden shrink-0">
        <div className="h-full bg-brand-600 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-brand-900/50 w-10 text-right shrink-0">{pct}%</span>
    </Link>
  )
}
