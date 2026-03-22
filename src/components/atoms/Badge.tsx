// src/components/atoms/Badge.tsx
import type { Category } from '@/types'

type TagProps  = { variant: 'tag'; category?: Category; children: React.ReactNode; className?: string }
type IconProps = { variant: 'icon'; emoji: string; label?: string; locked?: boolean; className?: string }
type BadgeProps = TagProps | IconProps

const categoryColors: Record<Category, string> = {
  forex:      'bg-brand-100 text-brand-700',
  crypto:     'bg-pink-100 text-pink-700',
  psychology: 'bg-teal-100 text-teal-700',
  basics:     'bg-teal-100 text-teal-700',
}

export function Badge(props: BadgeProps) {
  if (props.variant === 'tag') {
    const color = props.category ? categoryColors[props.category] : 'bg-brand-100 text-brand-700'
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color} ${props.className ?? ''}`}>
        {props.children}
      </span>
    )
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${props.className ?? ''}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-card ${props.locked ? 'grayscale opacity-40' : 'bg-white'}`}>
        {props.emoji}
      </div>
      {props.label && (
        <span className={`text-xs font-medium text-center ${props.locked ? 'text-brand-900/40' : 'text-brand-900'}`}>
          {props.label}
        </span>
      )}
    </div>
  )
}
