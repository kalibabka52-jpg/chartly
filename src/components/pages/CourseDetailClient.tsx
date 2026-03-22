// src/components/pages/CourseDetailClient.tsx
'use client'
import { useState } from 'react'
import { Badge }               from '@/components/atoms/Badge'
import { Avatar }              from '@/components/atoms/Avatar'
import { LessonRow }           from '@/components/lesson/LessonRow'
import { CourseEnrollSidebar } from '@/components/navigation/CourseEnrollSidebar'
import { mockQuests, mockUserProgress, categoryGradient, getCourseState } from '@/lib/mock-data'
import type { Course } from '@/types'

type Tab = 'overview' | 'curriculum' | 'instructor'

interface Props {
  course: Course
}

export function CourseDetailClient({ course }: Props) {
  const [tab, setTab] = useState<Tab>('overview')
  const quest    = mockQuests.find(q => q.courseIds.includes(course.id))
  const state    = getCourseState(course, mockUserProgress)
  const enrolled = state !== 'not-started' && state !== 'locked'

  return (
    <div className="max-w-5xl">
      {/* Hero header */}
      <div className={`rounded-2xl p-8 bg-gradient-to-br ${categoryGradient(course.category)} text-white mb-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="relative z-10">
          <Badge variant="tag" category={course.category} className="mb-3">
            {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
          <p className="text-white/70 text-sm mb-4">by {course.instructor.name} · {course.difficulty} · {course.xpTotal} XP</p>
          {quest && <Badge variant="icon" emoji={quest.badgeEmoji} label={quest.title} className="text-white" />}
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-brand-50 p-1 rounded-xl w-fit">
            {(['overview', 'curriculum', 'instructor'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                  ${tab === t ? 'bg-white text-brand-900 shadow-card' : 'text-brand-900/60 hover:text-brand-900'}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="prose prose-sm max-w-none text-brand-900/80 leading-relaxed">
              <p>{course.overview}</p>
            </div>
          )}

          {tab === 'curriculum' && (
            <div className="flex flex-col gap-0.5">
              {course.lessons.map((lesson, i) => (
                <LessonRow key={lesson.id} lesson={lesson} number={i + 1} />
              ))}
            </div>
          )}

          {tab === 'instructor' && (
            <div className="flex items-start gap-4">
              <Avatar name={course.instructor.name} size="lg" />
              <div>
                <p className="font-semibold text-brand-900 mb-1">{course.instructor.name}</p>
                <p className="text-brand-900/70 text-sm leading-relaxed">{course.instructor.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Enroll sidebar */}
        <CourseEnrollSidebar course={course} quest={quest} enrolled={enrolled} />
      </div>
    </div>
  )
}
