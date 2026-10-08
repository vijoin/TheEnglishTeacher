import { Check, Lock, LockOpen, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { AudioButton } from '../../components/AudioButton'
import { Button } from '../../components/Button'
import { ProgressRing } from '../../components/ProgressRing'
import { Stars } from '../../components/Stars'
import type { Item } from '../../content/types'
import type { PathNode } from '../../engine/path'
import { PASS_THRESHOLD, type QuizKind } from '../../engine/scoring'
import { celebrate } from '../../lib/celebrate'
import type { QuizOutcome } from '../../store/progress'
import { getItem, getLevel } from '../course'
import { useSfx } from '../hooks'
import type { QuizResult } from './QuizPlayer'

interface ResultsScreenProps {
  kind: QuizKind
  result: QuizResult
  outcome: QuizOutcome
  node?: PathNode
  next?: PathNode
  onRetry: () => void
  onContinue: () => void
  onReviewLesson?: () => void
}

const PASS_TITLES: Record<QuizKind, string> = {
  quiz5: '¡Quiz aprobado!',
  review20: '¡Repaso aprobado!',
  exam50: '¡Nivel superado!',
  practice: '¡Práctica completada!',
}

export function ResultsScreen({ kind, result, outcome, node, next, onRetry, onContinue, onReviewLesson }: ResultsScreenProps) {
  const sfx = useSfx()
  const pct = Math.round(outcome.score * 100)
  const passed = outcome.passed
  const unlockedLevel = passed && kind === 'exam50' && next ? getLevel(next.levelId) : undefined
  const missed = result.wrongItemIds.map(getItem).filter((i): i is Item => !!i)

  useEffect(() => {
    if (!passed) return
    sfx(kind === 'exam50' ? 'levelup' : 'complete')
    celebrate(kind === 'exam50' || outcome.stars === 3)
  }, [passed, kind, outcome.stars, sfx])

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-xl flex-1 px-4 pt-4 pb-8 text-center">
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-6xl">
          {passed ? (kind === 'exam50' ? '🏆' : '🎉') : '💪'}
        </motion.p>
        <h1 className="mt-3 text-3xl font-black">{passed ? PASS_TITLES[kind] : '¡Casi lo logras!'}</h1>
        {!passed && (
          <p className="mt-1 text-muted">
            Necesitas {Math.round(PASS_THRESHOLD[kind] * 100)} % para aprobar. Repasa y vuelve a intentarlo.
          </p>
        )}

        <div className="mt-6 flex flex-col items-center gap-3">
          <ProgressRing value={outcome.score} size={148} stroke={14} color={passed ? 'var(--color-emerald-500)' : 'var(--color-rose-500)'} label={`Resultado: ${pct} %`}>
            <span className="text-4xl font-black">{pct}%</span>
          </ProgressRing>
          {kind !== 'practice' && <Stars count={outcome.stars} size={36} animated />}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 font-extrabold">
          <span className="flex items-center gap-1.5 rounded-2xl border border-line bg-surface px-4 py-2">
            <Check className="h-5 w-5 text-emerald-500" strokeWidth={3} /> {result.correct}/{result.total} correctas
          </span>
          <span className="flex items-center gap-1.5 rounded-2xl border border-line bg-surface px-4 py-2 text-amber-600 dark:text-amber-300">
            <Zap className="h-5 w-5 fill-current" /> +{outcome.xp} XP
          </span>
        </div>

        {unlockedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            data-accent={unlockedLevel.color}
            className="mt-6 flex items-center gap-3 rounded-3xl bg-accent p-4 text-left text-white shadow-[0_6px_0_0_var(--accent-strong)]"
          >
            <LockOpen className="h-8 w-8 shrink-0" />
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wider text-white/80">¡Nuevo nivel desbloqueado!</p>
              <p className="text-lg font-black">
                Nivel {unlockedLevel.id}: {unlockedLevel.title} {unlockedLevel.emoji}
              </p>
            </div>
          </motion.div>
        )}
        {!passed && kind === 'exam50' && node && (
          <p className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-muted">
            <Lock className="h-4 w-4" /> Aprueba este examen para desbloquear el siguiente nivel.
          </p>
        )}

        {missed.length > 0 && (
          <div className="mt-8 text-left">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-muted">Para repasar</h2>
            <ul className="mt-2 flex flex-col gap-2">
              {missed.map((item) => (
                <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
                  <AudioButton text={item.en} size="sm" />
                  <div className="min-w-0">
                    <p lang="en" className="font-extrabold">
                      {item.en}
                    </p>
                    <p className="text-sm text-muted">{item.es}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 border-t border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {passed ? (
            <>
              <Button variant="accent" size="lg" block onClick={onContinue} autoFocus>
                Continuar
              </Button>
              <Button variant="ghost" block onClick={onRetry}>
                Repetir para mejorar
              </Button>
            </>
          ) : (
            <>
              <Button variant="accent" size="lg" block onClick={onRetry} autoFocus>
                Intentar de nuevo
              </Button>
              {onReviewLesson && (
                <Button variant="outline" block onClick={onReviewLesson}>
                  Repasar la lección
                </Button>
              )}
              <Button variant="ghost" block onClick={onContinue}>
                Volver al mapa
              </Button>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}
