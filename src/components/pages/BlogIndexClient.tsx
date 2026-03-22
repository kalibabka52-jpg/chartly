// src/components/pages/BlogIndexClient.tsx
'use client'
import { useState } from 'react'
import { ArticleFeaturedHero } from '@/components/cards/ArticleFeaturedHero'
import { ArticleCard }         from '@/components/cards/ArticleCard'
import type { Article, Category } from '@/types'

type Filter = Category | 'all'
const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Forex', value: 'forex' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Basics', value: 'basics' },
]

interface Props {
  articles: Article[]
}

export function BlogIndexClient({ articles }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const featured = articles[0]
  const filtered = articles.slice(1).filter(a => filter === 'all' || a.category === filter)

  if (!featured) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-brand-900/60">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <ArticleFeaturedHero article={featured} />

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
              ${filter === f.value ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-900 hover:bg-brand-100'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  )
}
