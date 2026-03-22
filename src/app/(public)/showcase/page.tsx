'use client'
import { useState } from 'react'
import { Button }               from '@/components/atoms/Button'
import { Badge }                from '@/components/atoms/Badge'
import { Input }                from '@/components/atoms/Input'
import { Avatar }               from '@/components/atoms/Avatar'
import { CourseCard }           from '@/components/cards/CourseCard'
import { CourseRow }            from '@/components/cards/CourseRow'
import { ArticleCard }          from '@/components/cards/ArticleCard'
import { ArticleFeaturedHero }  from '@/components/cards/ArticleFeaturedHero'
import { QuestCard }            from '@/components/cards/QuestCard'
import { LessonRow }            from '@/components/lesson/LessonRow'
import { VideoPlayer }          from '@/components/lesson/VideoPlayer'
import { NotesPanel }           from '@/components/lesson/NotesPanel'
import { CommentsPanel }        from '@/components/lesson/CommentsPanel'
import { XPBar }                from '@/components/gamification/XPBar'
import { BadgeGrid }            from '@/components/gamification/BadgeGrid'
import { StreakCounter }        from '@/components/gamification/StreakCounter'
import { XPFloater }            from '@/components/gamification/XPFloater'
import { BadgeUnlockOverlay }   from '@/components/gamification/BadgeUnlockOverlay'
import { StockWidget }          from '@/components/data/StockWidget'
import { CertificateCard }      from '@/components/data/CertificateCard'
import { CourseEnrollSidebar }  from '@/components/navigation/CourseEnrollSidebar'
import { mockCourses, mockQuests, mockBadges, mockArticles, mockUserProgress, mockCertificates } from '@/lib/mock-data'
import type { Badge as BadgeType } from '@/types'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="font-display text-xl font-bold text-brand-900 mb-6 pb-2 border-b border-brand-100">{title}</h2>
      {children}
    </section>
  )
}

export default function ShowcasePage() {
  const [showFloater, setShowFloater] = useState(false)
  const [unlockBadge, setUnlockBadge] = useState<BadgeType | null>(null)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-900 mb-2 tracking-tight">Component Showcase</h1>
      <p className="text-brand-900/60 mb-12">All Chartly UI components. Internal reference only.</p>

      <Section title="Atoms">
        <div className="flex flex-wrap gap-3 mb-6">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge variant="tag" category="forex">Forex</Badge>
          <Badge variant="tag" category="crypto">Crypto</Badge>
          <Badge variant="tag" category="psychology">Psychology</Badge>
          <Badge variant="tag" category="basics">Basics</Badge>
          <Badge variant="icon" emoji="📈" label="Pioneer" />
          <Badge variant="icon" emoji="🎯" label="Locked" locked />
        </div>
        <div className="flex flex-wrap gap-6 mb-6 items-end">
          <Avatar name="Alex Kowalski" size="sm" />
          <Avatar name="Alex Kowalski" size="md" />
          <Avatar name="Alex Kowalski" size="lg" />
        </div>
        <div className="max-w-xs">
          <Input label="Email address" id="email" placeholder="you@example.com" />
          <div className="mt-4">
            <Input label="Password" id="pw" type="password" error="Password is required" />
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <ArticleFeaturedHero article={mockArticles[0]} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {mockCourses.slice(0, 3).map(c => (
            <CourseCard key={c.id} course={c} progress={mockUserProgress} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {mockArticles.slice(0, 3).map(a => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
        <div className="max-w-sm mb-6">
          <QuestCard quest={mockQuests[0]} progress={mockUserProgress} />
        </div>
        <div className="max-w-sm flex flex-col gap-2">
          {mockCourses.slice(0, 3).map(c => (
            <CourseRow key={c.id} course={c} progress={mockUserProgress} />
          ))}
        </div>
      </Section>

      <Section title="Live Data">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {['EUR/USD','GBP/USD','BTC/USD','ETH/USD'].map(pair => (
            <StockWidget key={pair} pair={pair} />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {['EUR/USD','GBP/USD'].map(pair => (
            <StockWidget key={pair} pair={pair} showSparkline={false} />
          ))}
        </div>
        <div className="max-w-sm">
          <CertificateCard certificate={mockCertificates[0]} />
        </div>
      </Section>

      <Section title="Lesson Components">
        <div className="max-w-2xl mb-6">
          <VideoPlayer xpReward={100} />
        </div>
        <div className="max-w-sm mb-6 flex flex-col gap-1">
          {mockCourses[0].lessons.map((l, i) => (
            <LessonRow key={l.id} lesson={l} number={i + 1} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
          <div>
            <h3 className="text-sm font-semibold text-brand-900 mb-3">Notes</h3>
            <NotesPanel />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-900 mb-3">Comments</h3>
            <CommentsPanel />
          </div>
        </div>
      </Section>

      <Section title="Gamification">
        <div className="max-w-xs bg-brand-900 rounded-2xl p-6 mb-6 flex flex-col gap-4">
          <StreakCounter days={7} />
          <XPBar current={240} max={500} level={4} />
        </div>
        <BadgeGrid badges={mockBadges} earnedIds={mockUserProgress.earnedBadgeIds} />
        <div className="flex gap-4 mt-6">
          <Button onClick={() => setShowFloater(true)} variant="outline">Trigger XP Floater</Button>
          <Button onClick={() => setUnlockBadge(mockBadges[0])} variant="outline">Trigger Badge Unlock</Button>
        </div>
        {showFloater && <XPFloater amount={200} onDone={() => setShowFloater(false)} />}
        <BadgeUnlockOverlay badge={unlockBadge} onClose={() => setUnlockBadge(null)} />
      </Section>

      <Section title="Navigation Panels">
        <div className="flex gap-6">
          <CourseEnrollSidebar course={mockCourses[0]} quest={mockQuests[0]} enrolled={false} />
          <CourseEnrollSidebar course={mockCourses[0]} quest={mockQuests[0]} enrolled={true} />
        </div>
      </Section>
    </div>
  )
}
