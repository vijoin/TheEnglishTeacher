import { ArrowRight, Check, Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { ProgressBar } from '../../components/ProgressBar'
import type { Level } from '../../content/types'
import { currentNodeId, type NodeStatus, type PathNode } from '../../engine/path'
import { QUIZ_SIZE } from '../../engine/quiz'
import { cn } from '../../lib/cn'
import { navigate } from '../../lib/router'
import { useProgress } from '../../store/progress'
import { COURSE, COURSE_PATH, getItem, getLevel, getNode, nodeLabel } from '../course'
import { useStepStatuses } from '../hooks'

function stepMeta(node: PathNode, level: Level): string {
  if (node.kind === 'lesson') {
    const words = node.itemIds.map((id) => getItem(id)?.en).filter(Boolean)
    return `5 palabras: ${words.slice(0, 3).join(', ')}…`
  }
  const q = `${QUIZ_SIZE[node.kind]} preguntas`
  if (node.kind === 'exam50') return level.id < COURSE.length ? `${q} · desbloquea el nivel ${level.id + 1}` : q
  return q
}

function StepRow({ node, level, status, isNext }: { node: PathNode; level: Level; status: NodeStatus; isNext: boolean }) {
  const locked = status === 'locked'
  const isLesson = node.kind === 'lesson'
  return (
    <li>
      <button
        type="button"
        disabled={locked}
        onClick={() => navigate(`/play/${node.id}`)}
        aria-label={`${nodeLabel(node)} — ${locked ? 'bloqueado' : status === 'completed' ? 'hecho' : 'disponible'}`}
        className={cn(
          'flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition',
          !locked && 'hover:bg-surface-2',
          isNext && 'bg-accent-soft hover:bg-accent-soft',
          !isLesson && 'pl-10',
        )}
      >
        <span
          className={cn(
            'grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold',
            status === 'completed' && 'border-ok bg-ok text-surface',
            isNext && 'border-accent text-accent',
            locked && 'border-line text-muted',
          )}
          aria-hidden
        >
          {status === 'completed' ? <Check className="h-4 w-4" strokeWidth={3} /> : locked ? <Lock className="h-3.5 w-3.5" /> : isLesson ? node.lessonIndex + 1 : ''}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn('block font-medium', locked && 'text-muted', !isLesson && 'text-[15px]')}>
            {isLesson ? node.title : nodeLabel(node)}
          </span>
          <span className="block truncate text-sm text-muted">{stepMeta(node, level)}</span>
        </span>
        {isNext && <span className="shrink-0 text-sm font-medium text-accent">Siguiente</span>}
      </button>
    </li>
  )
}

export function HomeScreen() {
  const completed = useProgress((s) => s.completed)
  const statuses = useStepStatuses()
  const nextId = useMemo(() => currentNodeId(COURSE_PATH, completed), [completed])
  const next = nextId ? getNode(nextId) : undefined
  const [levelId, setLevelId] = useState(next?.levelId ?? COURSE.length)
  const level = getLevel(levelId)!
  const steps = COURSE_PATH.filter((n) => n.levelId === levelId)
  const done = steps.filter((n) => statuses[n.id] === 'completed').length
  const levelLocked = statuses[steps[0].id] === 'locked'
  const started = Object.keys(completed).length > 0

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="next-title" className="rounded-xl border border-line bg-surface p-5">
        {next ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p id="next-title" className="text-sm text-muted">
                {started ? 'Continúa donde lo dejaste' : 'Empieza por aquí'} · Nivel {next.levelId}
              </p>
              <p className="mt-0.5 text-lg font-semibold">{nodeLabel(next)}</p>
            </div>
            <Button size="lg" onClick={() => navigate(`/play/${next.id}`)}>
              {started ? 'Continuar' : 'Empezar'} <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <p id="next-title" className="text-lg font-semibold">
            Completaste todo el curso. Puedes repasar cualquier lección cuando quieras.
          </p>
        )}
      </section>

      <section aria-labelledby="levels-title">
        <h2 id="levels-title" className="text-sm font-medium text-muted">
          Niveles
        </h2>
        <div role="group" aria-label="Niveles" className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {COURSE.map((l) => {
            const levelSteps = COURSE_PATH.filter((n) => n.levelId === l.id)
            const locked = statuses[levelSteps[0].id] === 'locked'
            const finished = levelSteps.every((n) => statuses[n.id] === 'completed')
            return (
              <button
                key={l.id}
                type="button"
                aria-pressed={l.id === levelId}
                onClick={() => setLevelId(l.id)}
                className={cn(
                  'flex flex-col items-start rounded-lg border px-3 py-2 text-left transition',
                  l.id === levelId ? 'border-accent bg-surface ring-1 ring-accent' : 'border-line bg-surface hover:border-muted',
                )}
              >
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  Nivel {l.id}
                  {locked && <Lock className="h-3.5 w-3.5 text-muted" aria-label="bloqueado" />}
                  {finished && <Check className="h-4 w-4 text-ok" strokeWidth={3} aria-label="superado" />}
                </span>
                <span className="text-xs text-muted">{l.cefr}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="index-title">
        <p className="text-sm text-muted">
          Nivel {level.id} · {level.cefr}
        </p>
        <h1 id="index-title" className="text-2xl font-semibold tracking-tight">
          {level.title}
        </h1>
        <p className="mt-1 text-muted">{level.subtitle}</p>
        {levelLocked ? (
          <p className="mt-4 flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm">
            <Lock className="h-4 w-4 shrink-0" /> Supera el examen del nivel {level.id - 1} sin errores para desbloquear este nivel.
          </p>
        ) : (
          <div className="mt-4 flex items-center gap-3">
            <ProgressBar value={done / steps.length} label={`Progreso del nivel ${level.id}`} />
            <span className="shrink-0 text-sm text-muted tabular-nums">
              {done} de {steps.length} pasos
            </span>
          </div>
        )}
        <ol className="mt-4 flex flex-col gap-0.5 rounded-xl border border-line bg-surface p-2">
          {steps.map((node) => (
            <StepRow key={node.id} node={node} level={level} status={statuses[node.id]} isNext={node.id === nextId} />
          ))}
        </ol>
      </section>
    </div>
  )
}
