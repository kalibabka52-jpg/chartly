// src/app/(platform)/courses/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchCourseBySlug } from '@/lib/sanity-fetch'
import { CourseDetailClient } from '@/components/pages/CourseDetailClient'

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await fetchCourseBySlug(params.slug)
  if (!course) notFound()
  return <CourseDetailClient course={course} />
}
