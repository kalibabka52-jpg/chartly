import type { Course, UserProgress } from '@/types'
import { LessonRow } from '@/components/lesson/LessonRow'
import { getCourseProgress } from '@/lib/mock-data'

interface CourseLessonNavProps {
  course: Course
  progress: UserProgress
  activeLessonSlug: string
  onLessonSelect: (slug: string) => void
}

export function CourseLessonNav({ course, progress, activeLessonSlug, onLessonSelect }: CourseLessonNavProps) {
  const pct = getCourseProgress(course, progress)
  return (
    <aside className="w-72 bg-white border-r border-brand-100 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-brand-100">
        <h3 className="font-semibold text-brand-900 text-sm mb-2 line-clamp-2">{course.title}</h3>
        <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-[width]" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-brand-900/40 mt-1">{pct}% complete</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
        {course.lessons.map((lesson, i) => (
          <LessonRow key={lesson.id} lesson={lesson} number={i + 1}
            onClick={() => onLessonSelect(lesson.slug)} />
        ))}
      </nav>
    </aside>
  )
}
