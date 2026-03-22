// src/app/layout.tsx
import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Chartly — Learn to Trade',
  description: 'Structured trading courses with live market data and gamified learning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-body bg-surface text-brand-900 antialiased">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
