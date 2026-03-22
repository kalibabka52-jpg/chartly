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
