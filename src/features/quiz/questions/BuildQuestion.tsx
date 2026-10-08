import { LayoutGroup, motion } from 'motion/react'
import type { Item } from '../../../content/types'
import type { Grade } from '../../../engine/grade'
import { cn } from '../../../lib/cn'
import { QuestionPrompt } from './QuestionPrompt'

interface BuildQuestionProps {
  item: Item
  tiles: string[]
  /** Indexes into `tiles`, in the order chosen. */
  selected: number[]
  grade: Grade | null
  onChange: (selected: number[]) => void
}

const tileClass =
  'rounded-xl border-2 border-line bg-surface px-3 py-2 text-lg font-bold shadow-[0_3px_0_0_var(--line)] transition active:translate-y-[2px] active:shadow-none'

export function BuildQuestion({ item, tiles, selected, grade, onChange }: BuildQuestionProps) {
  return (
    <div>
      <QuestionPrompt label="Ordena la frase en inglés">
        <p className="text-3xl font-black sm:text-4xl">{item.es}</p>
      </QuestionPrompt>
      <LayoutGroup>
        <div
          role="group"
          aria-label="Tu frase"
          className={cn(
            'flex min-h-28 flex-wrap content-start gap-2 rounded-2xl border-2 border-dashed p-3 transition',
            !grade && 'border-line',
            grade?.correct && 'border-emerald-500 bg-emerald-500/5',
            grade && !grade.correct && 'border-rose-500 bg-rose-500/5',
          )}
        >
          {selected.length === 0 && <span className="self-center px-2 text-muted">Toca las fichas en orden…</span>}
          {selected.map((tileIndex, pos) => (
            <motion.button
              layoutId={`tile-${tileIndex}`}
              key={tileIndex}
              type="button"
              lang="en"
              disabled={!!grade}
              className={tileClass}
              onClick={() => onChange(selected.filter((_, p) => p !== pos))}
            >
              {tiles[tileIndex]}
            </motion.button>
          ))}
        </div>
        <div role="group" aria-label="Fichas disponibles" className="mt-6 flex flex-wrap justify-center gap-2">
          {tiles.map((tile, i) =>
            selected.includes(i) ? (
              <span key={i} aria-hidden className={cn(tileClass, 'invisible')}>
                {tile}
              </span>
            ) : (
              <motion.button
                layoutId={`tile-${i}`}
                key={i}
                type="button"
                lang="en"
                disabled={!!grade}
                className={cn(tileClass, 'hover:bg-surface-2')}
                onClick={() => onChange([...selected, i])}
              >
                {tile}
              </motion.button>
            ),
          )}
        </div>
      </LayoutGroup>
    </div>
  )
}
