# Chartly — Public Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Prerequisite:** `2026-03-22-chartly-foundation-components.md` must be complete (all components built, tests passing, build succeeds).

**Goal:** Build all public-facing pages — Landing, Blog Index, Blog Article, Login, Signup, and Certificate View — producing a fully navigable public site.

**Architecture:** Next.js 14 App Router, `(public)` layout group (TickerStrip + Navbar + Footer). Certificate page uses its own nested layout (no ticker strip). All pages use mock data and are fully static-renderable.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Components from Foundation plan

---

### Task 1: Landing Page — Hero & Social Proof

**Files:**
- Create: `src/app/(public)/page.tsx` (start with Hero + Social Proof bar only)

- [ ] **Step 1: Create page file with Hero section**

```tsx
// src/app/(public)/page.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

const TRUST_PILLS = ['40+ Courses', 'Live Market Data', 'Certificates']
const STATS = [
  { value: '12,400+', label: 'Students' },
  { value: '40+',     label: 'Courses' },
  { value: '4.9★',    label: 'Rating' },
  { value: '98%',     label: 'Completion' },
]

// (rest of page assembled in subsequent steps — export at bottom)
```

Full hero implementation:

```tsx
function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pt-20 pb-24">
      {/* Radial glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          📈 Structured Trading Education
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl font-bold text-brand-900 tracking-tight leading-none mb-6">
          Learn to Trade.<br />
          <span className="text-brand-600">Earn as You Grow.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-brand-900/60 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Structured courses in Forex, Crypto, and Trading Psychology. Complete quests, earn XP, collect badges, and get certified — all with live market data built in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link href="/signup"><Button size="lg">Start Learning Free →</Button></Link>
          <Link href="/courses"><Button size="lg" variant="outline">Browse Courses</Button></Link>
        </motion.div>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {TRUST_PILLS.map(pill => (
            <span key={pill} className="flex items-center gap-1.5 text-sm text-brand-900/50">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />{pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Social Proof bar**

```tsx
function SocialProof() {
  return (
    <div className="bg-brand-900 py-6">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {STATS.map(s => (
          <div key={s.label}>
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-white/50 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/page.tsx && git commit -m "feat: landing page hero and social proof bar"
```

---

### Task 2: Landing Page — Features, Courses Preview, Pricing, Testimonials, CTA, Footer

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Add Features grid**

```tsx
const FEATURES = [
  { icon: '🗺️', title: 'Structured Paths', body: 'Follow curated learning paths from beginner to advanced. No guesswork — just a clear roadmap to trading confidence.' },
  { icon: '📡', title: 'Live Market Data', body: 'Every lesson is backed by real forex and crypto prices, updated every 30 seconds. Learn with the market, not after it.' },
  { icon: '🏆', title: 'Earn as You Learn', body: 'Complete lessons to earn XP. Finish quests to unlock badges. Build a portfolio of verified trading knowledge.' },
]

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-brand-900 tracking-tight mb-3">
            Everything you need to trade with confidence
          </h2>
          <p className="text-brand-900/60 max-w-xl mx-auto">Built for serious learners. Not a collection of YouTube videos — a complete system.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.1 }}
              className="bg-surface rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-brand-900 mb-2">{f.title}</h3>
              <p className="text-brand-900/60 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Course Preview (3 cards)**

```tsx
import { CourseCard } from '@/components/cards/CourseCard'
import { mockCourses, mockUserProgress } from '@/lib/mock-data'

function CoursesPreview() {
  const preview = mockCourses.filter(c => !c.prerequisiteQuestId).slice(0, 3)
  // Override progress to show not-started state for public preview
  const emptyProgress = { ...mockUserProgress, completedLessonIds: [], completedCourseIds: [], completedQuestIds: [] }
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold text-brand-900 tracking-tight">Popular Courses</h2>
          <Link href="/courses" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-[opacity]">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {preview.map(c => <CourseCard key={c.id} course={c} progress={emptyProgress} />)}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add Pricing section**

```tsx
const PLANS = [
  {
    name: 'Monthly',
    price: '$29',
    per: '/mo',
    highlight: false,
    features: ['All 40+ courses', 'Live market data', 'Quests & badges', 'Certificates'],
  },
  {
    name: 'Annual',
    price: '$19',
    per: '/mo',
    highlight: true,
    badge: 'Best Value — Save 34%',
    features: ['All 40+ courses', 'Live market data', 'Quests & badges', 'Certificates', 'Priority support'],
  },
]

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-brand-900 tracking-tight mb-3">Simple pricing</h2>
        <p className="text-brand-900/60 mb-12">One subscription. Every course. Cancel anytime.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PLANS.map(plan => (
            <div key={plan.name}
              className={`rounded-2xl p-8 text-left relative ${plan.highlight ? 'bg-brand-900 text-white ring-2 ring-brand-600' : 'bg-surface border border-brand-100'}`}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              <p className={`text-sm font-semibold mb-2 ${plan.highlight ? 'text-brand-400' : 'text-brand-600'}`}>{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`font-display text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-brand-900'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-brand-900/50'}`}>{plan.per}</span>
              </div>
              <ul className="flex flex-col gap-2 mb-8">
                {plan.features.map(f => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white/80' : 'text-brand-900/70'}`}>
                    <span className="text-emerald-400">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant={plan.highlight ? 'primary' : 'outline'} size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add Testimonials**

```tsx
const TESTIMONIALS = [
  { quote: "I went from knowing nothing about forex to placing my first live trade in 6 weeks. The quest system kept me accountable.", name: "Sophie M.", title: "Student · London" },
  { quote: "The live data integration is what sets Chartly apart. I was learning with real EUR/USD prices, not stale examples.", name: "Luca B.", title: "Student · Milan" },
  { quote: "Finally a trading course that explains the psychology. I stopped revenge trading after the mindset module.", name: "Anna K.", title: "Student · Warsaw" },
]

function Testimonials() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-brand-900 tracking-tight text-center mb-12">What students say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl p-6 shadow-card">
              <p className="text-brand-900/70 text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-brand-900 text-sm">{t.name}</p>
                <p className="text-brand-900/40 text-xs">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Add Final CTA banner and assemble page export**

```tsx
function CTABanner() {
  return (
    <section className="py-20 bg-brand-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(167,139,250,0.3)_0%,_transparent_70%)] pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl font-bold text-white tracking-tight mb-4">Your first chart awaits.</h2>
        <p className="text-white/70 mb-8 text-lg">Join 12,400+ traders learning on Chartly. Start free today.</p>
        <Link href="/signup"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Start Learning Free →</Button></Link>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <CoursesPreview />
      <Pricing />
      <Testimonials />
      <CTABanner />
    </>
  )
}
```

- [ ] **Step 6: Start server and visually verify landing page**

```bash
npm run dev
```
Visit: `http://localhost:3000`

Check: hero text, glow, stats bar, 3 feature cards, 3 course cards, pricing toggle, testimonials, CTA banner, footer.

- [ ] **Step 7: Commit**

```bash
git add src/app/(public)/page.tsx && git commit -m "feat: complete landing page with all sections"
```

---

### Task 3: Blog Index Page

**Files:**
- Create: `src/app/(public)/blog/page.tsx`

- [ ] **Step 1: Implement blog index**

```tsx
// src/app/(public)/blog/page.tsx
'use client'
import { useState } from 'react'
import { ArticleFeaturedHero } from '@/components/cards/ArticleFeaturedHero'
import { ArticleCard }         from '@/components/cards/ArticleCard'
import { mockArticles }        from '@/lib/mock-data'
import type { Category }       from '@/types'

type Filter = Category | 'all'
const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Forex', value: 'forex' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Basics', value: 'basics' },
]

export default function BlogPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const featured = mockArticles[0]
  const filtered = mockArticles.slice(1).filter(a => filter === 'all' || a.category === filter)

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
```

- [ ] **Step 2: Verify at `/blog`**

Visit `http://localhost:3000/blog`. Check: featured hero renders, filter pills work, article grid shows/hides correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/blog/page.tsx && git commit -m "feat: blog index with featured hero and category filters"
```

---

### Task 4: Blog Article Page

**Files:**
- Create: `src/app/(public)/blog/[slug]/page.tsx`

- [ ] **Step 1: Implement blog article page**

```tsx
// src/app/(public)/blog/[slug]/page.tsx
'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge }       from '@/components/atoms/Badge'
import { StockWidget } from '@/components/data/StockWidget'
import { Button }      from '@/components/atoms/Button'
import { useSession }  from '@/lib/auth'
import { mockArticles, mockCourses } from '@/lib/mock-data'

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = mockArticles.find(a => a.slug === params.slug)
  if (!article) notFound()

  const session = useSession()
  const relatedArticles = (article.relatedArticleSlugs ?? [])
    .map(s => mockArticles.find(a => a.slug === s))
    .filter(Boolean)

  // Find a related course based on category
  const relatedCourse = mockCourses.find(c => c.category === article.category && !c.prerequisiteQuestId)

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
                {relatedArticles.map(a => a && (
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
```

- [ ] **Step 2: Verify at `/blog/eur-usd-weekly-outlook`**

Check: title, author, article body, inline stock widgets, sidebar with CTA, related pairs, related article links.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/blog/ && git commit -m "feat: blog article page with sidebar and live pair widgets"
```

---

### Task 5: Login & Signup Pages

**Files:**
- Create: `src/app/(public)/login/page.tsx`
- Create: `src/app/(public)/signup/page.tsx`

- [ ] **Step 1: Implement Login page**

```tsx
// src/app/(public)/login/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input }  from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { setSession } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    // Template: set mock session and redirect
    setSession({ userId: 'u5', name: 'Alex Kowalski', level: 4 })
    // Set auth cookie (template — in prod this comes from the server)
    document.cookie = 'chartly_auth=1; path=/'
    router.push('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-900 tracking-tight mb-2">Welcome back</h1>
          <p className="text-brand-900/60 text-sm">Login to continue your trading education.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-card flex flex-col gap-5">
          <Input label="Email" id="email" type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" id="password" type="password" placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)} error={error} />
          <Button type="submit" size="lg" className="w-full mt-1">Login</Button>

          <div className="relative flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-brand-100" />
            <span className="text-xs text-brand-900/40">or continue with</span>
            <div className="flex-1 h-px bg-brand-100" />
          </div>

          {/* Social auth placeholders */}
          {['Google', 'Apple'].map(provider => (
            <button key={provider} type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-brand-200 rounded-xl text-sm font-medium text-brand-900 hover:bg-brand-50 transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-[0.98]">
              Continue with {provider}
            </button>
          ))}
        </form>

        <p className="text-center text-sm text-brand-900/50 mt-6">
          No account?{' '}
          <Link href="/signup" className="text-brand-600 font-medium hover:text-brand-700 transition-[opacity]">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement Signup page**

```tsx
// src/app/(public)/signup/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input }  from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { setSession } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setSession({ userId: 'u5', name, level: 1 })
    document.cookie = 'chartly_auth=1; path=/'
    router.push('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-900 tracking-tight mb-2">Create your account</h1>
          <p className="text-brand-900/60 text-sm">Start your trading education journey today — free.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-card flex flex-col gap-5">
          <Input label="Full name" id="name" placeholder="Alex Kowalski"
            value={name} onChange={e => setName(e.target.value)} />
          <Input label="Email" id="email" type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" id="password" type="password" placeholder="Min. 8 characters"
            value={password} onChange={e => setPassword(e.target.value)} error={error} />
          <Button type="submit" size="lg" className="w-full mt-1">Create Account</Button>

          <div className="relative flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-brand-100" />
            <span className="text-xs text-brand-900/40">or sign up with</span>
            <div className="flex-1 h-px bg-brand-100" />
          </div>

          {['Google', 'Apple'].map(provider => (
            <button key={provider} type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-brand-200 rounded-xl text-sm font-medium text-brand-900 hover:bg-brand-50 transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-[0.98]">
              Continue with {provider}
            </button>
          ))}
        </form>

        <p className="text-center text-sm text-brand-900/50 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700 transition-[opacity]">Login</Link>
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify both auth pages**

Visit `/login` and `/signup`. Check: forms render, validation shows errors, submit sets cookie and redirects to `/dashboard`.

- [ ] **Step 4: Commit**

```bash
git add src/app/(public)/login/ src/app/(public)/signup/
git commit -m "feat: login and signup pages with mock session handling"
```

---

### Task 6: Certificate View Page

**Files:**
- Create: `src/app/(public)/certificates/[id]/page.tsx`

- [ ] **Step 1: Implement certificate view**

```tsx
// src/app/(public)/certificates/[id]/page.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { mockCertificates } from '@/lib/mock-data'

export default function CertificatePage({ params }: { params: { id: string } }) {
  const cert = mockCertificates.find(c => c.id === params.id)
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!cert) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="font-display text-2xl font-bold text-brand-900 mb-2">Certificate not found</h1>
          <p className="text-brand-900/60 text-sm">This certificate ID does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const date = new Date(cert.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-surface">
      <div className="w-full max-w-lg">
        {/* Certificate card */}
        <div className="bg-white rounded-3xl shadow-brand-lg overflow-hidden border border-brand-100">
          {/* Header band */}
          <div className="h-3 bg-gradient-to-r from-brand-600 to-brand-400" />

          <div className="p-10 text-center">
            {/* Logo */}
            <p className="font-display text-xl font-bold text-brand-900 mb-8">Chartly</p>

            {/* Badge emoji */}
            <div className="text-6xl mb-4">{cert.badgeEmoji}</div>

            {/* Certificate text */}
            <p className="text-xs font-semibold text-brand-900/40 uppercase tracking-widest mb-2">Certificate of Completion</p>
            <p className="text-sm text-brand-900/60 mb-1">This certifies that</p>
            <h2 className="font-display text-3xl font-bold text-brand-900 tracking-tight mb-1">{cert.recipientName}</h2>
            <p className="text-sm text-brand-900/60 mb-1">has successfully completed</p>
            <h3 className="font-semibold text-brand-700 text-lg mb-6">{cert.questTitle}</h3>

            {/* Date */}
            <p className="text-xs text-brand-900/40 mb-8">Completed {date}</p>

            {/* Decorative divider */}
            <div className="h-px bg-brand-100 mb-8 mx-8" />

            {/* Share button */}
            <Button onClick={copyLink} variant="outline" size="md">
              {copied ? '✓ Link Copied!' : '🔗 Share Certificate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify at `/certificates/cert-1`**

Check: certificate card shows, share button copies URL. Visit `/certificates/nonexistent` — check 404 message renders.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/certificates/ && git commit -m "feat: certificate view page with share button"
```

---

### Task 7: Final Verification — Public Site

- [ ] **Step 1: Verify all routes load without errors**

Visit each in browser:
- `http://localhost:3000` — landing page
- `http://localhost:3000/blog` — blog index
- `http://localhost:3000/blog/eur-usd-weekly-outlook` — article
- `http://localhost:3000/login` — login form
- `http://localhost:3000/signup` — signup form
- `http://localhost:3000/certificates/cert-1` — certificate
- `http://localhost:3000/certificates/abc` — 404 message
- `http://localhost:3000/dashboard` (without auth cookie) — should redirect to `/login`

- [ ] **Step 2: TypeScript and build check**

```bash
npx tsc --noEmit && npm run build
```
Expected: 0 errors, build succeeds.

- [ ] **Step 3: Tag**

```bash
git tag public-pages-complete
```
