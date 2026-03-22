// src/app/(public)/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchArticleBySlug, fetchArticles, fetchCourses } from '@/lib/sanity-fetch'
import { BlogArticleClient } from '@/components/pages/BlogArticleClient'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await fetchArticleBySlug(params.slug)
  if (!article) notFound()

  // Fetch all articles and courses for related content
  const [allArticles, allCourses] = await Promise.all([
    fetchArticles(),
    fetchCourses(),
  ])

  const relatedArticles = (article.relatedArticleSlugs ?? [])
    .map(s => allArticles.find(a => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))

  const relatedCourse = allCourses.find(
    c => c.category === article.category && !c.prerequisiteQuestId
  ) ?? null

  return (
    <BlogArticleClient
      article={article}
      relatedArticles={relatedArticles}
      relatedCourse={relatedCourse}
    />
  )
}
