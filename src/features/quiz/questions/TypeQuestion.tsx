import type { Item } from '../../../content/types'
import type { Grade } from '../../../engine/grade'
import { cn } from '../../../lib/cn'
import { QuestionPrompt } from './QuestionPrompt'

interface TypeQuestionProps {
  item: Item
  value: string
  grade: Grade | null
  onChange: (value: string) => void
}

export function TypeQuestion({ item, value, grade, onChange }: TypeQuestionProps) {
  return (
    <div>
      <QuestionPrompt label="Escribe en inglés">
        <p className="text-3xl font-black sm:text-4xl">{item.es}</p>
        <p className="mt-2 text-sm font-semibold text-muted">{item.kind === 'word' ? 'Una palabra o expresión corta' : 'Una frase completa'}</p>
      </QuestionPrompt>
      <input
        type="text"
        lang="en"
        aria-label="Tu respuesta en inglés"
        value={value}
        disabled={!!grade}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="Escribe aquí…"
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-2xl border-2 bg-surface px-5 py-4 text-xl font-bold outline-none transition placeholder:text-muted/60',
          !grade && 'border-line focus:border-brand',
          grade?.correct && !grade.typo && 'border-emerald-500',
          grade?.typo && 'border-amber-500',
          grade && !grade.correct && 'border-rose-500',
        )}
      />
    </div>
  )
}
