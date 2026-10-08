import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { ProgressBar } from '../../components/ProgressBar'

interface PlayerHeaderProps {
  title: string
  progress: number
  onClose: () => void
  right?: ReactNode
}

export function PlayerHeader({ title, progress, onClose, right }: PlayerHeaderProps) {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 pt-3 pb-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Salir"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="min-w-0 flex-1 truncate text-sm font-medium">{title}</p>
        {right && <span className="shrink-0 text-sm text-muted tabular-nums">{right}</span>}
      </div>
      <div className="mx-auto w-full max-w-2xl px-4 pb-3">
        <ProgressBar value={progress} label="Progreso" />
      </div>
    </header>
  )
}

/** Full-screen frame shared by study and quiz screens. */
export function PlayerFrame({ children }: { children: ReactNode }) {
  return <div className="flex min-h-dvh flex-col bg-bg">{children}</div>
}

/** Bottom action bar for study and quiz screens. */
export function PlayerFooter({ children }: { children: ReactNode }) {
  return (
    <footer className="sticky bottom-0 border-t border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl justify-end gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">{children}</div>
    </footer>
  )
}
