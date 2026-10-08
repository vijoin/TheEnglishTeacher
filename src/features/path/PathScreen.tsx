import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '../../components/Button'
import { navigate } from '../../lib/router'
import { useProgress } from '../../store/progress'
import { currentNodeId } from '../../engine/path'
import { COURSE, COURSE_PATH, getLevel, getNode, nodeLabel } from '../course'
import { useNodeStatuses } from '../hooks'
import { LevelSection } from './LevelSection'

export function PathScreen() {
  const completed = useProgress((s) => s.completed)
  const statuses = useNodeStatuses()
  const currentId = useMemo(() => currentNodeId(COURSE_PATH, completed), [completed])
  const current = currentId ? getNode(currentId) : undefined
  const currentLevel = current ? getLevel(current.levelId) : undefined
  const started = Object.keys(completed).length > 0

  return (
    <div className="mx-auto w-full max-w-xl px-4 pt-5 pb-32 md:pt-8">
      {current && currentLevel && (
        <div data-accent={currentLevel.color} className="mb-8 flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 shadow-sm">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-3xl">
            {currentLevel.lessons[current.lessonIndex].emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-muted">
              {started ? 'Continúa donde lo dejaste' : '¡Bienvenido! Empieza aquí'}
            </p>
            <p className="truncate font-extrabold">{nodeLabel(current)}</p>
            <p className="text-sm text-muted">
              Nivel {currentLevel.id} · {currentLevel.title}
            </p>
          </div>
          <Button variant="accent" onClick={() => navigate(`/play/${current.id}`)} aria-label={`Continuar: ${nodeLabel(current)}`}>
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </Button>
        </div>
      )}
      {!current && (
        <div className="mb-8 rounded-3xl border border-line bg-surface p-6 text-center shadow-sm">
          <p className="text-4xl">🏆</p>
          <p className="mt-2 text-xl font-black">¡Completaste todo el curso!</p>
          <p className="text-muted">Repite cualquier lección o examen para mejorar tus estrellas.</p>
        </div>
      )}

      <div className="flex flex-col gap-10">
        {COURSE.map((level) => (
          <LevelSection
            key={level.id}
            level={level}
            nodes={COURSE_PATH.filter((n) => n.levelId === level.id)}
            statuses={statuses}
            currentId={currentId}
          />
        ))}
      </div>
    </div>
  )
}
