# Chartly — Educational Platform Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui

---

## 1. Project Overview

Chartly is a paid educational platform for financial trading. It provides structured courses (Forex 60%, Crypto 20%, Psychology/Basics 20%), a public blog with live market data, and a gamified learning experience with quests and achievement badges.

The frontend is a Next.js application built as clean templates designed to connect to a backend auth system and database. No backend is included in this build.

---

## 2. Visual Identity

- **Aesthetic:** Modern Clean — light background (#f8f7ff), crisp whites, deep navy text (#1e1b4b)
- **Primary color:** Purple — `#7c3aed` (Violet-700), derived shades `#4f46e5`, `#a78bfa`, `#ede9fe`
- **Category colors:** Forex → purple, Crypto → pink/rose, Psychology/Basics → teal
- **Typography:** Display font for headings (tight tracking, -1px letter-spacing), clean sans for body (1.7 line-height)
- **Shadows:** Layered, color-tinted with low opacity (e.g. `0 4px 16px rgba(124,58,237,0.08)`)
- **Gradients:** Radial glows in hero sections; subtle grain texture for depth
- **No default Tailwind blue/indigo** as primary

---

## 3. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | SSR for public pages, file-based routing, API routes for stock proxy |
| Language | TypeScript | Type safety across 10+ pages |
| Styling | Tailwind CSS | Rapid custom UI, no CSS specificity fights |
| Animation | Framer Motion | Spring animations, page transitions, `AnimatePresence` |
| Components | shadcn/ui | Headless, fully owned — modals, tabs, tooltips |
| Live data | ExchangeRate-API (Forex), CoinGecko (crypto) proxied via Next.js API route | Hides API key, enables caching |

---

## 4. Information Architecture

### Public (no login required)

| Route | Page | Key Content |
|-------|------|-------------|
| `/` | Landing Page | Hero · Features · Course preview · Pricing · Testimonials · CTA |
| `/blog` | Blog Index | Article cards · Category filters · Live ticker strip |
| `/blog/[slug]` | Blog Article | Article body · Inline stock widget · Related pairs sidebar · Course CTA |
| `/login` | Login | Login form · Social auth buttons |
| `/signup` | Signup | Signup form · Social auth buttons |
| `/certificates/[id]` | Certificate View | Full-page certificate card — public and shareable, no auth required; uses public layout (navbar + footer, no ticker strip) |

### Gated (paid users only — protected by middleware)

| Route | Page | Key Content |
|-------|------|-------------|
| `/dashboard` | Dashboard | Continue learning · Active quests · Streak · Stats · Course list |
| `/courses` | Course Catalog | All courses · Forex/Crypto/Other filters · Progress indicators |
| `/courses/[slug]` | Course Page | Overview · Curriculum · Instructor · Quest badge · Enroll CTA |
| `/courses/[slug]/[lesson]` | Lesson Page | Video player · Notes tab · Comments tab · XP reward · Nav |
| `/profile` | User Profile | Avatar · Level · Badges · Quest history · Certificates |
| `/leaderboard` | Leaderboard | Weekly/monthly rankings · XP totals · Quest completions |

### Shared Layouts

- **Public layout:** Live ticker strip at the very top (above navbar) · Sticky navbar (logo + nav + login CTA) · Footer
- **Platform layout:** Fixed dark left sidebar (nav + quest progress + XP bar + user) · Top bar (search + notifications + avatar) · Main content area with transitions

---

## 5. Component Library (Built First)

Components are built before pages and composed to build all views.

### Atoms
- `Button` — variants: primary, outline, ghost; sizes: sm, md, lg; states: hover, focus-visible, active, disabled
- `Badge` — two variants: (1) text tag for category/level labels (Forex, Crypto, Psychology, Beginner, Advanced); (2) icon badge for quest/achievement display (emoji or image + optional label), used in `CourseEnrollSidebar` and course hero
- `Input` — text input with label, error state
- `Avatar` — circular user image with fallback initials

### Cards
- `CourseCard` — gradient header, category tag, title, lesson count, progress bar, XP value; states: not-started, in-progress, locked
- `CourseRow` — compact single-line course entry for Dashboard: title + inline progress bar + percentage label; links to course page
- `ArticleCard` — category color header, title, author, date, read time; used in blog index grid
- `ArticleFeaturedHero` — large hero card for the top of the blog index: dark gradient background, `MiniChart` sparkline, title, excerpt, author, CTA button; not reused elsewhere
- `QuestCard` — quest title, progress bar with knob, lesson count, reward badge preview

### Lesson Components
- `LessonRow` — lesson number, title, duration, XP; states: completed (green check), active (purple play), locked (grey)
- `VideoPlayer` — play/pause, progress scrubber, XP badge overlay
- `NotesPanel` — timestamped notes list, add/edit note, anchor to video timestamp
- `CommentsPanel` — threaded comments, reply, upvote

### Gamification
- `XPBar` — animated fill (spring), level number, XP current/max
- `BadgeGrid` — earned badges (coloured) + locked badges (greyed)
- `StreakCounter` — flame icon + day count
- `XPFloater` — `+200 XP` float-up animation on lesson complete
- `BadgeUnlockOverlay` — full-screen with spinning badge + confetti on achievement

### Navigation
- `Sidebar` — dark (#1e1b4b), nav links with active state, XP bar + user section at bottom
- `CourseLessonNav` — lesson-page-specific panel: course title, progress bar, scrollable `LessonRow` list; displayed as left panel on Lesson Page in place of the main `Sidebar`
- `CourseEnrollSidebar` — sticky right-side panel on Course Page: course XP, quest badge (uses `Badge` atom), enroll/continue CTA button; layout component, not reused elsewhere
- `TopBar` — search input, notification bell, avatar dropdown
- `Navbar` (public) — logo, nav links, login + CTA buttons
- `TickerStrip` — infinite-scroll marquee of live pairs; pauses on hover

### Data
- `StockWidget` — inline dark card, pair name, live price, % change, sparkline; digit-flip animation on price update; accepts `showSparkline?: boolean` prop (default `true`) — set to `false` for the compact sidebar variant used on blog article pages
- `MiniChart` — lightweight sparkline (svg or recharts); used in (1) blog index featured hero card as a decorative price chart, and (2) inside `StockWidget` as the small sparkline in the bottom-right
- `CertificateCard` — static UI card on Profile page: course/path name, completion date, "View Certificate" button (opens full-page certificate view); shareable link is a static `/certificates/[id]` route rendered client-side from mock data

---

## 6. Page Designs

### Landing Page (`/`)
Top to bottom:
1. Live ticker strip (dark bar, always visible)
2. Sticky navbar: Chartly logo · Courses / Blog / Pricing · Login + Start Free
3. Hero section: radial glow background · category pill · H1 headline · subtext · dual CTA buttons · trust pills (40+ courses, live data, certificates)
4. Social proof bar: 12,400+ students · 40+ courses · 4.9★ · 98% completion
5. Features grid (3 cols): Structured Paths · Live Market Data · Earn as You Learn
6. Popular Courses preview (3 cards)
7. Pricing section: Monthly ($29/mo) vs Annual ($19/mo, best value highlighted) — both "Get Started" buttons link to `/signup` (no payment flow in scope)
8. Testimonials (3 quotes)
9. Final CTA banner (purple gradient, "Your first chart awaits")
10. Footer

### Blog Index (`/blog`)
- Live ticker strip + navbar
- `ArticleFeaturedHero` component (dark gradient, `MiniChart` sparkline)
- Category filter pills: All / Forex / Crypto / Psychology / Basics
- `ArticleCard` grid (3 columns, responsive to 1 on mobile)

### Blog Article (`/blog/[slug]`)
- Two-column layout: article body (left, wider) + sidebar (right, 220px)
- Article body: category tag · H1 · author + date · prose · inline `StockWidget` cards
- Sidebar: course CTA card · related live pairs widget (reuses `StockWidget` in a compact/minimal variant — same component, smaller padding, no sparkline) · related articles list (compact text links — `<a>` elements, not `ArticleCard`)
- Auth state is read client-side via a lightweight `useSession()` hook (returns null if unauthenticated). Non-logged-in users see course CTA with "Start Learning →" button; logged-in users see "Go to course →" link. No middleware involvement — the page itself is always public.

### Dashboard (`/dashboard`)
- Platform shell (dark sidebar + top bar)
- "Continue learning" hero card (purple gradient, course + lesson name, Resume button)
- Stats row: Active Quests · Day Streak · Badges earned
- Two-column lower: `QuestCard` (active quest) + My Courses list (compact `CourseRow` — title + progress bar + percentage, not full `CourseCard`)

### Course Catalog (`/courses`)
- Filter tabs: All / Forex / Crypto / Psychology
- Masonry or uniform grid of `CourseCard` components
- Progress indicators on enrolled courses
- Locked courses shown with lock overlay (complete prerequisite quest to unlock)

### Course Page (`/courses/[slug]`)
- Hero: course gradient header, title, category, instructor, XP reward, quest badge (`Badge` atom)
- Tabs: Overview · Curriculum · Instructor
- Curriculum: grouped lesson list with `LessonRow` components
- Sticky `CourseEnrollSidebar` on the right (see Navigation components)

### Lesson Page (`/courses/[slug]/[lesson]`)
- Left panel: `CourseLessonNav` component (course title, progress bar, scrollable lesson list)
- Main: `VideoPlayer` full width · tabs (Overview / Notes / Comments)
- Previous / Mark Complete & Next navigation at bottom
- On complete: `XPFloater` animation; if quest completed, `BadgeUnlockOverlay`

### Profile (`/profile`)
- Avatar, display name, member since, level + `XPBar`
- Badge grid: earned + locked
- Quest history: completed quests with dates and rewards
- Certificates: downloadable/viewable on completion of full learning paths

### Leaderboard (`/leaderboard`)
- Toggle: Weekly / Monthly
- Ranked list with avatar, name, XP, quest completions
- Current user row always visible (pinned if not in top 10)

### Certificate View (`/certificates/[id]`)
- Public page, no auth required; uses public layout (navbar + footer) **without** ticker strip
- Centered `CertificateCard` on a light background
- Certificate displays: Chartly logo, course/path name, recipient name, completion date, badge emoji
- "Share" button copies the URL to clipboard
- Data sourced from mock certificate data keyed by `id`; if `id` not found, renders a 404-style "Certificate not found" message

---

## 7. Gamification System

**Model: Quests + Achievement Paths**

- **XP:** Earned per lesson completed. Amount shown on lesson row and awarded with `XPFloater` animation on completion.
- **Quests:** Structured learning paths grouping related courses (e.g. "Forex Fundamentals Path" = 5 courses). Completing a quest awards a badge + XP bonus.
- **Badges:** Visual achievements tied to quest completion, milestone lessons, and streaks. Displayed on profile and earned with `BadgeUnlockOverlay`.
- **Streak:** Daily login/lesson streak tracked and shown in dashboard and sidebar.
- **Locked content:** Each course in the mock data has an optional `prerequisiteQuestId` field. If set, the `CourseCard` renders in locked state (grey overlay + lock icon + "Complete [Quest Name] to unlock" tooltip on hover) when the user's completed quests do not include that ID. The lock overlay is **informational only** — clicking a locked card shows no modal or redirect; it is non-interactive. If `prerequisiteQuestId` is null/undefined, the course is freely accessible to all paid users.
- **Certificates:** Issued on full learning path completion. Shown on profile, shareable link.
- **Leaderboard:** Weekly and monthly rankings by XP. Social motivation layer.

---

## 8. Live Market Data

- **Source:** Public API (ExchangeRate-API for Forex, CoinGecko for crypto)
- **Proxied via:** Next.js API route `/api/prices` — hides API key, adds 30-second server-side cache
- **Pairs tracked:** EUR/USD, GBP/USD, USD/JPY, USD/CHF, XAU/USD (gold via ExchangeRate-API metal rates), BTC/USD, ETH/USD (CoinGecko). S&P 500 is excluded — not available from these APIs without a paid plan.
- **Used in:**
  - Ticker strip (all public + platform pages **except** `/certificates/[id]`)
  - Inline `StockWidget` in blog articles
  - Related pairs sidebar on article pages
- **Update interval:** Ticker polls `/api/prices` every 30 seconds via `setInterval`
- **Price change animation:** Digit-flip on value change (CSS keyframe)
- **Fallback:** If API unavailable, last cached value shown with "delayed" label

---

## 9. Animations & Effects

All animations use Framer Motion unless noted.

| Element | Animation | Easing |
|---------|-----------|--------|
| Page transitions | Slide + fade via `AnimatePresence` | Spring `{ stiffness: 300, damping: 24 }` |
| Hero headline | Staggered word drop-in with overshoot | Spring |
| Stats bar numbers | Count-up on scroll enter | Ease-out |
| Cards on scroll | Staggered fade + `translateY(20px → 0)` | Spring |
| Card hover | `translateY(-4px)` + shadow deepen | CSS transition (transform only) |
| XP bar fill | Left-to-right spring fill on mount | Spring with overshoot |
| Quest progress | Same as XP bar | Spring |
| Lesson complete | `+XP` number floats up and fades | Spring + opacity |
| Badge unlock | Full-screen overlay, badge spin-in + confetti | Spring + canvas |
| Ticker strip | Infinite CSS marquee scroll | `animation: marquee` (CSS only) |
| Stock price digit | Digit flip on value change | CSS keyframe |
| Button interactions | Scale on hover/active | CSS transform only |
| Tab switch | Fade crossfade, no layout shift | Framer Motion `AnimatePresence` |

**Rules:**
- Only animate `transform` and `opacity` — never width, height, or layout properties
- All animations respect `prefers-reduced-motion: reduce`
- No `transition-all`

---

## 10. Access Control

- Next.js middleware checks for auth session on all `/dashboard`, `/courses`, `/profile`, `/leaderboard` routes
- Unauthenticated users redirected to `/login` with `?redirect=` param
- `/login` and `/signup` are public; authenticated users visiting either are redirected to `/dashboard`
- Blog and landing page are fully public; auth state on these pages is read client-side only (no middleware)
- Course cards on the public landing page are previews only (no lesson access)

---

## 11. Folder Structure

```
src/
  app/
    (public)/          # Public layout group (navbar + footer + ticker strip)
      page.tsx         # Landing
      blog/
        page.tsx       # Blog index
        [slug]/page.tsx
      login/page.tsx
      signup/page.tsx
      certificates/
        [id]/page.tsx  # Public, no auth required, NO ticker strip (layout override)
    (platform)/        # Gated layout group
      dashboard/page.tsx
      courses/
        page.tsx
        [slug]/
          page.tsx
          [lesson]/page.tsx
      profile/page.tsx
      leaderboard/page.tsx
      certificates/[id]/page.tsx    # merged into (public) group — public, no auth, no ticker
    api/
      prices/route.ts  # Live market data proxy
  components/
    atoms/             # Button, Badge, Input, Avatar
    cards/             # CourseCard, CourseRow, ArticleCard, ArticleFeaturedHero, QuestCard
    lesson/            # LessonRow, VideoPlayer, NotesPanel, CommentsPanel
    gamification/      # XPBar, BadgeGrid, StreakCounter, XPFloater, BadgeUnlockOverlay
    navigation/        # Sidebar, CourseLessonNav, CourseEnrollSidebar, TopBar, Navbar, TickerStrip
    data/              # StockWidget, MiniChart, CertificateCard
  lib/
    api.ts             # Data fetching helpers
    auth.ts            # Auth helpers (session check)
  types/
    index.ts           # Shared TypeScript types
```

---

## 12. Key TypeScript Types

The following types are defined in `src/types/index.ts` and used across the app:

```ts
type Category = 'forex' | 'crypto' | 'psychology' | 'basics'
type Difficulty = 'beginner' | 'intermediate' | 'advanced'
type LessonStatus = 'completed' | 'active' | 'locked'

interface Instructor {
  name: string
  avatarUrl?: string
  bio: string
}

interface Lesson {
  id: string
  slug: string
  title: string
  durationMinutes: number
  xpReward: number
  status: LessonStatus
}

interface Course {
  id: string
  slug: string
  title: string
  overview: string               // short paragraph shown on Course Page Overview tab
  category: Category             // drives gradient header color (Forex → purple, Crypto → pink, Psychology/Basics → teal)
  difficulty: Difficulty
  lessonCount: number
  xpTotal: number
  lessons: Lesson[]
  instructor: Instructor
  prerequisiteQuestId?: string   // if set, course is locked until quest is complete
}
// Note: no separate headerGradient field — gradient is derived from category at render time
// CourseCard/CourseRow progress state derivation:
//   - 'locked': course.prerequisiteQuestId is set AND not in UserProgress.completedQuestIds
//   - 'not-started': course.id not in UserProgress.completedCourseIds AND no completedLessonIds from this course
//   - 'in-progress': some (but not all) lesson IDs from course.lessons are in UserProgress.completedLessonIds
//   - progress percentage: completedLessonsInCourse.length / course.lessonCount * 100

interface Quest {
  id: string
  title: string
  description: string
  courseIds: string[]            // courses that make up this quest (quests group courses, not individual lessons)
  badgeEmoji: string
  xpBonus: number
}

// Quest progress is derived:
//   completedCount = intersection of quest.courseIds and UserProgress.completedCourseIds
//   totalCount = quest.courseIds.length
// A course is considered complete when all its lessons are in UserProgress.completedLessonIds

interface Badge {
  id: string
  emoji: string
  name: string
  description: string
  questId?: string               // badge awarded on quest completion; undefined = milestone/streak badge
}

interface Certificate {
  id: string
  questId: string
  questTitle: string             // denormalized from Quest.title
  badgeEmoji: string             // denormalized from Quest.badgeEmoji
  recipientName: string
  completedAt: string            // ISO date string
}

interface UserProgress {
  completedLessonIds: string[]
  completedCourseIds: string[]   // derived at save time: all lesson IDs in course are completed
  completedQuestIds: string[]
  earnedBadgeIds: string[]
  certificateIds: string[]
  xpTotal: number
  level: number
  streakDays: number
}

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string                   // markdown or HTML string
  category: Category
  author: string
  authorAvatarUrl?: string
  publishedAt: string            // ISO date string
  readTimeMinutes: number
  relatedPairs?: string[]        // e.g. ['EUR/USD', 'GBP/USD'] — drives sidebar StockWidget
  relatedArticleSlugs?: string[]
}

interface User {
  id: string
  name: string
  avatarUrl?: string
}

interface LeaderboardEntry {
  user: User
  xpTotal: number
  completedQuestCount: number
  rank: number
}

// useSession() hook — defined in src/lib/auth.ts
// Returns the current mock session or null if unauthenticated
// In the frontend template, this reads from localStorage key 'chartly_session'
// Shape: { userId: string; name: string; level: number } | null
// Used client-side only on public pages (blog article) to conditionally render CTA vs "Go to course" link
```

---

## 13. Out of Scope

The following are explicitly excluded from this frontend build:

- Backend authentication system (NextAuth, Supabase, etc.)
- Database schema or ORM
- Payment processing (Stripe integration)
- Video hosting/streaming infrastructure
- Admin CMS for course content
- Email notifications
- Real user data — all data is typed mock data for template purposes
