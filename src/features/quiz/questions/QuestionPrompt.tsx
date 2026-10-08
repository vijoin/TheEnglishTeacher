import type { ReactNode } from 'react'

export function QuestionPrompt({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-extrabold uppercase tracking-wider text-accent-strong dark:text-accent-ink">{label}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}
