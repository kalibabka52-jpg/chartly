'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar } from '@/components/atoms/Avatar'
import { XPBar } from '@/components/gamification/XPBar'
import { StreakCounter } from '@/components/gamification/StreakCounter'
import { mockUserProgress } from '@/lib/mock-data'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/courses',   label: 'Courses',   icon: '📚' },
  { href: '/profile',   label: 'Profile',   icon: '👤' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
]

export function Sidebar() {
  const pathname = usePathname()
  const progress = mockUserProgress

  return (
    <aside className="w-64 min-h-screen bg-brand-900 flex flex-col fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/dashboard" className="font-display font-bold text-white text-xl tracking-tight">Chartly</Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navLinks.map(link => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link key={link.href} href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-[background,opacity] ${active ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: XP bar + streak + user */}
      <div className="px-4 py-4 border-t border-white/10 flex flex-col gap-3">
        <StreakCounter days={progress.streakDays} />
        <XPBar current={progress.xpTotal % 500} max={500} level={progress.level} />
        <div className="flex items-center gap-3 mt-1">
          <Avatar name="Alex Kowalski" size="sm" />
          <div>
            <p className="text-white text-xs font-semibold">Alex Kowalski</p>
            <p className="text-white/50 text-xs">Level {progress.level}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
