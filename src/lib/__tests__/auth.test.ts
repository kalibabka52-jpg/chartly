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
