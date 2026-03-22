# Chartly — Foundation & Component Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the Next.js 14 project, establish all shared types/data/helpers, and build every reusable component — culminating in a `/showcase` page where all components render correctly.

**Architecture:** Next.js 14 App Router, TypeScript, Tailwind CSS with custom brand tokens, Framer Motion for animations, shadcn/ui for headless primitives. All data is typed mock data. Tests use Jest + React Testing Library.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui · Jest · React Testing Library · Google Fonts (Syne + Inter via `next/font/google`)

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `jest.config.ts`, `jest.setup.ts`, `.env.local.example`

- [ ] **Step 1: Scaffold project**

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

Expected: Project files created, `npm run dev` works.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-dialog recharts
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npx shadcn@latest init
```

When shadcn prompts: style=default, baseColor=slate, CSS variables=yes.

- [ ] **Step 3: Configure Tailwind with brand tokens**

Replace `tailwind.config.ts` content:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          400: '#a78bfa',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#4f46e5',
          900: '#1e1b4b',
        },
        surface: '#f8f7ff',
        crypto: { DEFAULT: '#ec4899', light: '#f9a8d4' },
        teal:   { DEFAULT: '#0d9488', light: '#99f6e4' },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: { tight: '-0.03em' },
      lineHeight:    { relaxed: '1.7' },
      boxShadow: {
        brand:    '0 4px 16px rgba(124,58,237,0.08), 0 1px 4px rgba(124,58,237,0.04)',
        'brand-lg': '0 8px 32px rgba(124,58,237,0.14), 0 2px 8px rgba(124,58,237,0.06)',
        card:     '0 2px 12px rgba(30,27,75,0.06), 0 1px 3px rgba(30,27,75,0.04)',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Configure Jest**

`jest.config.ts`:
```ts
import type { Config } from 'jest'
const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  transform: { '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }] },
}
export default config
```

`jest.setup.ts`:
```ts
import '@testing-library/jest-dom'
```

`.env.local.example`:
```
EXCHANGE_RATE_API_KEY=your_key_here
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: `ready on http://localhost:3000`

- [ ] **Step 6: Commit**

```bash
git init && git add -A && git commit -m "feat: initialize Next.js 14 project with brand config"
```

---

### Task 2: TypeScript Types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Write types file**

```ts
// src/types/index.ts

export type Category = 'forex' | 'crypto' | 'psychology' | 'basics'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type LessonStatus = 'completed' | 'active' | 'locked'

export interface Instructor {
  name: string
  avatarUrl?: string
  bio: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  durationMinutes: number
  xpReward: number
  status: LessonStatus
}

export interface Course {
  id: string
  slug: string
  title: string
  overview: string
  category: Category
  difficulty: Difficulty
  lessonCount: number
  xpTotal: number
  lessons: Lesson[]
  instructor: Instructor
  prerequisiteQuestId?: string
}

export interface Quest {
  id: string
  title: string
  description: string
  courseIds: string[]
  badgeEmoji: string
  xpBonus: number
}

export interface Badge {
  id: string
  emoji: string
  name: string
  description: string
  questId?: string
}

export interface Certificate {
  id: string
  questId: string
  questTitle: string
  badgeEmoji: string
  recipientName: string
  completedAt: string
}

export interface UserProgress {
  completedLessonIds: string[]
  completedCourseIds: string[]
  completedQuestIds: string[]
  earnedBadgeIds: string[]
  certificateIds: string[]
  xpTotal: number
  level: number
  streakDays: number
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: Category
  author: string
  authorAvatarUrl?: string
  publishedAt: string
  readTimeMinutes: number
  relatedPairs?: string[]
  relatedArticleSlugs?: string[]
}

export interface User {
  id: string
  name: string
  avatarUrl?: string
}

export interface LeaderboardEntry {
  user: User
  xpTotal: number
  completedQuestCount: number
  rank: number
}

export interface Session {
  userId: string
  name: string
  level: number
}

export interface PriceData {
  pair: string
  price: number
  change: number  // percentage
  sparkline: number[]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts && git commit -m "feat: add shared TypeScript types"
```

---

### Task 3: Mock Data

**Files:**
- Create: `src/lib/mock-data.ts`
- Test: `src/lib/__tests__/mock-data.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/lib/__tests__/mock-data.test.ts
import { mockCourses, mockQuests, mockBadges, mockArticles, mockUserProgress, mockLeaderboard, mockCertificates } from '@/lib/mock-data'

describe('mock-data', () => {
  it('courses have required fields and valid categories', () => {
    expect(mockCourses.length).toBeGreaterThanOrEqual(5)
    mockCourses.forEach(c => {
      expect(c.id).toBeTruthy()
      expect(c.slug).toBeTruthy()
      expect(['forex','crypto','psychology','basics']).toContain(c.category)
      expect(c.lessons.length).toBe(c.lessonCount)
      expect(c.xpTotal).toBe(c.lessons.reduce((sum, l) => sum + l.xpReward, 0))
    })
  })

  it('quests reference valid course IDs', () => {
    const courseIds = new Set(mockCourses.map(c => c.id))
    mockQuests.forEach(q => {
      q.courseIds.forEach(id => expect(courseIds.has(id)).toBe(true))
    })
  })

  it('user progress references valid IDs', () => {
    const lessonIds = new Set(mockCourses.flatMap(c => c.lessons.map(l => l.id)))
    mockUserProgress.completedLessonIds.forEach(id => expect(lessonIds.has(id)).toBe(true))
  })

  it('leaderboard is sorted by rank', () => {
    for (let i = 1; i < mockLeaderboard.length; i++) {
      expect(mockLeaderboard[i].rank).toBe(mockLeaderboard[i-1].rank + 1)
    }
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx jest mock-data --no-coverage
```
Expected: FAIL — module not found.

- [ ] **Step 3: Write mock data**

