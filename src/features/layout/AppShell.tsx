import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { navigate, type Route } from '../../lib/router'

const NAV = [
  { name: 'home', path: '/', label: 'Curso' },
  { name: 'vocab', path: '/vocab', label: 'Vocabulario' },
  { name: 'settings', path: '/settings', label: 'Ajustes' },
] as const

export function AppShell({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3">
          <a href="#/" onClick={(e) => (e.preventDefault(), navigate('/'))} className="flex items-baseline gap-2" aria-label="The English Teacher, inicio">
            <span className="text-lg font-semibold tracking-tight">The English Teacher</span>
          </a>
          <nav aria-label="Principal" className="-mx-2 flex">
            {NAV.map(({ name, path, label }) => {
              const active = route.name === name
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => navigate(path)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-2.5 py-1.5 text-sm font-medium transition',
                    active ? 'text-accent underline decoration-2 underline-offset-[6px]' : 'text-muted hover:text-ink',
                  )}
                >
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16">{children}</main>
    </div>
  )
}
