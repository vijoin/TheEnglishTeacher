import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { ProgressBar } from '../../components/ProgressBar'

interface PlayerHeaderProps {
  progress: number
  onClose: () => void
  right?: ReactNode
}

export function PlayerHeader({ progress, onClose, right }: PlayerHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-4 px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Salir"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-6 w-6" strokeWidth={3} />
        </button>
        <ProgressBar value={progress} label="Progreso" />
        {right}
      </div>
    </header>
  )
}

/** Full-screen frame shared by lessons and quizzes. */
export function PlayerFrame({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <div data-accent={accent} className="flex min-h-dvh flex-col bg-bg">
      {children}
    </div>
  )
}
