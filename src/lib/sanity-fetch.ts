// src/lib/sanity-fetch.ts
import { client } from '@/sanity/client'
import {
  allCoursesQuery,
  courseBySlugQuery,
  lessonBySlugQuery,
  allArticlesQuery,
  articleBySlugQuery,
} from '@/sanity/queries'
import { mockCourses, mockArticles } from '@/lib/mock-data'
import type { Course, Lesson, Article, Category, Difficulty } from '@/types'

/* ------------------------------------------------------------------ */
/*  Sanity → App type mappers                                         */
/* ------------------------------------------------------------------ */

function mapSanityCourse(raw: Record<string, unknown>): Course {
  const lessons = Array.isArray(raw.lessons)
    ? (raw.lessons as Record<string, unknown>[]).map((l, i) => mapSanityLessonInCourse(l, i))
    : []

  return {
    id: (raw._id as string) ?? '',
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    overview: (raw.overview as string) ?? '',
    category: (raw.category as Category) ?? 'basics',
    difficulty: (raw.difficulty as Difficulty) ?? 'beginner',
    lessonCount: (raw.lessonCount as number) ?? lessons.length,
    xpTotal: (raw.xpTotal as number) ?? 0,
    lessons,
    instructor: {
      name: (raw.instructor as Record<string, unknown>)?.name as string ?? 'Instructor',
      bio: (raw.instructor as Record<string, unknown>)?.bio as string ?? '',
      avatarUrl: (raw.instructor as Record<string, unknown>)?.avatar as string | undefined,
    },
    ...(raw.prerequisiteQuestId ? { prerequisiteQuestId: raw.prerequisiteQuestId as string } : {}),
  }
}

function mapSanityLessonInCourse(raw: Record<string, unknown>, index: number): Lesson {
  return {
    id: (raw._id as string) ?? `lesson-${index}`,
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    durationMinutes: (raw.duration as number) ?? 0,
    xpReward: (raw.xp as number) ?? 0,
    status: 'locked', // status is determined by user progress, default to locked
  }
}

interface SanityLessonFull {
  id: string
  slug: string
  title: string
  order: number
  durationMinutes: number
  xpReward: number
  videoUrl?: string
  muxPlaybackId?: string
  content?: unknown
  course: Course
}

function mapSanityLessonFull(raw: Record<string, unknown>): SanityLessonFull | null {
  if (!raw) return null
  const courseRaw = raw.course as Record<string, unknown> | undefined
  const courseLessons = Array.isArray(courseRaw?.lessons)
    ? (courseRaw!.lessons as Record<string, unknown>[]).map((l, i) => mapSanityLessonInCourse(l, i))
    : []

  return {
    id: (raw._id as string) ?? '',
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    order: (raw.order as number) ?? 0,
    durationMinutes: (raw.duration as number) ?? 0,
    xpReward: (raw.xp as number) ?? 0,
    videoUrl: raw.videoUrl as string | undefined,
    muxPlaybackId: raw.muxPlaybackId as string | undefined,
    content: raw.content,
    course: courseRaw
      ? {
          id: (courseRaw._id as string) ?? '',
          slug: (courseRaw.slug as string) ?? '',
          title: (courseRaw.title as string) ?? '',
          overview: '',
          category: 'basics' as Category,
          difficulty: 'beginner' as Difficulty,
          lessonCount: courseLessons.length,
          xpTotal: 0,
          lessons: courseLessons,
          instructor: { name: '', bio: '' },
        }
      : {
          id: '',
          slug: '',
          title: '',
          overview: '',
          category: 'basics' as Category,
          difficulty: 'beginner' as Difficulty,
          lessonCount: 0,
          xpTotal: 0,
          lessons: [],
          instructor: { name: '', bio: '' },
        },
  }
}

function mapSanityArticle(raw: Record<string, unknown>): Article {
  return {
    id: (raw._id as string) ?? '',
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    excerpt: (raw.excerpt as string) ?? '',
    body: (raw.body as string) ?? '',
    category: (raw.category as Category) ?? 'basics',
    author: (raw.author as string) ?? '',
    publishedAt: (raw.publishedAt as string) ?? '',
    readTimeMinutes: (raw.readTime as number) ?? (raw.readTimeMinutes as number) ?? 0,
  }
}

/* ------------------------------------------------------------------ */
/*  Fetch functions with Sanity-first, mock-fallback                  */
/* ------------------------------------------------------------------ */

export async function fetchCourses(): Promise<Course[]> {
  try {
    const data = await client.fetch(allCoursesQuery)
    if (Array.isArray(data) && data.length > 0) {
      return data.map((d: Record<string, unknown>) => mapSanityCourse(d))
    }
  } catch (err) {
    console.error('[sanity-fetch] fetchCourses error:', err)
  }
  return mockCourses
}

export async function fetchCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const data = await client.fetch(courseBySlugQuery, { slug })
    if (data) {
      return mapSanityCourse(data as Record<string, unknown>)
    }
  } catch (err) {
    console.error('[sanity-fetch] fetchCourseBySlug error:', err)
  }
  return mockCourses.find(c => c.slug === slug) ?? null
}

export async function fetchLessonBySlug(slug: string): Promise<SanityLessonFull | null> {
  try {
    const data = await client.fetch(lessonBySlugQuery, { slug })
    if (data) {
      return mapSanityLessonFull(data as Record<string, unknown>)
    }
  } catch (err) {
    console.error('[sanity-fetch] fetchLessonBySlug error:', err)
  }
  // Fallback: find lesson in mock data
  for (const course of mockCourses) {
    const idx = course.lessons.findIndex(l => l.slug === slug)
    if (idx !== -1) {
      const lesson = course.lessons[idx]
      return {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        order: idx,
        durationMinutes: lesson.durationMinutes,
        xpReward: lesson.xpReward,
        course,
      }
    }
  }
  return null
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const data = await client.fetch(allArticlesQuery)
    if (Array.isArray(data) && data.length > 0) {
      return data.map((d: Record<string, unknown>) => mapSanityArticle(d))
    }
  } catch (err) {
    console.error('[sanity-fetch] fetchArticles error:', err)
  }
  return mockArticles
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await client.fetch(articleBySlugQuery, { slug })
    if (data) {
      return mapSanityArticle(data as Record<string, unknown>)
    }
  } catch (err) {
    console.error('[sanity-fetch] fetchArticleBySlug error:', err)
  }
  return mockArticles.find(a => a.slug === slug) ?? null
}
