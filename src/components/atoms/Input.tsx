// src/components/atoms/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
}

export function Input({ label, id, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-brand-900">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-brand-900 placeholder-brand-900/40 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-[box-shadow] ${error ? 'border-red-400 bg-red-50' : 'border-brand-200 bg-white'} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
