// src/components/pages/CourseCatalogClient.tsx
'use client'
import { useState } from 'react'
import { CourseCard } from '@/components/cards/CourseCard'
import { mockUserProgress } from '@/lib/mock-data'
import type { Course, Category } from '@/types'

type Filter = Category | 'all'
const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Forex', value: 'forex' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Basics', value: 'basics' },
]

interface Props {
  courses: Course[]
}

export function CourseCatalogClient({ courses }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const filtered = courses.filter(c => filter === 'all' || c.category === filter)

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-900 tracking-tight">Course Catalog</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
              ${filter === f.value ? 'bg-brand-600 text-white' : 'bg-white text-brand-900 border border-brand-100 hover:border-brand-300'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <CourseCard key={c.id} course={c} progress={mockUserProgress} />
        ))}
      </div>
    </div>
  )
}
