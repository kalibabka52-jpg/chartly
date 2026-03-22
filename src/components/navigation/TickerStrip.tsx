'use client'
import { useEffect, useState } from 'react'
import type { PriceData } from '@/types'

function TickerItem({ item }: { item: PriceData }) {
  const positive = item.change >= 0
  return (
    <span className="inline-flex items-center gap-2 px-6 text-xs font-mono whitespace-nowrap">
      <span className="text-white/60 font-medium">{item.pair}</span>
      <span className="text-white font-semibold">{item.price.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
      <span className={positive ? 'text-emerald-400' : 'text-red-400'}>
        {positive ? '+' : ''}{item.change.toFixed(2)}%
      </span>
    </span>
  )
}

export function TickerStrip() {
  const [prices, setPrices] = useState<PriceData[]>([])

  async function fetchPrices() {
    try {
      const res = await fetch('/api/prices')
      if (res.ok) setPrices(await res.json())
    } catch { /* keep previous */ }
  }

  useEffect(() => {
    fetchPrices()
    const id = setInterval(fetchPrices, 30_000)
    return () => clearInterval(id)
  }, [])

  if (!prices.length) return <div className="h-8 bg-brand-900" />

  const doubled = [...prices, ...prices]

  return (
    <div className="h-8 bg-brand-900 overflow-hidden flex items-center" onMouseEnter={e => (e.currentTarget.firstElementChild as HTMLElement).style.animationPlayState = 'paused'} onMouseLeave={e => (e.currentTarget.firstElementChild as HTMLElement).style.animationPlayState = 'running'}>
      <div className="flex animate-marquee">
        {doubled.map((item, i) => <TickerItem key={i} item={item} />)}
      </div>
    </div>
  )
}
