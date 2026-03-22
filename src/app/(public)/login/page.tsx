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
    setSession({ userId: 'u5', name: 'Alex Kowalski', level: 4 })
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
