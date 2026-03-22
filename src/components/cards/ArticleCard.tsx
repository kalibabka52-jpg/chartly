import Link from 'next/link'
import type { Article } from '@/types'
import { Badge } from '@/components/atoms/Badge'

export function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <Link href={`/blog/${article.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-brand-lg transition-[transform,box-shadow] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
      {/* Color header */}
      <div className={`h-2 bg-gradient-to-r ${article.category === 'forex' ? 'from-brand-600 to-brand-400' : article.category === 'crypto' ? 'from-crypto to-pink-400' : 'from-teal to-teal-400'}`} />
      <div className="p-5">
        <Badge variant="tag" category={article.category} className="mb-3">
          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </Badge>
        <h3 className="font-semibold text-brand-900 text-sm leading-snug mb-2 group-hover:text-brand-600 transition-[color] line-clamp-2">
          {article.title}
        </h3>
        <p className="text-brand-900/60 text-xs line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-brand-900/40">
          <span>{article.author}</span>
          <span>{date} · {article.readTimeMinutes}m read</span>
        </div>
      </div>
    </Link>
  )
}
