// src/app/(public)/certificates/[id]/page.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { mockCertificates } from '@/lib/mock-data'

export default function CertificatePage({ params }: { params: { id: string } }) {
  const cert = mockCertificates.find(c => c.id === params.id)
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!cert) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="font-display text-2xl font-bold text-brand-900 mb-2">Certificate not found</h1>
          <p className="text-brand-900/60 text-sm">This certificate ID does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const date = new Date(cert.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-surface">
      <div className="w-full max-w-lg">
        {/* Certificate card */}
        <div className="bg-white rounded-3xl shadow-brand-lg overflow-hidden border border-brand-100">
          {/* Header band */}
          <div className="h-3 bg-gradient-to-r from-brand-600 to-brand-400" />

          <div className="p-10 text-center">
            {/* Logo */}
            <p className="font-display text-xl font-bold text-brand-900 mb-8">Chartly</p>

            {/* Badge emoji */}
            <div className="text-6xl mb-4">{cert.badgeEmoji}</div>

            {/* Certificate text */}
            <p className="text-xs font-semibold text-brand-900/40 uppercase tracking-widest mb-2">Certificate of Completion</p>
            <p className="text-sm text-brand-900/60 mb-1">This certifies that</p>
            <h2 className="font-display text-3xl font-bold text-brand-900 tracking-tight mb-1">{cert.recipientName}</h2>
            <p className="text-sm text-brand-900/60 mb-1">has successfully completed</p>
            <h3 className="font-semibold text-brand-700 text-lg mb-6">{cert.questTitle}</h3>

            {/* Date */}
            <p className="text-xs text-brand-900/40 mb-8">Completed {date}</p>

            {/* Decorative divider */}
            <div className="h-px bg-brand-100 mb-8 mx-8" />

            {/* Share button */}
            <Button onClick={copyLink} variant="outline" size="md">
              {copied ? '✓ Link Copied!' : '🔗 Share Certificate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
