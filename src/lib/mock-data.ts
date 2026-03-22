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
