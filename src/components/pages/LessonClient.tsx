// src/components/pages/LessonClient.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { VideoPlayer }        from '@/components/lesson/VideoPlayer'
import { NotesPanel }         from '@/components/lesson/NotesPanel'
import { CommentsPanel }      from '@/components/lesson/CommentsPanel'
import { CourseLessonNav }    from '@/components/navigation/CourseLessonNav'
import { XPFloater }          from '@/components/gamification/XPFloater'
import { BadgeUnlockOverlay } from '@/components/gamification/BadgeUnlockOverlay'
import { Button }             from '@/components/atoms/Button'
import { mockBadges, mockUserProgress } from '@/lib/mock-data'
import type { Course, Lesson, Badge } from '@/types'

type LessonTab = 'overview' | 'notes' | 'comments'

interface LessonData {
  id: string
  slug: string
  title: string
  durationMinutes: number
  xpReward: number
  videoUrl?: string
  muxPlaybackId?: string
}

interface Props {
  course: Course
  lesson: LessonData
  prevLesson: Lesson | null
  nextLesson: Lesson | null
  activeLessonSlug: string
}

export function LessonClient({ course, lesson, prevLesson, nextLesson, activeLessonSlug }: Props) {
  const [tab, setTab]       = useState<LessonTab>('overview')
  const [showXP, setShowXP] = useState(false)
  const [badge, setBadge]   = useState<Badge | null>(null)

  function handleComplete() {
    setShowXP(true)
    if (!nextLesson) setBadge(mockBadges[0])
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6 overflow-hidden">
      {/* Left nav panel */}
      <CourseLessonNav
        course={course}
        progress={mockUserProgress}
        activeLessonSlug={activeLessonSlug}
        onLessonSelect={() => {}}
      />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          {/* Video */}
          <VideoPlayer xpReward={lesson.xpReward} onComplete={handleComplete} />

          {/* Tabs */}
          <div className="flex gap-1 my-6 bg-brand-50 p-1 rounded-xl w-fit">
            {(['overview', 'notes', 'comments'] as LessonTab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                  ${tab === t ? 'bg-white text-brand-900 shadow-card' : 'text-brand-900/60 hover:text-brand-900'}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div>
              <h2 className="font-semibold text-brand-900 mb-2">{lesson.title}</h2>
              <p className="text-brand-900/60 text-sm leading-relaxed">
                {lesson.durationMinutes} minutes · {lesson.xpReward} XP on completion
              </p>
            </div>
          )}
          {tab === 'notes'    && <NotesPanel />}
          {tab === 'comments' && <CommentsPanel />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-100">
            {prevLesson ? (
              <Link href={`/courses/${course.slug}/${prevLesson.slug}`}>
                <Button variant="outline" size="sm">← Previous</Button>
              </Link>
            ) : <div />}

            <Button size="sm" onClick={handleComplete}>
              {nextLesson ? 'Mark Complete & Next →' : 'Mark Complete ✓'}
            </Button>
          </div>
        </div>
      </div>

      {/* Gamification overlays */}
      {showXP && <XPFloater amount={lesson.xpReward} onDone={() => setShowXP(false)} />}
      <BadgeUnlockOverlay badge={badge} onClose={() => setBadge(null)} />
    </div>
  )
}
