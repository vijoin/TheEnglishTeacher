import { CircleCheck, CircleX, LockOpen } from 'lucide-react'
import { AudioButton } from '../../components/AudioButton'
import { Button } from '../../components/Button'
import type { Item, Level } from '../../content/types'
import type { QuizResult as Result } from './QuizPlayer'

interface QuizResultProps {
  result: Result
  /** Heading when every answer is right, e.g. "Examen superado". */
  passTitle: string
  missed: Item[]
  attempt: number
  unlocked?: Level
  onContinue: () => void
  onReview: () => void
  onHome: () => void
}

export function QuizResult({ result, passTitle, missed, attempt, unlocked, onContinue, onReview, onHome }: QuizResultProps) {
  const passed = result.correct === result.total
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
      <article className="animate-enter rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-8">
        <div className="flex items-start gap-3">
          {passed ? <CircleCheck className="h-8 w-8 shrink-0 text-ok" /> : <CircleX className="h-8 w-8 shrink-0 text-bad" />}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{passed ? passTitle : 'Todavía no'}</h1>
            <p className="mt-1 text-muted tabular-nums">
              {result.correct} de {result.total} respuestas correctas{attempt > 1 ? ` · intento ${attempt}` : ''}
            </p>
          </div>
        </div>

        {passed && unlocked && (
          <p className="mt-6 flex items-center gap-3 rounded-lg bg-accent-soft p-4">
            <LockOpen className="h-5 w-5 shrink-0 text-accent" />
            <span>
              Desbloqueaste el <strong>nivel {unlocked.id}: {unlocked.title}</strong>.
            </span>
          </p>
        )}

        {!passed && (
          <>
            <p className="mt-6">
              Para avanzar hay que responder todo bien. Repasa {missed.length === 1 ? 'la palabra que fallaste' : `las ${missed.length} palabras que fallaste`} y luego repite el quiz.
            </p>
            <ul className="mt-4 flex flex-col divide-y divide-line rounded-lg border border-line">
              {missed.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                  <AudioButton text={item.en} className="h-8 w-8" />
                  <span className="min-w-0">
                    <span lang="en" className="font-medium">
                      {item.en}
                    </span>{' '}
                    <span className="text-muted">= {item.es}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" size="lg" className="w-full sm:w-auto" onClick={onHome}>
          Volver al índice
        </Button>
        {passed ? (
          <Button size="lg" className="w-full sm:w-auto" onClick={onContinue} autoFocus>
            Continuar
          </Button>
        ) : (
          <Button size="lg" className="w-full sm:w-auto" onClick={onReview} autoFocus>
            Repasar las palabras falladas
          </Button>
        )}
      </div>
    </main>
  )
}
