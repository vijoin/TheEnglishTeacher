import { Lightbulb } from 'lucide-react'
import { AudioButton } from '../../components/AudioButton'
import type { Item } from '../../content/types'

interface StudyCardProps {
  item: Item
  position: number
  total: number
}

/** One word or phrase, laid out like an index card. */
export function StudyCard({ item, position, total }: StudyCardProps) {
  return (
    <article key={item.id} className="animate-enter overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
      <div className="px-5 pt-4 pb-6 sm:px-8">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>{item.kind === 'word' ? 'Palabra' : 'Frase'}</span>
          <span className="tabular-nums">
            {position} de {total}
          </span>
        </div>
        <h1 lang="en" className="mt-6 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          {item.en}
        </h1>
        <p className="mt-2 text-xl text-muted">{item.es}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <AudioButton text={item.en} label="Escuchar" />
          <AudioButton text={item.en} slow label="Más lento" />
        </div>
      </div>

      <div className="h-0.5 bg-rule" aria-hidden />
      <section aria-label="Ejemplos de uso" className="ruled px-5 pb-8 sm:px-8">
        <h2 className="text-sm leading-8 font-medium text-muted">Ejemplos de uso</h2>
        <ul>
          {item.examples.map((ex) => (
            <li key={ex.en} className="flex gap-3">
              <AudioButton text={ex.en} className="mt-0 h-8 w-8 border-transparent bg-transparent" />
              <div className="min-w-0">
                <p lang="en" className="leading-8 font-medium">
                  {ex.en}
                </p>
                <p className="text-sm leading-8 text-muted">{ex.es}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {item.note && (
        <p className="flex gap-2 border-t border-line px-5 py-4 text-sm sm:px-8">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
          <span>{item.note}</span>
        </p>
      )}
    </article>
  )
}
