// src/app/api/prices/__tests__/route.test.ts

// Mock next/server before importing the route
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status ?? 200,
    }),
  },
}))

import { GET } from '@/app/api/prices/route'

// Mock fetch
global.fetch = jest.fn()

describe('GET /api/prices', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns price data for all pairs', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        rates: { EUR: 0.92, GBP: 0.79, JPY: 149.5, CHF: 0.88, XAU: 0.00052 },
      }),
    })
    const res = await GET()
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    data.forEach((d: { pair: string; price: number; change: number }) => {
      expect(d.pair).toBeTruthy()
      expect(typeof d.price).toBe('number')
      expect(typeof d.change).toBe('number')
    })
  })

  it('returns fallback data when fetch fails', async () => {
    ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))
    const res = await GET()
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })
})
