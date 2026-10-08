import { Check, X } from 'lucide-react'
import { useEffect } from 'react'
import { AudioButton } from '../../components/AudioButton'
import type { Item } from '../../content/types'
import type { Grade, Response } from '../../engine/grade'
import type { Question } from '../../engine/quiz'
import { cn } from '../../lib/cn'
import { useSettings, useSpeak } from '../hooks'

const PROMPTS: Record<Question['type'], string> = {
  'choice-en-es': '¿Qué significa?',
  'choice-es-en': '¿Cómo se dice en inglés?',
  listen: 'Escucha y elige lo que oyes',
  type: 'Escribe en inglés',
}
const LETTERS = ['A', 'B', 'C', 'D']

interface QuestionViewProps {
  question: Question
  item: Item
  response: Response | null
  grade: Grade | null
  onResponse: (r: Response) => void
}

export function QuestionView({ question, item, response, grade, onResponse }: QuestionViewProps) {
  const say = useSpeak()
  const { autoplay } = useSettings()

  useEffect(() => {
    if (question.type === 'listen' || (question.type === 'choice-en-es' && autoplay)) say(item.en)
  }, [question, item.en, autoplay, say])

  useEffect(() => {
    if (grade || question.type === 'type') return
    const options = question.options
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="alertdialog"]')) return
      const k = e.key.toUpperCase()
      const i = /^[1-4]$/.test(k) ? Number(k) - 1 : LETTERS.indexOf(k)
      if (i >= 0 && i < options.length) onResponse({ kind: 'choice', value: options[i] })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [grade, question, onResponse])

  return (
    <div>
      <p className="text-sm font-medium text-muted">{PROMPTS[question.type]}</p>
      <div className="mt-2 mb-6">
        {question.type === 'choice-en-es' && (
          <div className="flex items-center gap-3">
            <p lang="en" className="text-3xl font-semibold tracking-tight">
              {item.en}
            </p>
            <AudioButton text={item.en} />
          </div>
        )}
        {(question.type === 'choice-es-en' || question.type === 'type') && <p className="text-3xl font-semibold tracking-tight">{item.es}</p>}
        {question.type === 'listen' && (
          <div className="flex flex-wrap gap-2 pt-1">
            <AudioButton text={item.en} label="Escuchar" />
            <AudioButton text={item.en} slow label="Más lento" />
          </div>
        )}
      </div>

      {question.type === 'type' ? (
        <input
          type="text"
          lang="en"
          aria-label="Tu respuesta en inglés"
          value={response?.kind === 'text' ? response.value : ''}
          disabled={!!grade}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Escribe la respuesta"
          onChange={(e) => onResponse({ kind: 'text', value: e.target.value })}
          className={cn(
            'w-full rounded-lg border bg-surface px-4 py-3 text-lg outline-none transition placeholder:text-muted/70',
            !grade && 'border-line focus:border-accent focus:ring-2 focus:ring-accent/25',
            grade?.correct && 'border-ok',
            grade && !grade.correct && 'border-bad',
          )}
        />
      ) : (
        <div role="radiogroup" aria-label="Opciones" className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            const selected = response?.kind === 'choice' && response.value === option
            const isAnswer = option === question.answer
            return (
              <button
                key={option}
                type="button"
                role="radio"
                data-choice
                aria-checked={selected}
                disabled={!!grade}
                onClick={() => onResponse({ kind: 'choice', value: option })}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition',
                  !grade && (selected ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:border-muted'),
                  grade && isAnswer && 'border-ok bg-ok-soft',
                  grade && selected && !isAnswer && 'border-bad bg-bad-soft',
                  grade && !selected && !isAnswer && 'border-line opacity-60',
                )}
              >
                <span
                  className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded border text-xs font-semibold',
                    selected && !grade ? 'border-accent text-accent' : 'border-line text-muted',
                  )}
                  aria-hidden
                >
                  {LETTERS[i]}
                </span>
                <span lang={question.type === 'choice-en-es' ? 'es' : 'en'} className="flex-1">
                  {option}
                </span>
                {grade && isAnswer && <Check className="h-5 w-5 text-ok" strokeWidth={2.5} aria-label="respuesta correcta" />}
                {grade && selected && !isAnswer && <X className="h-5 w-5 text-bad" strokeWidth={2.5} aria-label="tu respuesta" />}
              </button>
            )
          })}
        </div>
      )}

      {grade && (
        <div role="status" className={cn('mt-5 animate-enter rounded-lg p-4', grade.correct ? 'bg-ok-soft' : 'bg-bad-soft')}>
          <p className={cn('font-semibold', grade.correct ? 'text-ok' : 'text-bad')}>
            {grade.correct ? (grade.typo ? 'Correcto, pero revisa la ortografía.' : 'Correcto.') : 'Incorrecto.'}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <AudioButton text={item.en} className="h-8 w-8" />
            <p>
              <span lang="en" className="font-medium">
                {item.en}
              </span>{' '}
              <span className="text-muted">= {item.es}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
