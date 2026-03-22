'use client'
import { useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'

interface VideoPlayerProps {
  xpReward: number
  onComplete?: () => void
  playbackId?: string
}

export function VideoPlayer({ xpReward, onComplete, playbackId }: VideoPlayerProps) {
  const [completed, setCompleted] = useState(false)

  function handleEnded() {
    if (!completed) {
      setCompleted(true)
      onComplete?.()
    }
  }

  // If we have a Mux playback ID, use Mux Player
  if (playbackId) {
    return (
      <div className="relative rounded-2xl overflow-hidden aspect-video">
        <MuxPlayer
          playbackId={playbackId}
          accentColor="#7c3aed"
          metadata={{
            video_title: 'Lesson Video',
          }}
          onEnded={handleEnded}
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          +{xpReward} XP
        </div>
      </div>
    )
  }

  // Fallback: placeholder player
  return (
    <FallbackPlayer xpReward={xpReward} />
  )
}

function FallbackPlayer({ xpReward }: { xpReward: number }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className="relative bg-brand-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-800" />
      <img src="https://placehold.co/1280x720/1e1b4b/a78bfa?text=Video+Lesson" alt="Video lesson" className="absolute inset-0 w-full h-full object-cover opacity-40" />

      <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        +{xpReward} XP
      </div>

      <button onClick={() => setPlaying(p => !p)}
        className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition-[background] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
        {playing ? '⏸' : '▶️'}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
        <input type="range" min={0} max={100} value={progress} onChange={e => setProgress(Number(e.target.value))}
          className="w-full h-1 accent-brand-400 cursor-pointer" />
      </div>
    </div>
  )
}
