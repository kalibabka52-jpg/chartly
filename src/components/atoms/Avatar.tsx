// src/components/atoms/Avatar.tsx
interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' }

function initials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const sz = sizes[size]
  if (src) {
    return <img src={src} alt={name} className={`${sz} rounded-full object-cover ring-2 ring-white ${className}`} />
  }
  return (
    <div className={`${sz} rounded-full bg-brand-600 text-white font-semibold flex items-center justify-center ring-2 ring-white ${className}`}>
      {initials(name)}
    </div>
  )
}
