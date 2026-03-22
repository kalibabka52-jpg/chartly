'use client'
import { useState } from 'react'

interface Note { id: string; timestamp: string; text: string }

const DEMO_NOTES: Note[] = [
  { id: 'n1', timestamp: '02:14', text: 'Currency pairs always quoted as base/quote — EUR/USD means 1 EUR = X USD.' },
  { id: 'n2', timestamp: '05:48', text: 'Spread = difference between bid and ask price. Tighter spread = lower cost to trade.' },
]

export function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>(DEMO_NOTES)
  const [draft, setDraft] = useState('')

  function addNote() {
    if (!draft.trim()) return
    setNotes(prev => [...prev, { id: Date.now().toString(), timestamp: '—', text: draft.trim() }])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {notes.map(note => (
          <div key={note.id} className="bg-brand-50 rounded-xl p-3">
            <span className="text-xs font-mono text-brand-600 mr-2">{note.timestamp}</span>
            <span className="text-sm text-brand-900">{note.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addNote()}
          placeholder="Add a note…"
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
        <button onClick={addNote}
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-95">
          Add
        </button>
      </div>
    </div>
  )
}
