import { Lightbulb } from 'lucide-react'
import { AudioButton } from '../../components/AudioButton'
import type { Item } from '../../content/types'

export function ItemCard({ item, position, total }: { item: Item; position: number; total: number }) {
  return (
    <article className="rounded-[2rem] border border-line bg-surface p-6 shadow-[0_8px_30px_-12px_rgba(20,26,46,0.18)] sm:p-8">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-ink">
          {item.kind === 'word' ? 'Palabra nueva' : 'Frase nueva'}
        </span>
        <span className="text-sm font-bold text-muted">
          {position} de {total}
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <h1 lang="en" className="text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl">
          {item.en}
        </h1>
        <p className="mt-3 text-xl font-bold text-muted">{item.es}</p>
        <div className="mt-6 flex items-center gap-3">
          <AudioButton text={item.en} size="lg" />
          <AudioButton text={item.en} slow size="md" />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-surface-2 p-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Ejemplo</p>
        <div className="mt-2 flex items-start gap-3">
          <AudioButton text={item.example.en} size="sm" />
          <div>
            <p lang="en" className="font-bold">
              {item.example.en}
            </p>
            <p className="text-muted italic">{item.example.es}</p>
          </div>
        </div>
      </div>

      {item.note && (
        <div className="mt-4 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
          <Lightbulb className="h-5 w-5 shrink-0" />
          <p>{item.note}</p>
        </div>
      )}
    </article>
  )
}