```ts
// src/lib/mock-data.ts
import type { Course, Quest, Badge, Article, UserProgress, LeaderboardEntry, Certificate } from '@/types'

export const mockCourses: Course[] = [
  {
    id: 'c1', slug: 'forex-fundamentals', title: 'Forex Fundamentals',
    overview: 'Master the foundations of foreign exchange trading. Learn how currency pairs work, what drives price movements, and how to read a forex chart with confidence.',
    category: 'forex', difficulty: 'beginner', lessonCount: 5, xpTotal: 500,
    instructor: { name: 'Maria Kovač', bio: 'Forex trader with 12 years of prop-desk experience at two major European banks.' },
    lessons: [
      { id: 'l1-1', slug: 'what-is-forex', title: 'What is Forex?', durationMinutes: 8, xpReward: 100, status: 'completed' },
      { id: 'l1-2', slug: 'currency-pairs', title: 'Currency Pairs Explained', durationMinutes: 10, xpReward: 100, status: 'completed' },
      { id: 'l1-3', slug: 'reading-quotes', title: 'Reading Quotes & Spreads', durationMinutes: 12, xpReward: 100, status: 'active' },
      { id: 'l1-4', slug: 'pips-and-lots', title: 'Pips, Lots & Leverage', durationMinutes: 14, xpReward: 100, status: 'locked' },
      { id: 'l1-5', slug: 'forex-sessions', title: 'Trading Sessions', durationMinutes: 10, xpReward: 100, status: 'locked' },
    ],
  },
  {
    id: 'c2', slug: 'technical-analysis-101', title: 'Technical Analysis 101',
    overview: 'Understand how to read price action, identify chart patterns, and use indicators like RSI, MACD, and moving averages to time entries and exits.',
    category: 'forex', difficulty: 'intermediate', lessonCount: 6, xpTotal: 720,
    instructor: { name: 'James Okafor', bio: 'Certified technical analyst and educator who has trained over 5,000 retail traders.' },
    prerequisiteQuestId: 'q1',
    lessons: [
      { id: 'l2-1', slug: 'candlestick-basics', title: 'Candlestick Basics', durationMinutes: 9, xpReward: 120, status: 'locked' },
      { id: 'l2-2', slug: 'support-resistance', title: 'Support & Resistance', durationMinutes: 11, xpReward: 120, status: 'locked' },
      { id: 'l2-3', slug: 'trend-lines', title: 'Drawing Trend Lines', durationMinutes: 10, xpReward: 120, status: 'locked' },
      { id: 'l2-4', slug: 'rsi-macd', title: 'RSI & MACD', durationMinutes: 14, xpReward: 120, status: 'locked' },
      { id: 'l2-5', slug: 'chart-patterns', title: 'Chart Patterns', durationMinutes: 16, xpReward: 120, status: 'locked' },
      { id: 'l2-6', slug: 'backtesting', title: 'Backtesting Your Strategy', durationMinutes: 13, xpReward: 120, status: 'locked' },
    ],
  },
  {
    id: 'c3', slug: 'crypto-trading-intro', title: 'Crypto Trading Intro',
    overview: 'Navigate the world of digital assets. Learn how blockchain, wallets, exchanges, and on-chain metrics shape crypto price action.',
    category: 'crypto', difficulty: 'beginner', lessonCount: 5, xpTotal: 500,
    instructor: { name: 'Yuki Tanaka', bio: 'DeFi researcher and educator who entered crypto in 2017.' },
    lessons: [
      { id: 'l3-1', slug: 'what-is-blockchain', title: 'What is Blockchain?', durationMinutes: 10, xpReward: 100, status: 'locked' },
      { id: 'l3-2', slug: 'crypto-exchanges', title: 'CEX vs DEX', durationMinutes: 12, xpReward: 100, status: 'locked' },
      { id: 'l3-3', slug: 'wallets', title: 'Wallets & Custody', durationMinutes: 9, xpReward: 100, status: 'locked' },
      { id: 'l3-4', slug: 'btc-eth', title: 'BTC & ETH Deep Dive', durationMinutes: 15, xpReward: 100, status: 'locked' },
      { id: 'l3-5', slug: 'on-chain-metrics', title: 'On-Chain Metrics', durationMinutes: 11, xpReward: 100, status: 'locked' },
    ],
  },
  {
    id: 'c4', slug: 'trading-psychology', title: 'Trading Psychology',
    overview: 'The market is 20% strategy and 80% mindset. Learn to manage fear, greed, revenge trading, and how to build a consistent mental framework.',
    category: 'psychology', difficulty: 'beginner', lessonCount: 4, xpTotal: 400,
    instructor: { name: 'Sara Blum', bio: 'Sports psychologist turned trading coach, working with hedge fund traders for 8 years.' },
    lessons: [
      { id: 'l4-1', slug: 'fear-and-greed', title: 'Fear & Greed', durationMinutes: 10, xpReward: 100, status: 'locked' },
      { id: 'l4-2', slug: 'revenge-trading', title: 'Avoiding Revenge Trades', durationMinutes: 12, xpReward: 100, status: 'locked' },
      { id: 'l4-3', slug: 'journaling', title: 'Trade Journaling', durationMinutes: 9, xpReward: 100, status: 'locked' },
      { id: 'l4-4', slug: 'mindset-routine', title: 'Daily Mindset Routine', durationMinutes: 11, xpReward: 100, status: 'locked' },
    ],
  },
  {
    id: 'c5', slug: 'risk-management', title: 'Risk Management Essentials',
    overview: 'Protect your capital. Understand position sizing, stop-loss placement, risk/reward ratios, and how to stay in the game long-term.',
    category: 'basics', difficulty: 'beginner', lessonCount: 4, xpTotal: 400,
    instructor: { name: 'David Chen', bio: 'Quantitative risk manager with 15 years on institutional trading desks.' },
    lessons: [
      { id: 'l5-1', slug: 'position-sizing', title: 'Position Sizing', durationMinutes: 11, xpReward: 100, status: 'locked' },
      { id: 'l5-2', slug: 'stop-loss', title: 'Stop-Loss Strategies', durationMinutes: 10, xpReward: 100, status: 'locked' },
      { id: 'l5-3', slug: 'rr-ratio', title: 'Risk/Reward Ratios', durationMinutes: 12, xpReward: 100, status: 'locked' },
      { id: 'l5-4', slug: 'drawdown', title: 'Managing Drawdowns', durationMinutes: 9, xpReward: 100, status: 'locked' },
    ],
  },
  {
    id: 'c6', slug: 'advanced-forex-strategies', title: 'Advanced Forex Strategies',
    overview: 'Go beyond the basics with institutional order flow, smart money concepts, liquidity grabs, and multi-timeframe confluence trading.',
    category: 'forex', difficulty: 'advanced', lessonCount: 6, xpTotal: 900,
    instructor: { name: 'James Okafor', bio: 'Certified technical analyst and educator who has trained over 5,000 retail traders.' },
    prerequisiteQuestId: 'q2',
    lessons: [
      { id: 'l6-1', slug: 'order-flow', title: 'Order Flow Analysis', durationMinutes: 16, xpReward: 150, status: 'locked' },
      { id: 'l6-2', slug: 'smart-money', title: 'Smart Money Concepts', durationMinutes: 18, xpReward: 150, status: 'locked' },
      { id: 'l6-3', slug: 'liquidity-grabs', title: 'Liquidity Grabs', durationMinutes: 14, xpReward: 150, status: 'locked' },
      { id: 'l6-4', slug: 'mtf-confluence', title: 'Multi-Timeframe Confluence', durationMinutes: 20, xpReward: 150, status: 'locked' },
      { id: 'l6-5', slug: 'news-trading', title: 'Trading the News', durationMinutes: 12, xpReward: 150, status: 'locked' },
      { id: 'l6-6', slug: 'prop-firm-prep', title: 'Prop Firm Challenge Prep', durationMinutes: 15, xpReward: 150, status: 'locked' },
    ],
  },
]

export const mockQuests: Quest[] = [
  {
    id: 'q1', title: 'Forex Fundamentals Path',
    description: 'Complete the core Forex course to unlock advanced technical analysis.',
    courseIds: ['c1'], badgeEmoji: '📈', xpBonus: 200,
  },
  {
    id: 'q2', title: 'Technical Trader Path',
    description: 'Master technical analysis alongside risk management and psychology.',
    courseIds: ['c2', 'c5', 'c4'], badgeEmoji: '🎯', xpBonus: 500,
  },
  {
    id: 'q3', title: 'Crypto Explorer Path',
    description: 'Enter the world of digital assets and on-chain analysis.',
    courseIds: ['c3'], badgeEmoji: '₿', xpBonus: 200,
  },
]

export const mockBadges: Badge[] = [
  { id: 'b1', emoji: '📈', name: 'Forex Pioneer', description: 'Completed the Forex Fundamentals Path', questId: 'q1' },
  { id: 'b2', emoji: '🎯', name: 'Technical Trader', description: 'Completed the Technical Trader Path', questId: 'q2' },
  { id: 'b3', emoji: '₿', name: 'Crypto Explorer', description: 'Completed the Crypto Explorer Path', questId: 'q3' },
  { id: 'b4', emoji: '🔥', name: '7-Day Streak', description: 'Logged in and learned for 7 days in a row' },
  { id: 'b5', emoji: '⚡', name: 'First Lesson', description: 'Completed your very first lesson' },
]

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1', questId: 'q1', questTitle: 'Forex Fundamentals Path',
    badgeEmoji: '📈', recipientName: 'Alex Kowalski', completedAt: '2026-02-15T10:00:00Z',
  },
]

export const mockUserProgress: UserProgress = {
  completedLessonIds: ['l1-1', 'l1-2'],
  completedCourseIds: [],
  completedQuestIds: [],
  earnedBadgeIds: ['b5'],
  certificateIds: [],
  xpTotal: 1240,
  level: 4,
  streakDays: 7,
}

export const mockArticles: Article[] = [
  {
    id: 'a1', slug: 'eur-usd-weekly-outlook',
    title: 'EUR/USD Weekly Outlook: Fed Decision in Focus',
    excerpt: 'The euro faces a critical week as markets await the Federal Reserve interest rate decision. Here is what traders are watching.',
    body: '<p>The EUR/USD pair has been consolidating near the 1.0850 level ahead of this week\'s Federal Reserve meeting. Analysts expect the Fed to hold rates steady, but any hawkish language in the statement could send the dollar higher...</p><p>Key levels to watch: support at 1.0780, resistance at 1.0920. A break above resistance would open the door to 1.1000.</p>',
    category: 'forex', author: 'Maria Kovač',
    publishedAt: '2026-03-20T08:00:00Z', readTimeMinutes: 5,
    relatedPairs: ['EUR/USD', 'GBP/USD'], relatedArticleSlugs: ['a2', 'a3'],
  },
  {
    id: 'a2', slug: 'bitcoin-halving-impact',
    title: 'What the Bitcoin Halving Means for Crypto Markets',
    excerpt: 'Every four years, the Bitcoin reward is cut in half. History suggests this is one of the most powerful catalysts in crypto — but past performance never guarantees future results.',
    body: '<p>The Bitcoin halving reduces the block reward miners receive, cutting new supply in half overnight. Historically, price appreciation has followed within 12–18 months of each halving event...</p>',
    category: 'crypto', author: 'Yuki Tanaka',
    publishedAt: '2026-03-18T09:00:00Z', readTimeMinutes: 7,
    relatedPairs: ['BTC/USD', 'ETH/USD'], relatedArticleSlugs: ['a1'],
  },
  {
    id: 'a3', slug: 'gbp-usd-technical-setup',
    title: 'GBP/USD: Triangle Breakout Sets Up 200-Pip Move',
    excerpt: 'The pound has been coiling inside a symmetrical triangle for three weeks. A breakout is imminent — here is how to trade it.',
    body: '<p>GBP/USD has formed a textbook symmetrical triangle on the 4-hour chart. Volume has been contracting, and price is now within 50 pips of the apex. A decisive close above 1.2750 would confirm a breakout...</p>',
    category: 'forex', author: 'James Okafor',
    publishedAt: '2026-03-17T11:00:00Z', readTimeMinutes: 4,
    relatedPairs: ['GBP/USD', 'EUR/USD'], relatedArticleSlugs: ['a1', 'a2'],
  },
  {
    id: 'a4', slug: 'trading-journal-benefits',
    title: 'Why Every Trader Needs a Journal (And How to Build One)',
    excerpt: 'The traders who improve fastest all share one habit: they write down every trade. Here is a simple system that works.',
    body: '<p>A trading journal is the single most underrated tool in a retail trader\'s arsenal. By recording your entry, exit, reasoning, and emotional state for every trade, you create a feedback loop that accelerates learning...</p>',
    category: 'psychology', author: 'Sara Blum',
    publishedAt: '2026-03-15T08:30:00Z', readTimeMinutes: 6,
    relatedArticleSlugs: ['a1', 'a3'],
  },
  {
    id: 'a5', slug: 'position-sizing-guide',
    title: 'The 2% Rule: Position Sizing That Protects Your Capital',
    excerpt: 'Risking too much per trade is the number one reason retail traders blow their accounts. Here is the math behind staying solvent.',
    body: '<p>The 2% rule states that you should never risk more than 2% of your total account balance on a single trade. If you have a $10,000 account, your maximum loss per trade is $200...</p>',
    category: 'basics', author: 'David Chen',
    publishedAt: '2026-03-12T10:00:00Z', readTimeMinutes: 5,
    relatedArticleSlugs: ['a4'],
  },
]

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user: { id: 'u1', name: 'Sophie M.' }, xpTotal: 8400, completedQuestCount: 5 },
  { rank: 2, user: { id: 'u2', name: 'Luca B.' }, xpTotal: 7200, completedQuestCount: 4 },
  { rank: 3, user: { id: 'u3', name: 'Anna K.' }, xpTotal: 6800, completedQuestCount: 4 },
  { rank: 4, user: { id: 'u4', name: 'Tom W.' }, xpTotal: 5500, completedQuestCount: 3 },
  { rank: 5, user: { id: 'u5', name: 'Alex Kowalski', avatarUrl: undefined }, xpTotal: 1240, completedQuestCount: 0 },
]

// Derived helper: get category gradient CSS classes
export function categoryGradient(category: string): string {
  switch (category) {
    case 'forex':      return 'from-brand-600 to-brand-800'
    case 'crypto':     return 'from-crypto to-pink-700'
    case 'psychology': return 'from-teal to-teal-700'
    case 'basics':     return 'from-teal to-teal-700'
    default:           return 'from-brand-600 to-brand-800'
  }
}

// Derived helper: get course progress state
export function getCourseState(course: Course, progress: UserProgress): 'locked' | 'not-started' | 'in-progress' | 'completed' {
  if (course.prerequisiteQuestId && !progress.completedQuestIds.includes(course.prerequisiteQuestId)) return 'locked'
  if (progress.completedCourseIds.includes(course.id)) return 'completed'
  const completedInCourse = course.lessons.filter(l => progress.completedLessonIds.includes(l.id))
  if (completedInCourse.length > 0) return 'in-progress'
  return 'not-started'
}

export function getCourseProgress(course: Course, progress: UserProgress): number {
  const done = course.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length
  return Math.round((done / course.lessonCount) * 100)
}

export function getQuestProgress(quest: Quest, progress: UserProgress): { completed: number; total: number } {
  const completed = quest.courseIds.filter(id => progress.completedCourseIds.includes(id)).length
  return { completed, total: quest.courseIds.length }
}
```

