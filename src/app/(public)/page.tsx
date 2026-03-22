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

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
    </>
  )
}
