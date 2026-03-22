// src/app/api/mux/webhook/route.ts
// Handles Mux webhook events (asset ready, etc.)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const eventType = body.type as string

  switch (eventType) {
    case 'video.asset.ready': {
      const playbackId = body.data?.playback_ids?.[0]?.id
      const assetId = body.data?.id
      console.log(`Mux asset ready: ${assetId}, playback: ${playbackId}`)
      // TODO: Update Sanity lesson with playbackId via Sanity client
      break
    }
    case 'video.asset.errored': {
      console.error('Mux asset error:', body.data?.errors)
      break
    }
  }

  return NextResponse.json({ received: true })
}