- [ ] **Step 4: Run tests**

```bash
npx jest mock-data --no-coverage
```
Expected: PASS — all assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/mock-data.ts src/lib/__tests__/mock-data.test.ts
git commit -m "feat: add typed mock data with helper functions"
```

---

### Task 4: Auth Helpers

**Files:**
- Create: `src/lib/auth.ts`
- Test: `src/lib/__tests__/auth.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/lib/__tests__/auth.test.ts
import { renderHook, act } from '@testing-library/react'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

import { useSession, setSession, clearSession } from '@/lib/auth'

describe('auth helpers', () => {
  beforeEach(() => localStorageMock.clear())

  it('returns null when no session stored', () => {
    const { result } = renderHook(() => useSession())
    expect(result.current).toBeNull()
  })

  it('returns session after setSession called', () => {
    act(() => setSession({ userId: 'u5', name: 'Alex', level: 4 }))
    const { result } = renderHook(() => useSession())
    expect(result.current?.userId).toBe('u5')
    expect(result.current?.name).toBe('Alex')
  })

  it('returns null after clearSession', () => {
    act(() => setSession({ userId: 'u5', name: 'Alex', level: 4 }))
    act(() => clearSession())
    const { result } = renderHook(() => useSession())
    expect(result.current).toBeNull()
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx jest auth --no-coverage
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement auth helpers**

```ts
// src/lib/auth.ts
'use client'
import { useState, useEffect } from 'react'
import type { Session } from '@/types'

const SESSION_KEY = 'chartly_session'

export function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function useSession(): Session | null {
  const [session, setSession_] = useState<Session | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      setSession_(raw ? JSON.parse(raw) : null)
    } catch {
      setSession_(null)
    }
  }, [])

  return session
}

// For use in middleware (server-side) — reads from cookie instead
// In this template, middleware checks for 'chartly_auth' cookie set at login
export const MOCK_SESSION: Session = { userId: 'u5', name: 'Alex Kowalski', level: 4 }
```

- [ ] **Step 4: Run tests**

```bash
npx jest auth --no-coverage
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth.ts src/lib/__tests__/auth.test.ts
git commit -m "feat: add useSession hook and auth helpers"
```

---

### Task 5: API Route — /api/prices

**Files:**
- Create: `src/app/api/prices/route.ts`
- Test: `src/app/api/prices/__tests__/route.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/app/api/prices/__tests__/route.test.ts
import { GET } from '@/app/api/prices/route'

// Mock fetch
global.fetch = jest.fn()

describe('GET /api/prices', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns price data for all pairs', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        rates: { EUR: 0.92, GBP: 0.79, JPY: 149.5, CHF: 0.88, XAU: 0.00052 },
      }),
    })
    const res = await GET()
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    data.forEach((d: { pair: string; price: number; change: number }) => {
      expect(d.pair).toBeTruthy()
      expect(typeof d.price).toBe('number')
      expect(typeof d.change).toBe('number')
    })
  })

  it('returns fallback data when fetch fails', async () => {
    ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))
    const res = await GET()
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx jest route --no-coverage
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the route**

```ts
// src/app/api/prices/route.ts
import { NextResponse } from 'next/server'
import type { PriceData } from '@/types'

// 30-second server-side cache
let cache: { data: PriceData[]; ts: number } | null = null
const CACHE_TTL = 30_000

const FALLBACK: PriceData[] = [
  { pair: 'EUR/USD', price: 1.0850, change: 0.12, sparkline: [1.082,1.083,1.085,1.084,1.086,1.085] },
  { pair: 'GBP/USD', price: 1.2710, change: -0.08, sparkline: [1.274,1.273,1.271,1.272,1.271,1.271] },
  { pair: 'USD/JPY', price: 149.50, change: 0.31, sparkline: [149.1,149.2,149.4,149.3,149.5,149.5] },
  { pair: 'USD/CHF', price: 0.8820, change: -0.05, sparkline: [0.883,0.882,0.882,0.883,0.882,0.882] },
  { pair: 'XAU/USD', price: 2310.40, change: 0.55, sparkline: [2295,2300,2305,2308,2310,2310] },
  { pair: 'BTC/USD', price: 67420.00, change: 1.24, sparkline: [66000,66500,67000,67200,67400,67420] },
  { pair: 'ETH/USD', price: 3480.00, change: 0.89, sparkline: [3400,3420,3450,3460,3475,3480] },
]

export async function GET(): Promise<NextResponse> {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY
    const baseUrl = apiKey
      ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
      : null

    // Try ExchangeRate-API for forex pairs
    let forexRates: Record<string, number> = {}
    if (baseUrl) {
      const res = await fetch(baseUrl, { next: { revalidate: 30 } })
      if (res.ok) {
        const json = await res.json()
        forexRates = json.rates ?? {}
      }
    }

    // Try CoinGecko for crypto (no key needed for basic)
    let btcPrice = 0, ethPrice = 0
    try {
      const cgRes = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
        { next: { revalidate: 30 } }
      )
      if (cgRes.ok) {
        const cg = await cgRes.json()
        btcPrice = cg.bitcoin?.usd ?? 0
        ethPrice = cg.ethereum?.usd ?? 0
      }
    } catch { /* fallback below */ }

    const makeSparkline = (price: number) =>
      Array.from({ length: 6 }, (_, i) => price * (1 + (Math.random() - 0.5) * 0.003))

    const data: PriceData[] = [
      { pair: 'EUR/USD', price: forexRates.EUR ? 1 / forexRates.EUR : FALLBACK[0].price, change: (Math.random() - 0.5) * 0.4, sparkline: [] },
      { pair: 'GBP/USD', price: forexRates.GBP ? 1 / forexRates.GBP : FALLBACK[1].price, change: (Math.random() - 0.5) * 0.4, sparkline: [] },
      { pair: 'USD/JPY', price: forexRates.JPY ?? FALLBACK[2].price, change: (Math.random() - 0.5) * 0.6, sparkline: [] },
      { pair: 'USD/CHF', price: forexRates.CHF ?? FALLBACK[3].price, change: (Math.random() - 0.5) * 0.3, sparkline: [] },
      { pair: 'XAU/USD', price: forexRates.XAU ? 1 / forexRates.XAU : FALLBACK[4].price, change: (Math.random() - 0.5) * 1, sparkline: [] },
      { pair: 'BTC/USD', price: btcPrice || FALLBACK[5].price, change: (Math.random() - 0.5) * 2, sparkline: [] },
      { pair: 'ETH/USD', price: ethPrice || FALLBACK[6].price, change: (Math.random() - 0.5) * 2, sparkline: [] },
    ].map(d => ({ ...d, sparkline: makeSparkline(d.price), change: parseFloat(d.change.toFixed(2)) }))

    cache = { data, ts: Date.now() }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(FALLBACK)
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npx jest route --no-coverage
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/prices/ && git commit -m "feat: add /api/prices proxy route with 30s cache"
```

---

### Task 6: Middleware

**Files:**
- Create: `src/middleware.ts`
- Test: `src/middleware.test.ts` (skipped — middleware testing requires Next.js test environment; verified manually)

- [ ] **Step 1: Implement middleware**

```ts
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED = ['/dashboard', '/courses', '/profile', '/leaderboard']
const AUTH_PAGES = ['/login', '/signup']
const AUTH_COOKIE = 'chartly_auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has(AUTH_COOKIE)

  const isProtected = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))
  const isAuthPage = AUTH_PAGES.some(p => pathname === p)

  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

- [ ] **Step 2: Manual verification note**

In dev, test by visiting `/dashboard` without a cookie → should redirect to `/login?redirect=/dashboard`. This will be verified when pages are built.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts && git commit -m "feat: add auth middleware protecting gated routes"
```

---

### Task 7: App Root Layout & Fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Set up root layout with Google Fonts**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Chartly — Learn to Trade',
  description: 'Structured trading courses with live market data and gamified learning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-body bg-surface text-brand-900 antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update globals.css** — add grain texture SVG filter and digit-flip keyframe:

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root { --grain-opacity: 0.035; }
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes digit-flip {
  0%   { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0);    opacity: 1; }
}

@keyframes float-up {
  0%   { transform: translateY(0);    opacity: 1; }
  100% { transform: translateY(-48px); opacity: 0; }
}

.animate-marquee { animation: marquee 30s linear infinite; }
.animate-digit-flip { animation: digit-flip 0.25s ease-out; }
.animate-float-up { animation: float-up 1.2s ease-out forwards; }

@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-digit-flip,
  .animate-float-up { animation: none; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css && git commit -m "feat: add root layout with Syne+Inter fonts and CSS keyframes"
```

---

### Task 8: Atom — Button

**Files:**
- Create: `src/components/atoms/Button.tsx`
- Test: `src/components/atoms/__tests__/Button.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/atoms/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/atoms/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Go</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop passed', async () => {
    const onClick = jest.fn()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx jest Button --no-coverage
```

- [ ] **Step 3: Implement Button**

```tsx
// src/components/atoms/Button.tsx
import { forwardRef } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-[transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand hover:shadow-brand-lg',
  outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50',
  ghost:   'text-brand-600 hover:bg-brand-50',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
)
Button.displayName = 'Button'
```

- [ ] **Step 4: Run tests**

```bash
npx jest Button --no-coverage
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/atoms/ && git commit -m "feat: add Button atom with variants and states"
```

---

### Task 9: Atoms — Badge, Input, Avatar

**Files:**
- Create: `src/components/atoms/Badge.tsx`, `Input.tsx`, `Avatar.tsx`
- Test: `src/components/atoms/__tests__/atoms.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/atoms/__tests__/atoms.test.tsx
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/atoms/Badge'
import { Input } from '@/components/atoms/Input'
import { Avatar } from '@/components/atoms/Avatar'

describe('Badge', () => {
  it('renders tag variant with label', () => {
    render(<Badge variant="tag" category="forex">Forex</Badge>)
    expect(screen.getByText('Forex')).toBeInTheDocument()
  })
  it('renders icon variant with emoji', () => {
    render(<Badge variant="icon" emoji="📈" label="Pioneer" />)
    expect(screen.getByText('📈')).toBeInTheDocument()
    expect(screen.getByText('Pioneer')).toBeInTheDocument()
  })
})

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
  it('shows error state', () => {
    render(<Input label="Email" id="email" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})

describe('Avatar', () => {
  it('renders fallback initials when no src', () => {
    render(<Avatar name="Alex Kowalski" />)
    expect(screen.getByText('AK')).toBeInTheDocument()
  })
  it('renders image when src provided', () => {
    render(<Avatar name="Alex" src="/avatar.png" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/avatar.png')
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx jest atoms --no-coverage
```

- [ ] **Step 3: Implement Badge**

```tsx
// src/components/atoms/Badge.tsx
import type { Category } from '@/types'

type TagProps  = { variant: 'tag'; category?: Category; children: React.ReactNode; className?: string }
type IconProps = { variant: 'icon'; emoji: string; label?: string; locked?: boolean; className?: string }
type BadgeProps = TagProps | IconProps

const categoryColors: Record<Category, string> = {
  forex:      'bg-brand-100 text-brand-700',
  crypto:     'bg-pink-100 text-pink-700',
  psychology: 'bg-teal-100 text-teal-700',
  basics:     'bg-teal-100 text-teal-700',
}

export function Badge(props: BadgeProps) {
  if (props.variant === 'tag') {
    const color = props.category ? categoryColors[props.category] : 'bg-brand-100 text-brand-700'
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color} ${props.className ?? ''}`}>
        {props.children}
      </span>
    )
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${props.className ?? ''}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-card ${props.locked ? 'grayscale opacity-40' : 'bg-white'}`}>
        {props.emoji}
      </div>
      {props.label && (
        <span className={`text-xs font-medium text-center ${props.locked ? 'text-brand-900/40' : 'text-brand-900'}`}>
          {props.label}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Implement Input**

```tsx
// src/components/atoms/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
}

