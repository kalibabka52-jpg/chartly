'use client'
import { useEffect, useRef, useState } from 'react'
import type { PriceData } from '@/types'
import { MiniChart } from './MiniChart'

interface StockWidgetProps {
  pair: string
  showSparkline?: boolean
  compact?: boolean
}

export function StockWidget({ pair, showSparkline = true, compact = false }: StockWidgetProps) {
  const [data, setData] = useState<PriceData | null>(null)
  const prevPriceRef = useRef<number | null>(null)
  const [flipKey, setFlipKey] = useState(0)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/prices')
        const prices: PriceData[] = await res.json()
        const found = prices.find(p => p.pair === pair)
        if (found) {
          if (prevPriceRef.current !== null && prevPriceRef.current !== found.price) {
            setFlipKey(k => k + 1)
          }
          prevPriceRef.current = found.price
          setData(found)
        }
      } catch { /* keep previous */ }
    }
    load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [pair])

  if (!data) {
    return <div className={`animate-pulse bg-brand-900/5 rounded-xl ${compact ? 'h-12' : 'h-20'}`} />
  }

  const positive = data.change >= 0

  return (
    <div className={`bg-brand-900 rounded-xl text-white ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs font-medium">{data.pair}</p>
          <p key={flipKey} className={`font-mono font-bold animate-digit-flip ${compact ? 'text-sm' : 'text-lg'}`}>
            {data.price.toLocaleString('en-US', { maximumFractionDigits: data.pair.includes('JPY') ? 2 : 4 })}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {positive ? '+' : ''}{data.change.toFixed(2)}%
          </span>
          {showSparkline && <MiniChart data={data.sparkline} positive={positive} />}
        </div>
      </div>
    </div>
  )
}
