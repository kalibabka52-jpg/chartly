// src/app/(public)/blog/page.tsx
import { fetchArticles } from '@/lib/sanity-fetch'
import { BlogIndexClient } from '@/components/pages/BlogIndexClient'

export default async function BlogPage() {
  const articles = await fetchArticles()
  return <BlogIndexClient articles={articles} />
}
