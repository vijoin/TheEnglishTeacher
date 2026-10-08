import { BookOpenText, GraduationCap, Map, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { navigate, type Route } from '../../lib/router'
import { StatsBar } from './StatsBar'

const NAV = [
  { name: 'home', path: '/', label: 'Aprender', icon: Map },
  { name: 'vocab', path: '/vocab', label: 'Vocabulario', icon: BookOpenText },
  { name: 'profile', path: '/profile', label: 'Perfil', icon: UserRound },
] as const

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#/" className="flex items-center gap-2" aria-label="The English Teacher, inicio">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-violet-500 text-white shadow-[0_3px_0_0_var(--brand-strong)]">
        <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className={cn('font-black leading-none tracking-tight', compact ? 'text-base' : 'text-lg')}>
        The English
        <br />
        <span className="text-brand">Teacher</span>
      </span>
    </a>
  )
}

export function AppShell({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <div className="min-h-dvh md:pl-64">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-8 border-r border-line bg-surface px-4 py-6 md:flex">
        <div className="px-2">
          <Logo />
        </div>
        <nav aria-label="Principal" className="flex flex-col gap-1">
          {NAV.map(({ name, path, label, icon: Icon }) => {
            const active = route.name === name
            return (
              <button
                key={name}
                type="button"
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-extrabold uppercase tracking-wide transition',
                  active ? 'border-brand/40 bg-brand/10 text-brand' : 'border-transparent text-muted hover:bg-surface-2 hover:text-ink',
                )}
              >
                <Icon className="h-6 w-6" strokeWidth={2.5} />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-3xl border border-line bg-bg p-3">
          <StatsBar vertical />
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/95 px-4 py-2 backdrop-blur-md md:hidden">
        <Logo compact />
        <StatsBar />
      </header>

      <main>{children}</main>

      <nav
        aria-label="Principal"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        {NAV.map(({ name, path, label, icon: Icon }) => {
          const active = route.name === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => navigate(path)}
              aria-current={active ? 'page' : undefined}
              className={cn('flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-extrabold uppercase', active ? 'text-brand' : 'text-muted')}
            >
              <span className={cn('grid h-9 w-14 place-items-center rounded-2xl transition', active && 'bg-brand/12')}>
                <Icon className="h-6 w-6" strokeWidth={2.5} />
              </span>
              {label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
