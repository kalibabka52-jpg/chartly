// src/app/(platform)/courses/[slug]/[lesson]/page.tsx
import { notFound } from 'next/navigation'
import { fetchCourseBySlug, fetchLessonBySlug } from '@/lib/sanity-fetch'
import { LessonClient } from '@/components/pages/LessonClient'

export default async function LessonPage({ params }: { params: { slug: string; lesson: string } }) {
  const course = await fetchCourseBySlug(params.slug)
  if (!course) notFound()

  const lessonData = await fetchLessonBySlug(params.lesson)

  // Find lesson index from the course's lesson list
  const lessonIdx = course.lessons.findIndex(l => l.slug === params.lesson)
  if (lessonIdx === -1 && !lessonData) notFound()

  const courseLessonAtIdx = course.lessons[lessonIdx]
  const prevLesson = lessonIdx > 0 ? course.lessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < course.lessons.length - 1 ? course.lessons[lessonIdx + 1] : null

  // Build the lesson data object, preferring Sanity lesson data if available
  const lesson = lessonData
    ? {
        id: lessonData.id,
        slug: lessonData.slug,
        title: lessonData.title,
        durationMinutes: lessonData.durationMinutes,
        xpReward: lessonData.xpReward,
        videoUrl: lessonData.videoUrl,
        muxPlaybackId: lessonData.muxPlaybackId,
      }
    : courseLessonAtIdx
      ? {
          id: courseLessonAtIdx.id,
          slug: courseLessonAtIdx.slug,
          title: courseLessonAtIdx.title,
          durationMinutes: courseLessonAtIdx.durationMinutes,
          xpReward: courseLessonAtIdx.xpReward,
        }
      : null

  if (!lesson) notFound()

  return (
    <LessonClient
      course={course}
      lesson={lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      activeLessonSlug={params.lesson}
    />
  )
}
