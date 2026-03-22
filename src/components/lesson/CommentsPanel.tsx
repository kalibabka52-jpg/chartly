'use client'
import { useState } from 'react'
import { Avatar } from '@/components/atoms/Avatar'

interface Comment { id: string; author: string; text: string; upvotes: number; replies: Comment[] }

const DEMO: Comment[] = [
  { id: 'c1', author: 'Sophie M.', text: 'The bit about bid/ask spread was really clear. Finally understand why brokers charge differently.', upvotes: 12, replies: [
    { id: 'c1r1', author: 'Maria Kovač', text: 'Glad it clicked! Spread comparison is key when choosing a broker for scalping.', upvotes: 5, replies: [] },
  ]},
  { id: 'c2', author: 'Luca B.', text: 'Can you clarify the difference between interbank rates and retail rates?', upvotes: 4, replies: [] },
]

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes)
  return (
    <div className={`flex gap-3 ${depth > 0 ? 'ml-8 mt-3' : ''}`}>
      <Avatar name={comment.author} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-semibold text-brand-900 mb-0.5">{comment.author}</p>
        <p className="text-sm text-brand-900/80 leading-relaxed">{comment.text}</p>
        <button onClick={() => setUpvotes(v => v + 1)}
          className="mt-1 text-xs text-brand-900/40 hover:text-brand-600 transition-[color] focus-visible:outline-none">
          ▲ {upvotes}
        </button>
        {comment.replies.map(r => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}
      </div>
    </div>
  )
}

export function CommentsPanel() {
  const [comments, setComments] = useState<Comment[]>(DEMO)
  const [draft, setDraft] = useState('')

  function addComment() {
    if (!draft.trim()) return
    setComments(prev => [...prev, { id: Date.now().toString(), author: 'Alex Kowalski', text: draft.trim(), upvotes: 0, replies: [] }])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {comments.map(c => <CommentItem key={c.id} comment={c} />)}
      </div>
      <div className="flex gap-2 pt-2 border-t border-brand-100">
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addComment()}
          placeholder="Add a comment…"
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
        <button onClick={addComment}
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-95">
          Post
        </button>
      </div>
    </div>
  )
}
