import { Component, type ReactNode } from 'react'
import { STORAGE_KEY } from '../store/progress'

/** Last-resort screen so a broken save never leaves a blank page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  /** Reload at the course index, in case the address itself was the problem. */
  private reload = () => {
    try {
      window.history.replaceState(null, '', '#/')
    } catch {
      // History may be locked down; a plain reload still helps.
    }
    window.location.reload()
  }

  private resetProgress = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Storage may be unavailable; reloading still helps.
    }
    this.reload()
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-xl font-semibold">Algo salió mal</h1>
        <p className="mt-2 text-muted">Recarga la página. Si el problema sigue, reinicia el progreso guardado en este navegador.</p>
        <div className="mt-6 flex gap-2">
          <button type="button" className="rounded-lg bg-accent px-4 py-2.5 font-medium text-accent-ink" onClick={this.reload}>
            Recargar
          </button>
          <button type="button" className="rounded-lg border border-line px-4 py-2.5 font-medium" onClick={this.resetProgress}>
            Reiniciar progreso
          </button>
        </div>
      </div>
    )
  }
}
