import { Dumbbell, Target, Trophy, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '../../components/Button'
import { Stars } from '../../components/Stars'
import { PASS_THRESHOLD, type QuizKind } from '../../engine/scoring'
import { QUIZ_SIZE } from '../../engine/quiz'

const ICONS = { quiz5: Zap, review20: Target, exam50: Trophy, practice: Dumbbell }
export const QUIZ_TITLES: Record<QuizKind, string> = {
  quiz5: 'Quiz rápido',
  review20: 'Repaso de 20 palabras',
  exam50: 'Examen del nivel',
  practice: 'Repaso de errores',
}

interface QuizIntroProps {
  kind: QuizKind
  description: string
  questionCount: number
  best?: { score: number; stars: number }
  onStart: () => void
}

export function QuizIntro({ kind, description, questionCount, best, onStart }: QuizIntroProps) {
  const Icon = ICONS[kind]
  const threshold = Math.round(PASS_THRESHOLD[kind] * 100)
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        className={
          kind === 'exam50'
            ? 'grid h-28 w-28 place-items-center rounded-full bg-amber-400 text-amber-900 shadow-[0_8px_0_0_var(--color-amber-600)]'
            : 'grid h-28 w-28 place-items-center rounded-full bg-accent text-white shadow-[0_8px_0_0_var(--accent-strong)]'
        }
      >
        <Icon className="h-14 w-14" strokeWidth={2.5} />
      </motion.div>
      <h1 className="mt-8 text-3xl font-black">{QUIZ_TITLES[kind]}</h1>
      <p className="mt-2 text-lg text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-extrabold">
        <span className="rounded-full bg-surface-2 px-3 py-1.5">{questionCount} preguntas</span>
        {kind !== 'practice' && <span className="rounded-full bg-accent-soft px-3 py-1.5 text-accent-ink">Aprueba con {threshold} %</span>}
      </div>
      {best && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-2 text-sm font-bold">
          Tu mejor marca: {Math.round(best.score * 100)} % <Stars count={best.stars} />
        </div>
      )}
      <Button variant="accent" size="lg" block className="mt-10" onClick={onStart} autoFocus>
        Comenzar
      </Button>
    </div>
  )
}

export function quizQuestionCount(kind: QuizKind, itemCount: number): number {
  if (kind === 'practice') return itemCount + (itemCount >= 4 ? 1 : 0)
  return QUIZ_SIZE[kind]
}
