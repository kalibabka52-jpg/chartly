'use client'
import { useState, useEffect } from 'react'
import type { Session } from '@/types'

const SESSION_KEY = 'chartly_session'

export function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function useSession(): Session | null {
  const [session, setSession_] = useState<Session | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      setSession_(raw ? JSON.parse(raw) : null)
    } catch {
      setSession_(null)
    }
  }, [])

  return session
}

// For use in middleware (server-side) — reads from cookie instead
// In this template, middleware checks for 'chartly_auth' cookie set at login
export const MOCK_SESSION: Session = { userId: 'u5', name: 'Alex Kowalski', level: 4 }
