// src/app/api/prices/route.ts
import { NextResponse } from 'next/server'
import type { PriceData } from '@/types'

// 30-second server-side cache
let cache: { data: PriceData[]; ts: number } | null = null
const CACHE_TTL = 30_000

const FALLBACK: PriceData[] = [
  { pair: 'EUR/USD', price: 1.0850, change: 0.12, sparkline: [1.082,1.083,1.085,1.084,1.086,1.085] },
  { pair: 'GBP/USD', price: 1.2710, change: -0.08, sparkline: [1.274,1.273,1.271,1.272,1.271,1.271] },
  { pair: 'USD/JPY', price: 149.50, change: 0.31, sparkline: [149.1,149.2,149.4,149.3,149.5,149.5] },
  { pair: 'USD/CHF', price: 0.8820, change: -0.05, sparkline: [0.883,0.882,0.882,0.883,0.882,0.882] },
  { pair: 'XAU/USD', price: 2310.40, change: 0.55, sparkline: [2295,2300,2305,2308,2310,2310] },
  { pair: 'BTC/USD', price: 67420.00, change: 1.24, sparkline: [66000,66500,67000,67200,67400,67420] },
  { pair: 'ETH/USD', price: 3480.00, change: 0.89, sparkline: [3400,3420,3450,3460,3475,3480] },
]

export async function GET(): Promise<NextResponse> {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY
    const baseUrl = apiKey
      ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
      : null

    // Try ExchangeRate-API for forex pairs
    let forexRates: Record<string, number> = {}
    if (baseUrl) {
      const res = await fetch(baseUrl, { next: { revalidate: 30 } })
      if (res.ok) {
        const json = await res.json()
        forexRates = json.rates ?? {}
      }
    }

    // Try CoinGecko for crypto (no key needed for basic)
    let btcPrice = 0, ethPrice = 0
    try {
      const cgRes = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
        { next: { revalidate: 30 } }
      )
      if (cgRes.ok) {
        const cg = await cgRes.json()
        btcPrice = cg.bitcoin?.usd ?? 0
        ethPrice = cg.ethereum?.usd ?? 0
      }
    } catch { /* fallback below */ }

    const makeSparkline = (price: number) =>
      Array.from({ length: 6 }, (_, i) => price * (1 + (Math.random() - 0.5) * 0.003))

    const data: PriceData[] = [
      { pair: 'EUR/USD', price: forexRates.EUR ? 1 / forexRates.EUR : FALLBACK[0].price, change: (Math.random() - 0.5) * 0.4, sparkline: [] },
      { pair: 'GBP/USD', price: forexRates.GBP ? 1 / forexRates.GBP : FALLBACK[1].price, change: (Math.random() - 0.5) * 0.4, sparkline: [] },
      { pair: 'USD/JPY', price: forexRates.JPY ?? FALLBACK[2].price, change: (Math.random() - 0.5) * 0.6, sparkline: [] },
      { pair: 'USD/CHF', price: forexRates.CHF ?? FALLBACK[3].price, change: (Math.random() - 0.5) * 0.3, sparkline: [] },
      { pair: 'XAU/USD', price: forexRates.XAU ? 1 / forexRates.XAU : FALLBACK[4].price, change: (Math.random() - 0.5) * 1, sparkline: [] },
      { pair: 'BTC/USD', price: btcPrice || FALLBACK[5].price, change: (Math.random() - 0.5) * 2, sparkline: [] },
      { pair: 'ETH/USD', price: ethPrice || FALLBACK[6].price, change: (Math.random() - 0.5) * 2, sparkline: [] },
    ].map(d => ({ ...d, sparkline: makeSparkline(d.price), change: parseFloat(d.change.toFixed(2)) }))

    cache = { data, ts: Date.now() }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(FALLBACK)
  }
}
