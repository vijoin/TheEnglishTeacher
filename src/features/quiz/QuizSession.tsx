import { CircleHelp } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import type { Item } from '../../content/types'
import type { PathNode } from '../../engine/path'
import { generateQuiz, QUIZ_SIZE, type Question } from '../../engine/quiz'
import { createRng } from '../../engine/random'
import { useProgress } from '../../store/progress'
import { ALL_ITEMS, getItem, getLevel, nodeLabel } from '../course'
import { useHasVoices } from '../hooks'
import { PlayerHeader } from '../player/PlayerHeader'
import { StudyPlayer } from '../study/StudyPlayer'
import { QuizPlayer, type QuizResult as Result } from './QuizPlayer'
import { QuizResult } from './QuizResult'

export type GenerateQuiz = (focus: string[], attempt: number) => Question[]

interface QuizSessionProps {
  step: PathNode
  items: Item[]
  onContinue: () => void
  onHome: () => void
  /** Overrides question generation (tests). */
  generate?: GenerateQuiz
}

type Phase = 'intro' | 'quiz' | 'result' | 'review'

/** Quiz → result → (review missed → retake)* until every answer is right. */
export function QuizSession({ step, items, onContinue, onHome, generate }: QuizSessionProps) {
  const kind = step.kind === 'lesson' ? 'quiz5' : step.kind
  const recordQuiz = useProgress((s) => s.recordQuiz)
  const audio = useHasVoices()
  const [phase, setPhase] = useState<Phase>('intro')
  const [attempt, setAttempt] = useState(1)
  const [questions, setQuestions] = useState<Question[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [wasDone] = useState(() => !!useProgress.getState().completed[step.id])
  const [confirmExit, setConfirmExit] = useState(false)
  const title = nodeLabel(step)

  /** Each attempt gets fresh questions; missed items are always asked again. */
  const startAttempt = (focus: string[], n: number) => {
    setAttempt(n)
    setQuestions(
      generate
        ? generate(focus, n)
        : generateQuiz(kind, items, {
            rng: createRng(Date.now() + n),
            audio,
            pool: ALL_ITEMS,
            mistakes: useProgress.getState().mistakes,
            focus,
          }),
    )
    setPhase('quiz')
  }

  const missed = (result?.wrongItemIds ?? []).map(getItem).filter((i): i is Item => !!i)
  const level = getLevel(step.levelId)!
  const unlocked = step.kind === 'exam50' && !wasDone ? getLevel(step.levelId + 1) : undefined
  const askToLeave = () => setConfirmExit(true)

  const description =
    step.kind === 'quiz5'
      ? `${QUIZ_SIZE.quiz5} preguntas sobre: ${items.map((i) => i.en).join(', ')}.`
      : step.kind === 'review20'
        ? `${QUIZ_SIZE.review20} preguntas sobre las últimas 20 palabras del nivel ${level.id}.`
        : `${QUIZ_SIZE.exam50} preguntas sobre las 50 palabras del nivel ${level.id}.`

  return (
    <>
      {phase === 'intro' && (
        <>
          <PlayerHeader title={title} progress={0} onClose={onHome} />
          <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
            <article className="animate-enter rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-8">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-muted">{description}</p>
              <ul className="mt-6 flex flex-col gap-2 rounded-lg bg-surface-2 p-4 text-[15px]">
                <li className="flex gap-2">
                  <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> Responde cada pregunta para pasar a la siguiente.
                </li>
                <li className="flex gap-2">
                  <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> Para superar el quiz hay que acertar todas.
                </li>
                <li className="flex gap-2">
                  <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> Si fallas alguna, repasarás esas palabras y harás el quiz de nuevo.
                </li>
              </ul>
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={() => startAttempt([], 1)} autoFocus>
                  Empezar
                </Button>
              </div>
            </article>
          </main>
        </>
      )}

      {phase === 'quiz' && (
        <QuizPlayer
          key={attempt}
          title={attempt > 1 ? `${title} · intento ${attempt}` : title}
          questions={questions}
          onClose={askToLeave}
          onFinish={(r) => {
            recordQuiz({ stepId: step.id, ...r })
            setResult(r)
            setPhase('result')
          }}
        />
      )}

      {phase === 'result' && result && (
        <>
          <PlayerHeader title={title} progress={1} onClose={onHome} />
          <QuizResult
            result={result}
            passTitle={step.kind === 'exam50' ? 'Examen superado' : step.kind === 'review20' ? 'Repaso superado' : 'Quiz superado'}
            missed={missed}
            attempt={attempt}
            unlocked={unlocked}
            onContinue={onContinue}
            onHome={onHome}
            onReview={() => setPhase('review')}
          />
        </>
      )}

      {phase === 'review' && (
        <StudyPlayer
          title="Repaso de las palabras falladas"
          items={missed}
          finishLabel="Repetir el quiz"
          onClose={askToLeave}
          onFinish={() => startAttempt(missed.map((i) => i.id), attempt + 1)}
        />
      )}

      <ConfirmDialog
        open={confirmExit}
        title="¿Salir?"
        message={wasDone ? 'Este paso ya está completado; no se guardará este intento.' : 'Este paso quedará pendiente. Tendrás que hacer el quiz desde el principio.'}
        confirmLabel="Salir"
        cancelLabel="Seguir"
        danger
        onConfirm={onHome}
        onCancel={() => setConfirmExit(false)}
      />
    </>
  )
}
