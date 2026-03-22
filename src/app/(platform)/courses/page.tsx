// src/app/(platform)/courses/page.tsx
import { fetchCourses } from '@/lib/sanity-fetch'
import { CourseCatalogClient } from '@/components/pages/CourseCatalogClient'

export default async function CourseCatalogPage() {
  const courses = await fetchCourses()
  return <CourseCatalogClient courses={courses} />
}
