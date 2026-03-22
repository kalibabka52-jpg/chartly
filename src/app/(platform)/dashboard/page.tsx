// src/app/(platform)/dashboard/page.tsx
import Link from 'next/link'
import { Button }    from '@/components/atoms/Button'
import { QuestCard } from '@/components/cards/QuestCard'
import { CourseRow } from '@/components/cards/CourseRow'
import { fetchCourses } from '@/lib/sanity-fetch'
import { mockQuests, mockUserProgress } from '@/lib/mock-data'

export default async function DashboardPage() {
  const courses = await fetchCourses()
  const progress     = mockUserProgress
  const activeQuest  = mockQuests[0]
  const inProgress   = courses.filter(c =>
    c.lessons.some(l => progress.completedLessonIds.includes(l.id))
  )
  const activeCourse = inProgress[0] ?? courses[0]
  const activeLesson = activeCourse?.lessons.find(l => l.status === 'active') ?? activeCourse?.lessons[0]

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Continue learning hero */}
      {activeCourse && activeLesson && (
        <div className="relative bg-brand-900 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">Continue Learning</p>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-1">{activeCourse.title}</h2>
            <p className="text-white/60 text-sm mb-6">{activeLesson.title}</p>
            <Link href={`/courses/${activeCourse.slug}/${activeLesson.slug}`}>
              <Button size="md">Resume Lesson →</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Quests',  value: mockQuests.filter(q => !progress.completedQuestIds.includes(q.id)).length },
          { label: 'Day Streak',    value: progress.streakDays, suffix: '🔥' },
          { label: 'Badges Earned', value: progress.earnedBadgeIds.length },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card text-center">
            <p className="font-display text-3xl font-bold text-brand-900 mb-1">{stat.value}{stat.suffix}</p>
            <p className="text-brand-900/50 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two-column lower */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Active quest */}
        <div>
          <h3 className="font-semibold text-brand-900 text-sm mb-3">Active Quest</h3>
          <QuestCard quest={activeQuest} progress={progress} />
        </div>

        {/* My Courses */}
        <div>
          <h3 className="font-semibold text-brand-900 text-sm mb-3">My Courses</h3>
          <div className="bg-white rounded-2xl p-4 shadow-card flex flex-col divide-y divide-brand-50">
            {courses.slice(0, 5).map(c => (
              <CourseRow key={c.id} course={c} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
