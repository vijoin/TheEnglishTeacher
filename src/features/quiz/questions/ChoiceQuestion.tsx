import { useEffect } from 'react'
import { AudioButton } from '../../../components/AudioButton'
import type { Item } from '../../../content/types'
import type { Grade } from '../../../engine/grade'
import type { ChoiceType } from '../../../engine/quiz'
import { cn } from '../../../lib/cn'
import { isSpeechSupported } from '../../../lib/speech'
import { useSettings, useSpeak } from '../../hooks'
import { QuestionPrompt } from './QuestionPrompt'

interface ChoiceQuestionProps {
  type: ChoiceType
  item: Item
  options: string[]
  answer: string
  value: string | null
  grade: Grade | null
  onSelect: (value: string) => void
}

const LABELS: Record<ChoiceType, string> = {
  'choice-en-es': '¿Qué significa?',
  'choice-es-en': '¿Cómo se dice en inglés?',
  listen: 'Escucha y elige lo que oyes',
}

export function ChoiceQuestion({ type, item, options, answer, value, grade, onSelect }: ChoiceQuestionProps) {
  const say = useSpeak()
  const { autoplay } = useSettings()
  const optionsInEnglish = type !== 'choice-en-es'

  useEffect(() => {
    if (type === 'listen' || (type === 'choice-en-es' && autoplay)) say(item.en)
  }, [type, item.en, autoplay, say])

  useEffect(() => {
    if (grade) return
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 1 && n <= options.length) onSelect(options[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [grade, options, onSelect])

  return (
    <div>
      <QuestionPrompt label={LABELS[type]}>
        {type === 'choice-en-es' && (
          <div className="flex items-center gap-4">
            <AudioButton text={item.en} size="lg" />
            <p lang="en" className="text-3xl font-black sm:text-4xl">
              {item.en}
            </p>
          </div>
        )}
        {type === 'choice-es-en' && <p className="text-3xl font-black sm:text-4xl">{item.es}</p>}
        {type === 'listen' && (
          <div className="flex items-center justify-center gap-4 py-2">
            <AudioButton text={item.en} size="xl" label="Escuchar de nuevo" />
            <AudioButton text={item.en} slow size="lg" label="Escuchar despacio" />
          </div>
        )}
      </QuestionPrompt>

      <div className={cn('grid gap-3', optionsInEnglish && item.kind === 'phrase' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2')}>
        {options.map((option, i) => {
          const selected = option === value
          const isAnswer = option === answer
          return (
            <button
              key={option}
              type="button"
              disabled={!!grade}
              onClick={() => onSelect(option)}
              aria-pressed={selected}
              className={cn(
                'flex items-center gap-3 rounded-2xl border-2 p-4 text-left text-lg font-bold transition',
                'shadow-[0_4px_0_0_var(--line)] active:translate-y-[2px] active:shadow-none',
                !grade && !selected && 'border-line bg-surface hover:bg-surface-2',
                !grade && selected && 'border-brand bg-brand/10 text-brand shadow-[0_4px_0_0_var(--brand)]',
                grade && isAnswer && 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
                grade && selected && !isAnswer && 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300',
                grade && !selected && !isAnswer && 'border-line bg-surface opacity-50',
              )}
            >
              <span
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 text-xs font-extrabold',
                  selected ? 'border-current' : 'border-line text-muted',
                )}
              >
                {i + 1}
              </span>
              <span lang={optionsInEnglish ? 'en' : 'es'}>{option}</span>
            </button>
          )
        })}
      </div>
      {type === 'listen' && !isSpeechSupported() && <p className="mt-4 text-sm text-muted">Tu navegador no puede reproducir audio.</p>}
    </div>
  )
}
