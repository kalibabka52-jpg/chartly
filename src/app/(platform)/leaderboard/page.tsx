// src/app/(platform)/leaderboard/page.tsx
'use client'
import { useState } from 'react'
import { Avatar }   from '@/components/atoms/Avatar'
import { mockLeaderboard } from '@/lib/mock-data'

type Period = 'weekly' | 'monthly'

const CURRENT_USER_ID = 'u5'

const RANK_STYLES: Record<number, string> = {
  1: 'bg-yellow-50 border-yellow-200',
  2: 'bg-gray-50 border-gray-200',
  3: 'bg-orange-50 border-orange-200',
}
const RANK_EMOJI: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('weekly')
  const entries    = mockLeaderboard
  const isInTop    = entries.some(e => e.user.id === CURRENT_USER_ID)
  const userEntry  = entries.find(e => e.user.id === CURRENT_USER_ID)

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-900 tracking-tight">Leaderboard</h1>
        <div className="flex bg-brand-50 p-1 rounded-xl">
          {(['weekly', 'monthly'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                ${period === p ? 'bg-white text-brand-900 shadow-card' : 'text-brand-900/60 hover:text-brand-900'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map(entry => {
          const isCurrentUser = entry.user.id === CURRENT_USER_ID
          const rankStyle = RANK_STYLES[entry.rank] ?? 'bg-white border-brand-100'
          return (
            <div key={entry.user.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border ${rankStyle} ${isCurrentUser ? 'ring-2 ring-brand-600' : ''}`}>
              <div className="w-8 text-center">
                {RANK_EMOJI[entry.rank] ?? <span className="font-mono text-sm text-brand-900/50">#{entry.rank}</span>}
              </div>
              <Avatar name={entry.user.name} src={entry.user.avatarUrl} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-brand-900 text-sm">
                  {entry.user.name}{isCurrentUser && <span className="ml-2 text-xs text-brand-600 font-medium">(you)</span>}
                </p>
                <p className="text-brand-900/40 text-xs">{entry.completedQuestCount} quests completed</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-900">{entry.xpTotal.toLocaleString()}</p>
                <p className="text-brand-900/40 text-xs">XP</p>
              </div>
            </div>
          )
        })}

        {/* Pinned current user row if not in visible list */}
        {!isInTop && userEntry && (
          <>
            <div className="flex items-center gap-2 text-xs text-brand-900/40 px-4">
              <div className="flex-1 border-t border-dashed border-brand-200" />
              <span>···</span>
              <div className="flex-1 border-t border-dashed border-brand-200" />
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-brand-100 bg-brand-50 ring-2 ring-brand-600">
              <div className="w-8 text-center">
                <span className="font-mono text-sm text-brand-900/50">#{userEntry.rank}</span>
              </div>
              <Avatar name={userEntry.user.name} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-brand-900 text-sm">{userEntry.user.name} <span className="text-xs text-brand-600 font-medium">(you)</span></p>
                <p className="text-brand-900/40 text-xs">{userEntry.completedQuestCount} quests completed</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-900">{userEntry.xpTotal.toLocaleString()}</p>
                <p className="text-brand-900/40 text-xs">XP</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
