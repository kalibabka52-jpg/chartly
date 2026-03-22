// src/app/(public)/login/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full max-w-sm',
            card: 'bg-white rounded-2xl shadow-card',
          },
        }}
      />
    </div>
  )
}
