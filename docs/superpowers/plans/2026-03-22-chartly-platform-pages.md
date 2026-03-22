# Chartly — Platform Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Prerequisite:** Both `2026-03-22-chartly-foundation-components.md` and `2026-03-22-chartly-public-pages.md` must be complete.

**Goal:** Build all gated platform pages — Dashboard, Course Catalog, Course Page, Lesson Page, Profile, and Leaderboard — producing a fully navigable authenticated experience.

**Architecture:** All pages live in the `(platform)` layout group (dark sidebar + topbar). All data comes from mock data. Auth is gated by middleware (cookie check). Framer Motion `AnimatePresence` wraps page transitions.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · All components from Foundation plan

---

### Task 1: Platform Layout — Page Transitions

**Files:**
- Create: `src/components/layout/PageTransition.tsx`
- Modify: `src/app/(platform)/layout.tsx`

- [ ] **Step 1: Create PageTransition wrapper**

```tsx
// src/components/layout/PageTransition.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Wrap platform layout main in PageTransition**

```tsx
// src/app/(platform)/layout.tsx — update <main> line:
<main className="flex-1 p-6">
  <PageTransition>{children}</PageTransition>
</main>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/ src/app/(platform)/layout.tsx
git commit -m "feat: add page transition animation to platform layout"
```

---

### Task 2: Dashboard Page

**Files:**
- Create: `src/app/(platform)/dashboard/page.tsx`

- [ ] **Step 1: Implement dashboard**

```tsx
// src/app/(platform)/dashboard/page.tsx
import Link from 'next/link'
import { Button }       from '@/components/atoms/Button'
import { QuestCard }    from '@/components/cards/QuestCard'
import { CourseRow }    from '@/components/cards/CourseRow'
import { StreakCounter } from '@/components/gamification/StreakCounter'
import { mockCourses, mockQuests, mockUserProgress } from '@/lib/mock-data'

