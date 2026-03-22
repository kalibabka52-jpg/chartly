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
