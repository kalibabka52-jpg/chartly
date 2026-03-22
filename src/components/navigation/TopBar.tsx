'use client'
import { Avatar } from '@/components/atoms/Avatar'
import { Input } from '@/components/atoms/Input'

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-brand-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="w-64 max-w-sm">
        <Input label="" id="search" placeholder="Search courses..." className="py-2" />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-brand-900/60 hover:text-brand-900 transition-[opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg p-1"
          aria-label="Notifications">
          🔔
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-brand-600 rounded-full" />
        </button>
        <Avatar name="Alex Kowalski" size="sm" />
      </div>
    </header>
  )
}
