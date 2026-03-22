'use client'
import { useState } from 'react'

interface VideoPlayerProps {
  xpReward: number
  onComplete?: () => void
}

export function VideoPlayer({ xpReward, onComplete }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  function togglePlay() { setPlaying(p => !p) }

  function handleScrub(e: React.ChangeEvent<HTMLInputElement>) {
    setProgress(Number(e.target.value))
  }

  return (
    <div className="relative bg-brand-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
      {/* Placeholder frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-800" />
      <img src="https://placehold.co/1280x720/1e1b4b/a78bfa?text=Video+Lesson" alt="Video lesson" className="absolute inset-0 w-full h-full object-cover opacity-40" />

      {/* XP badge */}
      <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        +{xpReward} XP
      </div>

      {/* Play/pause */}
      <button onClick={togglePlay}
        className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition-[background] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
        {playing ? '⏸' : '▶️'}
      </button>

      {/* Scrubber */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
        <input type="range" min={0} max={100} value={progress} onChange={handleScrub}
          className="w-full h-1 accent-brand-400 cursor-pointer" />
      </div>
    </div>
  )
}
