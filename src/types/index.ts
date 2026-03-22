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
