// src/app/(public)/page.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { CourseCard } from '@/components/cards/CourseCard'
import { mockCourses, mockUserProgress } from '@/lib/mock-data'

const TRUST_PILLS = ['40+ Courses', 'Live Market Data', 'Certificates']
const STATS = [
  { value: '12,400+', label: 'Students' },
  { value: '40+',     label: 'Courses' },
  { value: '4.9★',    label: 'Rating' },
  { value: '98%',     label: 'Completion' },
]

const FEATURES = [
  { icon: '🗺️', title: 'Structured Paths', body: 'Follow curated learning paths from beginner to advanced. No guesswork — just a clear roadmap to trading confidence.' },
  { icon: '📡', title: 'Live Market Data', body: 'Every lesson is backed by real forex and crypto prices, updated every 30 seconds. Learn with the market, not after it.' },
  { icon: '🏆', title: 'Earn as You Learn', body: 'Complete lessons to earn XP. Finish quests to unlock badges. Build a portfolio of verified trading knowledge.' },
]

const PLANS = [
  {
    name: 'Monthly',
    price: '$29',
    per: '/mo',
    highlight: false,
    badge: undefined as string | undefined,
    features: ['All 40+ courses', 'Live market data', 'Quests & badges', 'Certificates'],
  },
  {
    name: 'Annual',
    price: '$19',
    per: '/mo',
    highlight: true,
    badge: 'Best Value — Save 34%' as string | undefined,
    features: ['All 40+ courses', 'Live market data', 'Quests & badges', 'Certificates', 'Priority support'],
  },
]

const TESTIMONIALS = [
  { quote: "I went from knowing nothing about forex to placing my first live trade in 6 weeks. The quest system kept me accountable.", name: "Sophie M.", title: "Student · London" },
  { quote: "The live data integration is what sets Chartly apart. I was learning with real EUR/USD prices, not stale examples.", name: "Luca B.", title: "Student · Milan" },
  { quote: "Finally a trading course that explains the psychology. I stopped revenge trading after the mindset module.", name: "Anna K.", title: "Student · Warsaw" },
]

function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pt-20 pb-24">
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

function CoursesPreview() {
  const preview = mockCourses.filter(c => !c.prerequisiteQuestId).slice(0, 3)
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
              <p className="text-brand-900/70 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
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
