// src/components/pages/BlogArticleClient.tsx
'use client'
import Link from 'next/link'
import { Badge }       from '@/components/atoms/Badge'
import { StockWidget } from '@/components/data/StockWidget'
import { Button }      from '@/components/atoms/Button'
import { useSession }  from '@/lib/auth'
import type { Article, Course } from '@/types'

interface Props {
  article: Article
  relatedArticles: Article[]
  relatedCourse: Course | null
}

export function BlogArticleClient({ article, relatedArticles, relatedCourse }: Props) {
  const session = useSession()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex gap-10">
        {/* Article body */}
        <article className="flex-1 min-w-0">
          <Badge variant="tag" category={article.category} className="mb-4">
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-brand-900/50 mb-8">
            <span>{article.author}</span>
            <span>·</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span>{article.readTimeMinutes}m read</span>
          </div>

          {/* Article prose */}
          <div className="prose prose-sm max-w-none text-brand-900/80 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: article.body }} />

          {/* Inline stock widgets for related pairs */}
          {article.relatedPairs && article.relatedPairs.length > 0 && (
            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="col-span-full text-xs font-semibold text-brand-900/50 uppercase tracking-widest">Live Prices</p>
              {article.relatedPairs.map(pair => <StockWidget key={pair} pair={pair} />)}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden lg:flex flex-col gap-6">
          {/* Course CTA */}
          {relatedCourse && (
            <div className="bg-brand-50 rounded-2xl p-4 border border-brand-100">
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">Recommended Course</p>
              <p className="font-semibold text-brand-900 text-sm mb-3">{relatedCourse.title}</p>
              <Link href={session ? `/courses/${relatedCourse.slug}` : '/signup'}>
                <Button size="sm" className="w-full">
                  {session ? 'Go to course →' : 'Start Learning →'}
                </Button>
              </Link>
            </div>
          )}

          {/* Related pairs (compact, no sparkline) */}
          {article.relatedPairs && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-brand-900/50 uppercase tracking-widest">Related Pairs</p>
              {article.relatedPairs.map(pair => (
                <StockWidget key={pair} pair={pair} showSparkline={false} />
              ))}
            </div>
          )}

          {/* Related articles — plain links */}
          {relatedArticles.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-brand-900/50 uppercase tracking-widest mb-2">Related</p>
              <div className="flex flex-col gap-2">
                {relatedArticles.map(a => (
                  <a key={a.slug} href={`/blog/${a.slug}`}
                    className="text-sm text-brand-600 hover:text-brand-700 transition-[opacity] leading-snug">
                    {a.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
