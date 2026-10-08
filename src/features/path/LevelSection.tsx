import { ChevronDown, Lock, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { ProgressBar } from '../../components/ProgressBar'
import type { Level } from '../../content/types'
import type { NodeStatus, PathNode } from '../../engine/path'
import { cn } from '../../lib/cn'
import { useProgress } from '../../store/progress'
import { PathNodeButton } from './PathNodeButton'

// Gentle zigzag, in pixels.
const OFFSETS = [0, 44, 72, 44, 0, -44, -72, -44]

interface LevelSectionProps {
  level: Level
  nodes: PathNode[]
  statuses: Record<string, NodeStatus>
  currentId: string | null
}

export function LevelSection({ level, nodes, statuses, currentId }: LevelSectionProps) {
  const completed = useProgress((s) => s.completed)
  const doneCount = nodes.filter((n) => statuses[n.id] === 'completed').length
  const locked = statuses[nodes[0].id] === 'locked'
  const finished = doneCount === nodes.length
  const [open, setOpen] = useState(!finished)
  const headingId = `level-${level.id}-title`

  return (
    <section data-accent={level.color} aria-label={`Nivel ${level.id}: ${level.title}`} className="scroll-mt-20">
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl p-5 shadow-sm',
          locked ? 'border-2 border-dashed border-line bg-surface text-muted' : 'bg-accent text-white shadow-[0_6px_0_0_var(--accent-strong)]',
        )}
      >
        {!locked && <div className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-white/15" />}
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={cn('text-xs font-extrabold uppercase tracking-widest', locked ? 'text-muted' : 'text-white/80')}>
              Nivel {level.id} · {level.cefr}
            </p>
            <h2 id={headingId} className={cn('mt-1 text-2xl font-black leading-tight', locked && 'text-ink/70')}>
              {level.title}
            </h2>
            <p className={cn('mt-1 text-sm font-semibold', locked ? 'text-muted' : 'text-white/85')}>{level.subtitle}</p>
          </div>
          <span className={cn('text-5xl leading-none', locked && 'opacity-40 grayscale')} aria-hidden>
            {locked ? '🔒' : level.emoji}
          </span>
        </div>
        {locked ? (
          <p className="relative mt-4 flex items-center gap-2 text-sm font-bold">
            <Lock className="h-4 w-4" /> Aprueba el examen del Nivel {level.id - 1} para desbloquear
          </p>
        ) : (
          <div className="relative mt-4 flex items-center gap-3">
            <ProgressBar value={doneCount / nodes.length} className="h-3" trackClassName="bg-black/15" barClassName="bg-white" label={`Progreso del nivel ${level.id}`} />
            <span className="shrink-0 text-sm font-extrabold">
              {doneCount}/{nodes.length}
            </span>
          </div>
        )}
        {finished && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="relative mt-4 flex w-full items-center justify-between rounded-2xl bg-white/15 px-4 py-2 text-sm font-extrabold hover:bg-white/25"
          >
            <span className="flex items-center gap-2">
              <PartyPopper className="h-4 w-4" /> Nivel completado
            </span>
            <span className="flex items-center gap-1">
              {open ? 'Ocultar ruta' : 'Ver ruta'}
              <ChevronDown className={cn('h-4 w-4 transition', open && 'rotate-180')} />
            </span>
          </button>
        )}
      </div>

      {!locked && open && (
        <ol className="mt-16 mb-6 flex flex-col items-center gap-12">
          {nodes.map((node, i) => {
            const milestone = node.kind === 'review20' || node.kind === 'exam50'
            const first = node.itemIds[0] ? level.items.findIndex((it) => it.id === node.itemIds[0]) + 1 : 1
            return (
              <li key={node.id} className="flex w-full flex-col items-center">
                {milestone && (
                  <div className="mb-8 flex w-full items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-muted">
                    <span className="h-0.5 flex-1 rounded bg-line" />
                    {node.kind === 'review20'
                      ? `🎯 Repaso · palabras ${first}–${first + node.itemIds.length - 1}`
                      : '🏆 Examen final · 50 palabras'}
                    <span className="h-0.5 flex-1 rounded bg-line" />
                  </div>
                )}
                <PathNodeButton
                  node={node}
                  status={statuses[node.id]}
                  stars={completed[node.id]?.stars ?? 0}
                  emoji={level.lessons[node.lessonIndex].emoji}
                  offset={milestone ? 0 : OFFSETS[i % OFFSETS.length]}
                  isCurrent={node.id === currentId}
                />
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
