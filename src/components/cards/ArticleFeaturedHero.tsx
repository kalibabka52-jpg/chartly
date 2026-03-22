import Link from 'next/link'
import type { Article } from '@/types'
import { MiniChart } from '@/components/data/MiniChart'
import { Button } from '@/components/atoms/Button'

const DECORATIVE_SPARKLINE = [1.082, 1.083, 1.086, 1.084, 1.088, 1.087, 1.090, 1.089]

export function ArticleFeaturedHero({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return (
    <div className="relative rounded-3xl overflow-hidden bg-brand-900 text-white p-8 md:p-12 mb-12">
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="flex-1">
          <span className="inline-block text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Featured</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-3">
            {article.title}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-white/40 mb-6">
            <span>{article.author}</span>
            <span>{date}</span>
            <span>{article.readTimeMinutes}m read</span>
          </div>
          <Link href={`/blog/${article.slug}`}>
            <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
              Read Article →
            </Button>
          </Link>
        </div>
        <div className="shrink-0 bg-white/10 rounded-2xl p-4">
          <p className="text-white/50 text-xs mb-2">EUR/USD</p>
          <MiniChart data={DECORATIVE_SPARKLINE} positive={true} width={140} height={56} />
        </div>
      </div>
    </div>
  )
}
