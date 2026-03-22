import type { Course, Quest } from '@/types'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'

interface CourseEnrollSidebarProps {
  course: Course
  quest?: Quest
  enrolled: boolean
}

export function CourseEnrollSidebar({ course, quest, enrolled }: CourseEnrollSidebarProps) {
  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl border border-brand-100 shadow-brand p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-900">{course.xpTotal} XP</span>
          {quest && <Badge variant="icon" emoji={quest.badgeEmoji} label={quest.title} />}
        </div>

        <div className="flex flex-col gap-2 text-sm text-brand-900/70">
          <div className="flex items-center gap-2">
            <span>📚</span><span>{course.lessonCount} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span><span>{course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏆</span><span>Certificate on completion</span>
          </div>
        </div>

        <Link href={`/courses/${course.slug}/${course.lessons[0]?.slug ?? ''}`} className="block">
          <Button className="w-full" size="lg">
            {enrolled ? 'Continue Learning' : 'Enroll Now — Free'}
          </Button>
        </Link>
      </div>
    </aside>
  )
}
