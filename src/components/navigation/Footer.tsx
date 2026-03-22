import Link from 'next/link'

const links = [
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Login', href: '/login' },
]

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display font-bold text-white text-lg">Chartly</span>
          <nav className="flex gap-6 text-sm">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-[opacity]">{l.label}</Link>
            ))}
          </nav>
          <p className="text-xs">© 2026 Chartly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
