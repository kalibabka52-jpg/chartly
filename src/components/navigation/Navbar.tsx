'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/atoms/Button'

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/#pricing', label: 'Pricing' },
]

export function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl text-brand-900 tracking-tight">
          Chartly
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium transition-[opacity] hover:text-brand-600 ${pathname.startsWith(link.href.split('#')[0]) ? 'text-brand-600' : 'text-brand-900/70'}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-brand-900/70 hover:text-brand-600 transition-[opacity]">
            Login
          </Link>
          <Link href="/signup">
            <Button size="sm">Start Free</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