export default function DashboardPage() {
  const progress     = mockUserProgress
  const activeQuest  = mockQuests[0]
  const inProgress   = mockCourses.filter(c =>
    c.lessons.some(l => progress.completedLessonIds.includes(l.id))
  )
  const activeCourse = inProgress[0] ?? mockCourses[0]
  const activeLesson = activeCourse.lessons.find(l => l.status === 'active') ?? activeCourse.lessons[0]

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Continue learning hero */}
      <div className="relative bg-brand-900 rounded-2xl p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">Continue Learning</p>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-1">{activeCourse.title}</h2>
          <p className="text-white/60 text-sm mb-6">{activeLesson.title}</p>
          <Link href={`/courses/${activeCourse.slug}/${activeLesson.slug}`}>
            <Button size="md">Resume Lesson →</Button>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Quests',  value: mockQuests.filter(q => !progress.completedQuestIds.includes(q.id)).length },
          { label: 'Day Streak',    value: progress.streakDays, suffix: '🔥' },
          { label: 'Badges Earned', value: progress.earnedBadgeIds.length },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card text-center">
            <p className="font-display text-3xl font-bold text-brand-900 mb-1">{stat.value}{stat.suffix}</p>
            <p className="text-brand-900/50 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two-column lower */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Active quest */}
        <div>
          <h3 className="font-semibold text-brand-900 text-sm mb-3">Active Quest</h3>
          <QuestCard quest={activeQuest} progress={progress} />
        </div>

        {/* My Courses */}
        <div>
          <h3 className="font-semibold text-brand-900 text-sm mb-3">My Courses</h3>
          <div className="bg-white rounded-2xl p-4 shadow-card flex flex-col divide-y divide-brand-50">
            {mockCourses.slice(0, 5).map(c => (
              <CourseRow key={c.id} course={c} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Visit `/dashboard` (with auth cookie set from login)**

Check: continue learning hero, stats row, quest card, course rows.

- [ ] **Step 3: Commit**

```bash
git add src/app/(platform)/dashboard/ && git commit -m "feat: dashboard page with continue learning, stats, quest, courses"
```

---

### Task 3: Course Catalog Page

**Files:**
- Create: `src/app/(platform)/courses/page.tsx`

- [ ] **Step 1: Implement course catalog**

```tsx
// src/app/(platform)/courses/page.tsx
'use client'
import { useState } from 'react'
import { CourseCard } from '@/components/cards/CourseCard'
import { mockCourses, mockUserProgress } from '@/lib/mock-data'
import type { Category } from '@/types'

type Filter = Category | 'all'
const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Forex', value: 'forex' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Basics', value: 'basics' },
]

export default function CourseCatalogPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const filtered = mockCourses.filter(c => filter === 'all' || c.category === filter)

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
```

- [ ] **Step 2: Verify at `/courses`**

Check: filter tabs work, locked courses show lock overlay, in-progress courses show progress bar.

- [ ] **Step 3: Commit**

```bash
git add src/app/(platform)/courses/page.tsx && git commit -m "feat: course catalog with category filters"
```

---

### Task 4: Course Page

**Files:**
- Create: `src/app/(platform)/courses/[slug]/page.tsx`

- [ ] **Step 1: Implement course page**

```tsx
// src/app/(platform)/courses/[slug]/page.tsx
'use client'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import { Badge }               from '@/components/atoms/Badge'
import { Avatar }              from '@/components/atoms/Avatar'
import { LessonRow }           from '@/components/lesson/LessonRow'
import { CourseEnrollSidebar } from '@/components/navigation/CourseEnrollSidebar'
import { mockCourses, mockQuests, mockUserProgress, categoryGradient, getCourseState } from '@/lib/mock-data'

type Tab = 'overview' | 'curriculum' | 'instructor'

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course   = mockCourses.find(c => c.slug === params.slug)
  if (!course) notFound()

  const [tab, setTab] = useState<Tab>('overview')
  const quest    = mockQuests.find(q => q.courseIds.includes(course.id))
  const state    = getCourseState(course, mockUserProgress)
  const enrolled = state !== 'not-started' && state !== 'locked'

  return (
    <div className="max-w-5xl">
      {/* Hero header */}
      <div className={`rounded-2xl p-8 bg-gradient-to-br ${categoryGradient(course.category)} text-white mb-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="relative z-10">
          <Badge variant="tag" category={course.category} className="mb-3">
            {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
          <p className="text-white/70 text-sm mb-4">by {course.instructor.name} · {course.difficulty} · {course.xpTotal} XP</p>
          {quest && <Badge variant="icon" emoji={quest.badgeEmoji} label={quest.title} className="text-white" />}
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-brand-50 p-1 rounded-xl w-fit">
            {(['overview', 'curriculum', 'instructor'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                  ${tab === t ? 'bg-white text-brand-900 shadow-card' : 'text-brand-900/60 hover:text-brand-900'}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="prose prose-sm max-w-none text-brand-900/80 leading-relaxed">
              <p>{course.overview}</p>
            </div>
          )}

          {tab === 'curriculum' && (
            <div className="flex flex-col gap-0.5">
              {course.lessons.map((lesson, i) => (
                <LessonRow key={lesson.id} lesson={lesson} number={i + 1} />
              ))}
            </div>
          )}

          {tab === 'instructor' && (
            <div className="flex items-start gap-4">
              <Avatar name={course.instructor.name} size="lg" />
              <div>
                <p className="font-semibold text-brand-900 mb-1">{course.instructor.name}</p>
                <p className="text-brand-900/70 text-sm leading-relaxed">{course.instructor.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Enroll sidebar */}
        <CourseEnrollSidebar course={course} quest={quest} enrolled={enrolled} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify at `/courses/forex-fundamentals`**

Check: hero gradient matches category, tabs switch content, lesson rows show status icons, enroll sidebar is sticky, quest badge shows.

- [ ] **Step 3: Commit**

```bash
git add src/app/(platform)/courses/[slug]/ && git commit -m "feat: course page with tabs, lesson list, enroll sidebar"
```

---

### Task 5: Lesson Page

**Files:**
- Create: `src/app/(platform)/courses/[slug]/[lesson]/page.tsx`

- [ ] **Step 1: Implement lesson page**

```tsx
// src/app/(platform)/courses/[slug]/[lesson]/page.tsx
'use client'
import { useState } from 'react'
import { notFound }            from 'next/navigation'
import { VideoPlayer }         from '@/components/lesson/VideoPlayer'
import { NotesPanel }          from '@/components/lesson/NotesPanel'
import { CommentsPanel }       from '@/components/lesson/CommentsPanel'
import { CourseLessonNav }     from '@/components/navigation/CourseLessonNav'
import { XPFloater }           from '@/components/gamification/XPFloater'
import { BadgeUnlockOverlay }  from '@/components/gamification/BadgeUnlockOverlay'
import { Button }              from '@/components/atoms/Button'
import { mockCourses, mockBadges, mockUserProgress } from '@/lib/mock-data'
import type { Badge } from '@/types'
import Link from 'next/link'

type LessonTab = 'overview' | 'notes' | 'comments'

export default function LessonPage({ params }: { params: { slug: string; lesson: string } }) {
  const course = mockCourses.find(c => c.slug === params.slug)
  if (!course) notFound()

  const lessonIdx   = course.lessons.findIndex(l => l.slug === params.lesson)
  const lesson      = course.lessons[lessonIdx]
  if (!lesson) notFound()

  const prevLesson  = course.lessons[lessonIdx - 1]
  const nextLesson  = course.lessons[lessonIdx + 1]

  const [tab, setTab]           = useState<LessonTab>('overview')
  const [showXP, setShowXP]     = useState(false)
  const [badge, setBadge]       = useState<Badge | null>(null)

  function handleComplete() {
    setShowXP(true)
    // Simulate quest completion on last lesson
    if (!nextLesson) setBadge(mockBadges[0])
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6 overflow-hidden">
      {/* Left nav panel */}
      <CourseLessonNav
        course={course}
        progress={mockUserProgress}
        activeLessonSlug={params.lesson}
        onLessonSelect={() => {}}
      />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          {/* Video */}
          <VideoPlayer xpReward={lesson.xpReward} onComplete={handleComplete} />

          {/* Tabs */}
          <div className="flex gap-1 my-6 bg-brand-50 p-1 rounded-xl w-fit">
            {(['overview', 'notes', 'comments'] as LessonTab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                  ${tab === t ? 'bg-white text-brand-900 shadow-card' : 'text-brand-900/60 hover:text-brand-900'}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div>
              <h2 className="font-semibold text-brand-900 mb-2">{lesson.title}</h2>
              <p className="text-brand-900/60 text-sm leading-relaxed">
                {lesson.durationMinutes} minutes · {lesson.xpReward} XP on completion
              </p>
            </div>
          )}
          {tab === 'notes'    && <NotesPanel />}
          {tab === 'comments' && <CommentsPanel />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-100">
            {prevLesson ? (
              <Link href={`/courses/${course.slug}/${prevLesson.slug}`}>
                <Button variant="outline" size="sm">← Previous</Button>
              </Link>
            ) : <div />}

            <Button size="sm" onClick={handleComplete}>
              {nextLesson ? 'Mark Complete & Next →' : 'Mark Complete ✓'}
            </Button>
          </div>
        </div>
      </div>

      {/* Gamification overlays */}
      {showXP && <XPFloater amount={lesson.xpReward} onDone={() => setShowXP(false)} />}
      <BadgeUnlockOverlay badge={badge} onClose={() => setBadge(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Verify at `/courses/forex-fundamentals/what-is-forex`**

Check: CourseLessonNav shows on left, video player renders, tabs switch between overview/notes/comments, Mark Complete triggers XP floater, on last lesson triggers badge overlay. Prev/Next navigation links work.

- [ ] **Step 3: Commit**

```bash
git add src/app/(platform)/courses/[slug]/[lesson]/
git commit -m "feat: lesson page with video player, notes, comments, XP and badge animations"
```

---

### Task 6: Profile Page

**Files:**
- Create: `src/app/(platform)/profile/page.tsx`

- [ ] **Step 1: Implement profile page**

```tsx
// src/app/(platform)/profile/page.tsx
import { Avatar }          from '@/components/atoms/Avatar'
import { XPBar }           from '@/components/gamification/XPBar'
import { BadgeGrid }       from '@/components/gamification/BadgeGrid'
import { CertificateCard } from '@/components/data/CertificateCard'
import { mockUserProgress, mockBadges, mockCertificates, mockQuests } from '@/lib/mock-data'

export default function ProfilePage() {
  const progress = mockUserProgress
  const completedQuests = mockQuests.filter(q => progress.completedQuestIds.includes(q.id))

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-card flex items-center gap-6">
        <Avatar name="Alex Kowalski" size="lg" />
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-brand-900 tracking-tight mb-0.5">Alex Kowalski</h1>
          <p className="text-brand-900/50 text-sm mb-4">Member since March 2026</p>
          <div className="max-w-xs">
            <XPBar
              current={progress.xpTotal % 500}
              max={500}
              level={progress.level}
              className="[--xp-bar-text:theme(colors.brand.900)]"
            />
          </div>
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-brand-900">{progress.xpTotal}</p>
            <p className="text-brand-900/40 text-xs">Total XP</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-brand-900">{progress.streakDays}🔥</p>
            <p className="text-brand-900/40 text-xs">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold text-brand-900 mb-4">Badges</h2>
        <BadgeGrid badges={mockBadges} earnedIds={progress.earnedBadgeIds} />
      </div>

      {/* Quest history */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold text-brand-900 mb-4">Quest History</h2>
        {completedQuests.length === 0 ? (
          <p className="text-brand-900/50 text-sm">No completed quests yet. Keep learning!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {completedQuests.map(q => (
              <div key={q.id} className="flex items-center gap-3 py-2">
                <span className="text-xl">{q.badgeEmoji}</span>
                <div>
                  <p className="font-medium text-brand-900 text-sm">{q.title}</p>
                  <p className="text-brand-900/40 text-xs">+{q.xpBonus} XP bonus</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold text-brand-900 mb-4">Certificates</h2>
        {mockCertificates.length === 0 ? (
          <p className="text-brand-900/50 text-sm">Complete a learning path to earn your first certificate.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {mockCertificates.map(cert => <CertificateCard key={cert.id} certificate={cert} />)}
          </div>
        )}
      </div>
    </div>
  )
}
```

Note: `XPBar` uses CSS variables for text color inside the sidebar (dark bg). On the profile page it's on white — override text colors by wrapping or passing a `className` prop. Simplest fix: add a light variant to XPBar or just hardcode text-brand-900 for the profile variant.

- [ ] **Step 2: Verify at `/profile`**

Check: avatar, name, XP bar with level, badge grid (earned colored, locked greyed), quest history, certificates with view link.

- [ ] **Step 3: Commit**

```bash
git add src/app/(platform)/profile/ && git commit -m "feat: profile page with XP, badges, quest history, certificates"
```

---

### Task 7: Leaderboard Page

**Files:**
- Create: `src/app/(platform)/leaderboard/page.tsx`

- [ ] **Step 1: Implement leaderboard**

```tsx
// src/app/(platform)/leaderboard/page.tsx
'use client'
import { useState } from 'react'
import { Avatar }   from '@/components/atoms/Avatar'
import { mockLeaderboard } from '@/lib/mock-data'

type Period = 'weekly' | 'monthly'

const CURRENT_USER_ID = 'u5'

const RANK_STYLES: Record<number, string> = {
  1: 'bg-yellow-50 border-yellow-200',
  2: 'bg-gray-50 border-gray-200',
  3: 'bg-orange-50 border-orange-200',
}
const RANK_EMOJI: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('weekly')
  const entries  = mockLeaderboard
  const isInTop  = entries.some(e => e.user.id === CURRENT_USER_ID)
  const userEntry = entries.find(e => e.user.id === CURRENT_USER_ID)

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-900 tracking-tight">Leaderboard</h1>
        <div className="flex bg-brand-50 p-1 rounded-xl">
          {(['weekly', 'monthly'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                ${period === p ? 'bg-white text-brand-900 shadow-card' : 'text-brand-900/60 hover:text-brand-900'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map(entry => {
          const isCurrentUser = entry.user.id === CURRENT_USER_ID
          const rankStyle = RANK_STYLES[entry.rank] ?? 'bg-white border-brand-100'
          return (
            <div key={entry.user.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border ${rankStyle} ${isCurrentUser ? 'ring-2 ring-brand-600' : ''}`}>
              <div className="w-8 text-center">
                {RANK_EMOJI[entry.rank] ?? <span className="font-mono text-sm text-brand-900/50">#{entry.rank}</span>}
              </div>
              <Avatar name={entry.user.name} src={entry.user.avatarUrl} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-brand-900 text-sm">
                  {entry.user.name}{isCurrentUser && <span className="ml-2 text-xs text-brand-600 font-medium">(you)</span>}
                </p>
                <p className="text-brand-900/40 text-xs">{entry.completedQuestCount} quests completed</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-900">{entry.xpTotal.toLocaleString()}</p>
                <p className="text-brand-900/40 text-xs">XP</p>
              </div>
            </div>
          )
        })}

        {/* Pinned current user row if not in visible list */}
        {!isInTop && userEntry && (
          <>
            <div className="flex items-center gap-2 text-xs text-brand-900/40 px-4">
              <div className="flex-1 border-t border-dashed border-brand-200" />
              <span>···</span>
              <div className="flex-1 border-t border-dashed border-brand-200" />
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-brand-100 bg-brand-50 ring-2 ring-brand-600">
              <div className="w-8 text-center">
                <span className="font-mono text-sm text-brand-900/50">#{userEntry.rank}</span>
              </div>
              <Avatar name={userEntry.user.name} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-brand-900 text-sm">{userEntry.user.name} <span className="text-xs text-brand-600 font-medium">(you)</span></p>
                <p className="text-brand-900/40 text-xs">{userEntry.completedQuestCount} quests completed</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-900">{userEntry.xpTotal.toLocaleString()}</p>
                <p className="text-brand-900/40 text-xs">XP</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify at `/leaderboard`**

Check: weekly/monthly toggle, rank medals for top 3, current user row highlighted with ring, XP values formatted.

- [ ] **Step 3: Commit**

```bash
git add src/app/(platform)/leaderboard/ && git commit -m "feat: leaderboard with weekly/monthly toggle and pinned user row"
```

---

### Task 8: Final Verification — Full Platform

- [ ] **Step 1: Verify full navigation flow**

1. Visit `http://localhost:3000` — landing page
2. Click "Start Learning Free" → `/signup` → fill form → redirects to `/dashboard`
3. From dashboard: click Resume → lesson page loads
4. In lesson: click "Mark Complete & Next" → XP floater appears
5. Visit `/courses` → filter tabs work, locked courses show lock icon
6. Click a course → course page with tabs, enroll sidebar
7. Visit `/profile` → badges, quest history, certificates
8. Visit `/leaderboard` → ranked list with current user highlighted
9. Log out (clear cookie) → visit `/dashboard` → redirected to `/login`

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Full build**

```bash
npm run build
```
Expected: Build succeeds. Review any warnings.

- [ ] **Step 4: Run all tests**

```bash
npx jest --no-coverage
```
Expected: All PASS.

- [ ] **Step 5: Final commit and tag**

```bash
git add -A && git commit -m "chore: final platform pages complete"
git tag platform-pages-complete
```