export function Input({ label, id, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-brand-900">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-brand-900 placeholder-brand-900/40 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-[box-shadow] ${error ? 'border-red-400 bg-red-50' : 'border-brand-200 bg-white'} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 5: Implement Avatar**

```tsx
// src/components/atoms/Avatar.tsx
interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' }

function initials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const sz = sizes[size]
  if (src) {
    return <img src={src} alt={name} className={`${sz} rounded-full object-cover ring-2 ring-white ${className}`} />
  }
  return (
    <div className={`${sz} rounded-full bg-brand-600 text-white font-semibold flex items-center justify-center ring-2 ring-white ${className}`}>
      {initials(name)}
    </div>
  )
}
```

- [ ] **Step 6: Run tests**

```bash
npx jest atoms --no-coverage
```
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/atoms/ && git commit -m "feat: add Badge, Input, Avatar atoms"
```

---

### Task 10: Navigation — Navbar & TickerStrip

**Files:**
- Create: `src/components/navigation/Navbar.tsx`, `src/components/navigation/TickerStrip.tsx`, `src/components/navigation/Footer.tsx`

- [ ] **Step 1: Implement TickerStrip**

Polls `/api/prices` every 30 seconds. Infinite CSS marquee.

```tsx
// src/components/navigation/TickerStrip.tsx
'use client'
import { useEffect, useState } from 'react'
import type { PriceData } from '@/types'

function TickerItem({ item }: { item: PriceData }) {
  const positive = item.change >= 0
  return (
    <span className="inline-flex items-center gap-2 px-6 text-xs font-mono whitespace-nowrap">
      <span className="text-white/60 font-medium">{item.pair}</span>
      <span className="text-white font-semibold">{item.price.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
      <span className={positive ? 'text-emerald-400' : 'text-red-400'}>
        {positive ? '+' : ''}{item.change.toFixed(2)}%
      </span>
    </span>
  )
}

export function TickerStrip() {
  const [prices, setPrices] = useState<PriceData[]>([])

  async function fetchPrices() {
    try {
      const res = await fetch('/api/prices')
      if (res.ok) setPrices(await res.json())
    } catch { /* keep previous */ }
  }

  useEffect(() => {
    fetchPrices()
    const id = setInterval(fetchPrices, 30_000)
    return () => clearInterval(id)
  }, [])

  if (!prices.length) return <div className="h-8 bg-brand-900" />

  const doubled = [...prices, ...prices]

  return (
    <div className="h-8 bg-brand-900 overflow-hidden flex items-center" onMouseEnter={e => (e.currentTarget.firstElementChild as HTMLElement).style.animationPlayState = 'paused'} onMouseLeave={e => (e.currentTarget.firstElementChild as HTMLElement).style.animationPlayState = 'running'}>
      <div className="flex animate-marquee">
        {doubled.map((item, i) => <TickerItem key={i} item={item} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement Navbar**

```tsx
// src/components/navigation/Navbar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/atoms/Button'

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/#pricing', label: 'Pricing' },
]

export function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl text-brand-900 tracking-tight">
          Chartly
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium transition-[opacity] hover:text-brand-600 ${pathname.startsWith(link.href.split('#')[0]) ? 'text-brand-600' : 'text-brand-900/70'}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-brand-900/70 hover:text-brand-600 transition-[opacity]">
            Login
          </Link>
          <Link href="/signup">
            <Button size="sm">Start Free</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
```

The custom `Button` atom does not implement `asChild`. Always wrap it in a `<Link>` element rather than passing `asChild` or nesting a `<Link>` inside `<Button>`.

- [ ] **Step 3: Implement Footer**

```tsx
// src/components/navigation/Footer.tsx
import Link from 'next/link'

const links = [
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Login', href: '/login' },
]

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display font-bold text-white text-lg">Chartly</span>
          <nav className="flex gap-6 text-sm">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-[opacity]">{l.label}</Link>
            ))}
          </nav>
          <p className="text-xs">© 2026 Chartly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/navigation/Navbar.tsx src/components/navigation/TickerStrip.tsx src/components/navigation/Footer.tsx
git commit -m "feat: add Navbar, TickerStrip, Footer navigation components"
```

---

### Task 11: Public Layout Group

**Files:**
- Create: `src/app/(public)/layout.tsx`

- [ ] **Step 1: Create public layout**

```tsx
// src/app/(public)/layout.tsx
import { TickerStrip } from '@/components/navigation/TickerStrip'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TickerStrip />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Create certificate layout (no ticker strip)**

```tsx
// src/app/(public)/certificates/[id]/layout.tsx
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/ && git commit -m "feat: add public layout group with ticker strip"
```

---

### Task 12: Platform Layout — Sidebar & TopBar

**Files:**
- Create: `src/components/navigation/Sidebar.tsx`, `src/components/navigation/TopBar.tsx`
- Create: `src/app/(platform)/layout.tsx`

- [ ] **Step 1: Implement Sidebar**

```tsx
// src/components/navigation/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar } from '@/components/atoms/Avatar'
import { XPBar } from '@/components/gamification/XPBar'
import { StreakCounter } from '@/components/gamification/StreakCounter'
import { mockUserProgress } from '@/lib/mock-data'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/courses',   label: 'Courses',   icon: '📚' },
  { href: '/profile',   label: 'Profile',   icon: '👤' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
]

export function Sidebar() {
  const pathname = usePathname()
  const progress = mockUserProgress

  return (
    <aside className="w-64 min-h-screen bg-brand-900 flex flex-col fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/dashboard" className="font-display font-bold text-white text-xl tracking-tight">Chartly</Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navLinks.map(link => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link key={link.href} href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-[background,opacity] ${active ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: XP bar + streak + user */}
      <div className="px-4 py-4 border-t border-white/10 flex flex-col gap-3">
        <StreakCounter days={progress.streakDays} />
        <XPBar current={progress.xpTotal % 500} max={500} level={progress.level} />
        <div className="flex items-center gap-3 mt-1">
          <Avatar name="Alex Kowalski" size="sm" />
          <div>
            <p className="text-white text-xs font-semibold">Alex Kowalski</p>
            <p className="text-white/50 text-xs">Level {progress.level}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Implement TopBar**

```tsx
// src/components/navigation/TopBar.tsx
'use client'
import { Avatar } from '@/components/atoms/Avatar'
import { Input } from '@/components/atoms/Input'

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-brand-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="w-64 max-w-sm">
        <Input label="" id="search" placeholder="Search courses..." className="py-2" />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-brand-900/60 hover:text-brand-900 transition-[opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg p-1"
          aria-label="Notifications">
          🔔
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-brand-600 rounded-full" />
        </button>
        <Avatar name="Alex Kowalski" size="sm" />
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create platform layout**

```tsx
// src/app/(platform)/layout.tsx
import { Sidebar } from '@/components/navigation/Sidebar'
import { TopBar } from '@/components/navigation/TopBar'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/navigation/Sidebar.tsx src/components/navigation/TopBar.tsx src/app/(platform)/
git commit -m "feat: add platform layout with Sidebar and TopBar"
```

---

### Task 13: Data — MiniChart & StockWidget

**Files:**
- Create: `src/components/data/MiniChart.tsx`, `src/components/data/StockWidget.tsx`

- [ ] **Step 1: Implement MiniChart**

```tsx
// src/components/data/MiniChart.tsx
interface MiniChartProps {
  data: number[]
  positive?: boolean
  width?: number
  height?: number
}

export function MiniChart({ data, positive = true, width = 80, height = 32 }: MiniChartProps) {
  if (!data.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={pts}
        stroke={positive ? '#10b981' : '#f43f5e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
```

- [ ] **Step 2: Implement StockWidget**

```tsx
// src/components/data/StockWidget.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import type { PriceData } from '@/types'
import { MiniChart } from './MiniChart'

interface StockWidgetProps {
  pair: string
  showSparkline?: boolean
  compact?: boolean
}

export function StockWidget({ pair, showSparkline = true, compact = false }: StockWidgetProps) {
  const [data, setData] = useState<PriceData | null>(null)
  const prevPriceRef = useRef<number | null>(null)
  const [flipKey, setFlipKey] = useState(0)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/prices')
        const prices: PriceData[] = await res.json()
        const found = prices.find(p => p.pair === pair)
        if (found) {
          if (prevPriceRef.current !== null && prevPriceRef.current !== found.price) {
            setFlipKey(k => k + 1)
          }
          prevPriceRef.current = found.price
          setData(found)
        }
      } catch { /* keep previous */ }
    }
    load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [pair])

  if (!data) {
    return <div className={`animate-pulse bg-brand-900/5 rounded-xl ${compact ? 'h-12' : 'h-20'}`} />
  }

  const positive = data.change >= 0

  return (
    <div className={`bg-brand-900 rounded-xl text-white ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs font-medium">{data.pair}</p>
          <p key={flipKey} className={`font-mono font-bold animate-digit-flip ${compact ? 'text-sm' : 'text-lg'}`}>
            {data.price.toLocaleString('en-US', { maximumFractionDigits: data.pair.includes('JPY') ? 2 : 4 })}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {positive ? '+' : ''}{data.change.toFixed(2)}%
          </span>
          {showSparkline && <MiniChart data={data.sparkline} positive={positive} />}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/data/ && git commit -m "feat: add MiniChart and StockWidget with live price updates"
```

---

### Task 14: Data — CertificateCard

**Files:**
- Create: `src/components/data/CertificateCard.tsx`

- [ ] **Step 1: Implement CertificateCard**

```tsx
// src/components/data/CertificateCard.tsx
import Link from 'next/link'
import type { Certificate } from '@/types'

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const date = new Date(certificate.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className="bg-white border border-brand-100 rounded-2xl p-5 flex items-center justify-between shadow-card">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl">
          {certificate.badgeEmoji}
        </div>
        <div>
          <p className="font-semibold text-brand-900 text-sm">{certificate.questTitle}</p>
          <p className="text-brand-900/50 text-xs">{date}</p>
        </div>
      </div>
      <Link href={`/certificates/${certificate.id}`}
        className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-[opacity]">
        View →
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/data/CertificateCard.tsx && git commit -m "feat: add CertificateCard component"
```

---

### Task 15: Cards — CourseCard & CourseRow

**Files:**
- Create: `src/components/cards/CourseCard.tsx`, `src/components/cards/CourseRow.tsx`
- Test: `src/components/cards/__tests__/CourseCard.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/cards/__tests__/CourseCard.test.tsx
import { render, screen } from '@testing-library/react'
import { CourseCard } from '@/components/cards/CourseCard'
import { mockCourses, mockUserProgress } from '@/lib/mock-data'

describe('CourseCard', () => {
  const course = mockCourses[0] // forex, no prerequisite
  const lockedCourse = mockCourses[1] // has prerequisiteQuestId

  it('renders course title and category', () => {
    render(<CourseCard course={course} progress={mockUserProgress} />)
    expect(screen.getByText(course.title)).toBeInTheDocument()
  })

  it('shows progress bar for in-progress course', () => {
    render(<CourseCard course={course} progress={mockUserProgress} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows lock overlay for locked course', () => {
    render(<CourseCard course={lockedCourse} progress={mockUserProgress} />)
    expect(screen.getByLabelText(/locked/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx jest CourseCard --no-coverage
```

- [ ] **Step 3: Implement CourseCard**

```tsx
// src/components/cards/CourseCard.tsx
import Link from 'next/link'
import type { Course, UserProgress } from '@/types'
import { Badge } from '@/components/atoms/Badge'
import { categoryGradient, getCourseState, getCourseProgress } from '@/lib/mock-data'

interface CourseCardProps {
  course: Course
  progress: UserProgress
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const state = getCourseState(course, progress)
  const pct   = getCourseProgress(course, progress)
  const isLocked = state === 'locked'

  return (
    <Link href={isLocked ? '#' : `/courses/${course.slug}`}
      className={`group relative block rounded-2xl overflow-hidden shadow-card hover:shadow-brand-lg transition-[transform,box-shadow] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${isLocked ? 'cursor-default' : ''}`}
      tabIndex={isLocked ? -1 : undefined}
      aria-disabled={isLocked}>

      {/* Gradient header */}
      <div className={`h-28 bg-gradient-to-br ${categoryGradient(course.category)} relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-3 left-3">
          <Badge variant="tag" category={course.category}>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 text-white/80 text-xs font-mono">{course.xpTotal} XP</div>
      </div>

      {/* Body */}
      <div className="bg-white p-4">
        <h3 className="font-semibold text-brand-900 text-sm mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-brand-900/50 text-xs mb-3">{course.lessonCount} lessons · {course.difficulty}</p>

        {/* Progress bar */}
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
          className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-[width]" style={{ width: `${pct}%` }} />
        </div>
        {pct > 0 && <p className="text-xs text-brand-900/50 mt-1">{pct}% complete</p>}
      </div>

      {/* Lock overlay */}
      {isLocked && (
        <div aria-label="Locked course" className="absolute inset-0 bg-white/70 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center gap-2">
          <span className="text-2xl">🔒</span>
          <p className="text-xs font-medium text-brand-900/70 text-center px-4">Complete prerequisite quest to unlock</p>
        </div>
      )}
    </Link>
  )
}
```

- [ ] **Step 4: Implement CourseRow**

```tsx
// src/components/cards/CourseRow.tsx
import Link from 'next/link'
import type { Course, UserProgress } from '@/types'
import { getCourseProgress } from '@/lib/mock-data'

interface CourseRowProps {
  course: Course
  progress: UserProgress
}

export function CourseRow({ course, progress }: CourseRowProps) {
  const pct = getCourseProgress(course, progress)
  return (
    <Link href={`/courses/${course.slug}`}
      className="flex items-center gap-4 py-3 hover:bg-brand-50 rounded-xl px-2 -mx-2 transition-[background] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
      <span className="text-sm font-medium text-brand-900 flex-1 truncate group-hover:text-brand-600 transition-[color]">
        {course.title}
      </span>
      <div className="w-24 h-1.5 bg-brand-100 rounded-full overflow-hidden shrink-0">
        <div className="h-full bg-brand-600 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-brand-900/50 w-10 text-right shrink-0">{pct}%</span>
    </Link>
  )
}
```

- [ ] **Step 5: Run tests**

```bash
npx jest CourseCard --no-coverage
```
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/cards/CourseCard.tsx src/components/cards/CourseRow.tsx src/components/cards/__tests__/
git commit -m "feat: add CourseCard and CourseRow with derived progress state"
```

---

### Task 16: Cards — ArticleCard, ArticleFeaturedHero, QuestCard

**Files:**
- Create: `src/components/cards/ArticleCard.tsx`, `ArticleFeaturedHero.tsx`, `QuestCard.tsx`

- [ ] **Step 1: Implement ArticleCard**

```tsx
// src/components/cards/ArticleCard.tsx
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
```

- [ ] **Step 2: Implement ArticleFeaturedHero**

```tsx
// src/components/cards/ArticleFeaturedHero.tsx
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
```

- [ ] **Step 3: Implement QuestCard**

```tsx
// src/components/cards/QuestCard.tsx
import type { Quest, UserProgress } from '@/types'
import { Badge } from '@/components/atoms/Badge'
import { getQuestProgress } from '@/lib/mock-data'

interface QuestCardProps {
  quest: Quest
  progress: UserProgress
}

export function QuestCard({ quest, progress }: QuestCardProps) {
  const { completed, total } = getQuestProgress(quest, progress)
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-brand-900 text-sm mb-0.5">{quest.title}</h3>
          <p className="text-brand-900/50 text-xs">{quest.description}</p>
        </div>
        <Badge variant="icon" emoji={quest.badgeEmoji} />
      </div>

      {/* Progress bar with knob */}
      <div className="relative h-2 bg-brand-100 rounded-full mb-2">
        <div className="h-full bg-brand-600 rounded-full transition-[width]" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-600 rounded-full border-2 border-white shadow transition-[left]"
          style={{ left: `calc(${pct}% - 6px)` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-brand-900/50">
        <span>{completed}/{total} courses</span>
        <span>+{quest.xpBonus} XP bonus</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/cards/ && git commit -m "feat: add ArticleCard, ArticleFeaturedHero, QuestCard"
```

---

### Task 17: Lesson Components

**Files:**
- Create: `src/components/lesson/LessonRow.tsx`, `VideoPlayer.tsx`, `NotesPanel.tsx`, `CommentsPanel.tsx`

- [ ] **Step 1: Implement LessonRow**

```tsx
// src/components/lesson/LessonRow.tsx
import type { Lesson } from '@/types'

interface LessonRowProps {
  lesson: Lesson
  number: number
  onClick?: () => void
}

const statusIcon = { completed: '✅', active: '▶️', locked: '🔒' }
const statusColor = {
  completed: 'text-emerald-600',
  active:    'text-brand-600',
  locked:    'text-brand-900/30',
}

export function LessonRow({ lesson, number, onClick }: LessonRowProps) {
  return (
    <button
      onClick={lesson.status !== 'locked' ? onClick : undefined}
      disabled={lesson.status === 'locked'}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${lesson.status === 'active' ? 'bg-brand-50' : 'hover:bg-brand-50'} ${lesson.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <span className="text-sm w-5 shrink-0 text-center">{statusIcon[lesson.status]}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium truncate ${statusColor[lesson.status]}`}>
          {number}. {lesson.title}
        </p>
        <p className="text-brand-900/40 text-xs">{lesson.durationMinutes}m · {lesson.xpReward} XP</p>
      </div>
    </button>
  )
}
```

- [ ] **Step 2: Implement VideoPlayer**

```tsx
// src/components/lesson/VideoPlayer.tsx
'use client'
import { useState } from 'react'

interface VideoPlayerProps {
  xpReward: number
  onComplete?: () => void
}

export function VideoPlayer({ xpReward, onComplete }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  function togglePlay() { setPlaying(p => !p) }

  function handleScrub(e: React.ChangeEvent<HTMLInputElement>) {
    setProgress(Number(e.target.value))
  }

  return (
    <div className="relative bg-brand-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
      {/* Placeholder frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-800" />
      <img src="https://placehold.co/1280x720/1e1b4b/a78bfa?text=Video+Lesson" alt="Video lesson" className="absolute inset-0 w-full h-full object-cover opacity-40" />

      {/* XP badge */}
      <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        +{xpReward} XP
      </div>

      {/* Play/pause */}
      <button onClick={togglePlay}
        className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition-[background] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
        {playing ? '⏸' : '▶️'}
      </button>

      {/* Scrubber */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
        <input type="range" min={0} max={100} value={progress} onChange={handleScrub}
          className="w-full h-1 accent-brand-400 cursor-pointer" />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Implement NotesPanel**

```tsx
// src/components/lesson/NotesPanel.tsx
'use client'
import { useState } from 'react'

interface Note { id: string; timestamp: string; text: string }

const DEMO_NOTES: Note[] = [
  { id: 'n1', timestamp: '02:14', text: 'Currency pairs always quoted as base/quote — EUR/USD means 1 EUR = X USD.' },
  { id: 'n2', timestamp: '05:48', text: 'Spread = difference between bid and ask price. Tighter spread = lower cost to trade.' },
]

export function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>(DEMO_NOTES)
  const [draft, setDraft] = useState('')

  function addNote() {
    if (!draft.trim()) return
    setNotes(prev => [...prev, { id: Date.now().toString(), timestamp: '—', text: draft.trim() }])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {notes.map(note => (
          <div key={note.id} className="bg-brand-50 rounded-xl p-3">
            <span className="text-xs font-mono text-brand-600 mr-2">{note.timestamp}</span>
            <span className="text-sm text-brand-900">{note.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addNote()}
          placeholder="Add a note…"
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
        <button onClick={addNote}
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-95">
          Add
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Implement CommentsPanel**

```tsx
// src/components/lesson/CommentsPanel.tsx
'use client'
import { useState } from 'react'
import { Avatar } from '@/components/atoms/Avatar'

interface Comment { id: string; author: string; text: string; upvotes: number; replies: Comment[] }

const DEMO: Comment[] = [
  { id: 'c1', author: 'Sophie M.', text: 'The bit about bid/ask spread was really clear. Finally understand why brokers charge differently.', upvotes: 12, replies: [
    { id: 'c1r1', author: 'Maria Kovač', text: 'Glad it clicked! Spread comparison is key when choosing a broker for scalping.', upvotes: 5, replies: [] },
  ]},
  { id: 'c2', author: 'Luca B.', text: 'Can you clarify the difference between interbank rates and retail rates?', upvotes: 4, replies: [] },
]

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes)
  return (
    <div className={`flex gap-3 ${depth > 0 ? 'ml-8 mt-3' : ''}`}>
      <Avatar name={comment.author} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-semibold text-brand-900 mb-0.5">{comment.author}</p>
        <p className="text-sm text-brand-900/80 leading-relaxed">{comment.text}</p>
        <button onClick={() => setUpvotes(v => v + 1)}
          className="mt-1 text-xs text-brand-900/40 hover:text-brand-600 transition-[color] focus-visible:outline-none">
          ▲ {upvotes}
        </button>
        {comment.replies.map(r => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}
      </div>
    </div>
  )
}

export function CommentsPanel() {
  const [comments, setComments] = useState<Comment[]>(DEMO)
  const [draft, setDraft] = useState('')

  function addComment() {
    if (!draft.trim()) return
    setComments(prev => [...prev, { id: Date.now().toString(), author: 'Alex Kowalski', text: draft.trim(), upvotes: 0, replies: [] }])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {comments.map(c => <CommentItem key={c.id} comment={c} />)}
      </div>
      <div className="flex gap-2 pt-2 border-t border-brand-100">
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addComment()}
          placeholder="Add a comment…"
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
        <button onClick={addComment}
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-95">
          Post
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/lesson/ && git commit -m "feat: add LessonRow, VideoPlayer, NotesPanel, CommentsPanel"
```

---

### Task 18: Navigation — CourseLessonNav & CourseEnrollSidebar

**Files:**
- Create: `src/components/navigation/CourseLessonNav.tsx`, `CourseEnrollSidebar.tsx`

- [ ] **Step 1: Implement CourseLessonNav**

```tsx
// src/components/navigation/CourseLessonNav.tsx
import type { Course, UserProgress } from '@/types'
import { LessonRow } from '@/components/lesson/LessonRow'
import { getCourseProgress } from '@/lib/mock-data'

interface CourseLessonNavProps {
  course: Course
  progress: UserProgress
  activeLessonSlug: string
  onLessonSelect: (slug: string) => void
}

export function CourseLessonNav({ course, progress, activeLessonSlug, onLessonSelect }: CourseLessonNavProps) {
  const pct = getCourseProgress(course, progress)
  return (
    <aside className="w-72 bg-white border-r border-brand-100 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-brand-100">
        <h3 className="font-semibold text-brand-900 text-sm mb-2 line-clamp-2">{course.title}</h3>
        <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-[width]" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-brand-900/40 mt-1">{pct}% complete</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
        {course.lessons.map((lesson, i) => (
          <LessonRow key={lesson.id} lesson={lesson} number={i + 1}
            onClick={() => onLessonSelect(lesson.slug)} />
        ))}
      </nav>
    </aside>
  )
}
```

- [ ] **Step 2: Implement CourseEnrollSidebar**

```tsx
// src/components/navigation/CourseEnrollSidebar.tsx
import type { Course, Quest } from '@/types'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'

interface CourseEnrollSidebarProps {
  course: Course
  quest?: Quest
  enrolled: boolean
}

export function CourseEnrollSidebar({ course, quest, enrolled }: CourseEnrollSidebarProps) {
  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl border border-brand-100 shadow-brand p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-900">{course.xpTotal} XP</span>
          {quest && <Badge variant="icon" emoji={quest.badgeEmoji} label={quest.title} />}
        </div>

        <div className="flex flex-col gap-2 text-sm text-brand-900/70">
          <div className="flex items-center gap-2">
            <span>📚</span><span>{course.lessonCount} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span><span>{course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏆</span><span>Certificate on completion</span>
          </div>
        </div>

        <Link href={`/courses/${course.slug}/${course.lessons[0]?.slug ?? ''}`} className="block">
          <Button className="w-full" size="lg">
            {enrolled ? 'Continue Learning' : 'Enroll Now — Free'}
          </Button>
        </Link>
      </div>
    </aside>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/navigation/CourseLessonNav.tsx src/components/navigation/CourseEnrollSidebar.tsx
git commit -m "feat: add CourseLessonNav and CourseEnrollSidebar"
```

---

### Task 19: Gamification Components

**Files:**
- Create: `src/components/gamification/XPBar.tsx`, `BadgeGrid.tsx`, `StreakCounter.tsx`, `XPFloater.tsx`, `BadgeUnlockOverlay.tsx`

- [ ] **Step 1: Implement XPBar**

```tsx
// src/components/gamification/XPBar.tsx
'use client'
import { motion } from 'framer-motion'

interface XPBarProps {
  current: number
  max: number
  level: number
  className?: string
}

export function XPBar({ current, max, level, className = '' }: XPBarProps) {
  const pct = Math.min((current / max) * 100, 100)
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between text-xs text-white/60">
        <span>Lv {level}</span>
        <span>{current}/{max} XP</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement BadgeGrid**

```tsx
// src/components/gamification/BadgeGrid.tsx
import type { Badge } from '@/types'
import { Badge as BadgeAtom } from '@/components/atoms/Badge'

interface BadgeGridProps {
  badges: Badge[]
  earnedIds: string[]
}

export function BadgeGrid({ badges, earnedIds }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
      {badges.map(badge => (
        <BadgeAtom key={badge.id} variant="icon" emoji={badge.emoji} label={badge.name}
          locked={!earnedIds.includes(badge.id)} />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Implement StreakCounter**

```tsx
// src/components/gamification/StreakCounter.tsx
interface StreakCounterProps {
  days: number
  className?: string
}

export function StreakCounter({ days, className = '' }: StreakCounterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg">🔥</span>
      <span className="text-white/80 text-sm font-semibold">{days} day streak</span>
    </div>
  )
}
```

- [ ] **Step 4: Implement XPFloater**

```tsx
// src/components/gamification/XPFloater.tsx
'use client'
import { useEffect, useState } from 'react'

interface XPFloaterProps {
  amount: number
  onDone?: () => void
}

export function XPFloater({ amount, onDone }: XPFloaterProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); onDone?.() }, 1200)
    return () => clearTimeout(t)
  }, [onDone])

  if (!visible) return null
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-float-up">
      <div className="bg-brand-600 text-white font-bold px-6 py-3 rounded-full shadow-brand-lg text-lg">
        +{amount} XP
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Implement BadgeUnlockOverlay**

```tsx
// src/components/gamification/BadgeUnlockOverlay.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Badge } from '@/types'
import { Button } from '@/components/atoms/Button'

interface BadgeUnlockOverlayProps {
  badge: Badge | null
  onClose: () => void
}

export function BadgeUnlockOverlay({ badge, onClose }: BadgeUnlockOverlayProps) {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-900/90 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="bg-white rounded-3xl p-12 flex flex-col items-center gap-6 max-w-sm mx-4 text-center">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-7xl">
              {badge.emoji}
            </motion.div>
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">Badge Unlocked!</p>
              <h2 className="font-display text-2xl font-bold text-brand-900">{badge.name}</h2>
              <p className="text-brand-900/60 text-sm mt-2">{badge.description}</p>
            </div>
            <Button onClick={onClose} size="lg">Continue</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/gamification/ && git commit -m "feat: add XPBar, BadgeGrid, StreakCounter, XPFloater, BadgeUnlockOverlay"
```

---

### Task 20: Component Showcase Page

**Files:**
- Create: `src/app/(public)/showcase/page.tsx`

A single page that renders every component for visual verification. Not linked from nav — accessed directly at `/showcase`.

- [ ] **Step 1: Create showcase page**

```tsx
// src/app/(public)/showcase/page.tsx
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
  const [unlockBadge, setUnlockBadge] = useState<typeof mockBadges[0] | null>(null)

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
```

- [ ] **Step 2: Start the dev server and visit /showcase**

```bash
npm run dev
```
Open: `http://localhost:3000/showcase`

Expected: All components render without console errors. Visually verify each section.

- [ ] **Step 3: Run full test suite**

```bash
npx jest --no-coverage
```
Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/(public)/showcase/ && git commit -m "feat: add component showcase page"
```

---

### Task 21: Final Verification

- [ ] **Step 1: Run all tests**

```bash
npx jest --no-coverage
```
Expected: All PASS, 0 failures.

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: Build succeeds, no errors.

- [ ] **Step 4: Tag completion**

```bash
git tag foundation-complete
```
