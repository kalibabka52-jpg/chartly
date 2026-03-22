// src/app/(platform)/profile/page.tsx
import { Avatar }          from '@/components/atoms/Avatar'
import { XPBar }           from '@/components/gamification/XPBar'
import { BadgeGrid }       from '@/components/gamification/BadgeGrid'
import { CertificateCard } from '@/components/data/CertificateCard'
import { mockUserProgress, mockBadges, mockCertificates, mockQuests } from '@/lib/mock-data'

export default function ProfilePage() {
  const progress = mockUserProgress
  const completedQuests = mockQuests.filter(q => progress.completedQuestIds.includes(q.id))

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-card flex items-center gap-6">
        <Avatar name="Alex Kowalski" size="lg" />
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-brand-900 tracking-tight mb-0.5">Alex Kowalski</h1>
          <p className="text-brand-900/50 text-sm mb-4">Member since March 2026</p>
          <div className="max-w-xs bg-brand-900 rounded-xl p-3">
            <XPBar
              current={progress.xpTotal % 500}
              max={500}
              level={progress.level}
            />
          </div>
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-brand-900">{progress.xpTotal}</p>
            <p className="text-brand-900/40 text-xs">Total XP</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-brand-900">{progress.streakDays}🔥</p>
            <p className="text-brand-900/40 text-xs">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold text-brand-900 mb-4">Badges</h2>
        <BadgeGrid badges={mockBadges} earnedIds={progress.earnedBadgeIds} />
      </div>

      {/* Quest history */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold text-brand-900 mb-4">Quest History</h2>
        {completedQuests.length === 0 ? (
          <p className="text-brand-900/50 text-sm">No completed quests yet. Keep learning!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {completedQuests.map(q => (
              <div key={q.id} className="flex items-center gap-3 py-2">
                <span className="text-xl">{q.badgeEmoji}</span>
                <div>
                  <p className="font-medium text-brand-900 text-sm">{q.title}</p>
                  <p className="text-brand-900/40 text-xs">+{q.xpBonus} XP bonus</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="font-semibold text-brand-900 mb-4">Certificates</h2>
        {mockCertificates.length === 0 ? (
          <p className="text-brand-900/50 text-sm">Complete a learning path to earn your first certificate.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {mockCertificates.map(cert => <CertificateCard key={cert.id} certificate={cert} />)}
          </div>
        )}
      </div>
    </div>
  )
}
