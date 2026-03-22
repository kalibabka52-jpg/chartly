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
