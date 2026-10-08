import { CircleAlert, CircleCheck, CircleX } from 'lucide-react'
import { motion } from 'motion/react'
import { AudioButton } from '../../components/AudioButton'
import { Button } from '../../components/Button'
import type { Item } from '../../content/types'
import type { Grade } from '../../engine/grade'
import { cn } from '../../lib/cn'

const PRAISE = ['¡Correcto!', '¡Excelente!', '¡Muy bien!', '¡Perfecto!']

interface FeedbackSheetProps {
  grade: Grade
  /** Items to reveal (the asked item, or the mismatched pairs). */
  reveal: Item[]
  answerText?: string
  praiseIndex: number
  onContinue: () => void
}

export function FeedbackSheet({ grade, reveal, answerText, praiseIndex, onContinue }: FeedbackSheetProps) {
  const tone = grade.correct ? (grade.typo ? 'typo' : 'ok') : 'bad'
  const Icon = tone === 'ok' ? CircleCheck : tone === 'typo' ? CircleAlert : CircleX
  const title =
    tone === 'ok' ? PRAISE[praiseIndex % PRAISE.length] : tone === 'typo' ? '¡Casi! Revisa la ortografía' : 'Respuesta correcta:'

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      role="status"
      className={cn(
        'border-t-2',
        tone === 'ok' && 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-200',
        tone === 'typo' && 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-200',
        tone === 'bad' && 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-200',
      )}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-3">
          <Icon className="mt-0.5 h-8 w-8 shrink-0" strokeWidth={2.5} />
          <div className="min-w-0">
            <p className="text-xl font-black">{title}</p>
            {tone === 'bad' && answerText && <p className="mt-0.5 text-lg font-extrabold">{answerText}</p>}
            {reveal.map((item) => (
              <div key={item.id} className="mt-1.5 flex items-center gap-2">
                <AudioButton text={item.en} size="sm" />
                <p className="font-semibold">
                  <span lang="en" className="font-extrabold">
                    {item.en}
                  </span>{' '}
                  = {item.es}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant={tone === 'ok' ? 'success' : tone === 'typo' ? 'warning' : 'danger'}
          size="lg"
          className="sm:min-w-48"
          onClick={onContinue}
          autoFocus
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  )
}
