import Link from 'next/link'
import type { Certificate } from '@/types'

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const date = new Date(certificate.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className="bg-white border border-brand-100 rounded-2xl p-5 flex items-center justify-between shadow-card">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl">
          {certificate.badgeEmoji}
        </div>
        <div>
          <p className="font-semibold text-brand-900 text-sm">{certificate.questTitle}</p>
          <p className="text-brand-900/50 text-xs">{date}</p>
        </div>
      </div>
      <Link href={`/certificates/${certificate.id}`}
        className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-[opacity]">
        View →
      </Link>
    </div>
  )
}
