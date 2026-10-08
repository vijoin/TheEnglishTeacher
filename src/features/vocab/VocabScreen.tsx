import { ChevronRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AudioButton } from '../../components/AudioButton'
import { Button } from '../../components/Button'
import type { Item } from '../../content/types'
import { normalizeAnswer } from '../../engine/answer'
import { learnedItemIds } from '../../engine/path'
import { navigate } from '../../lib/router'
import { useProgress } from '../../store/progress'
import { COURSE, COURSE_PATH, getItem } from '../course'

export function VocabScreen() {
  const completed = useProgress((s) => s.completed)
  const mistakes = useProgress((s) => s.mistakes)
  const [query, setQuery] = useState('')
  const learned = useMemo(() => learnedItemIds(COURSE_PATH, completed).map(getItem).filter((i): i is Item => !!i), [completed])

  const q = normalizeAnswer(query)
  const visible = learned.filter((i) => !q || normalizeAnswer(i.en).includes(q) || normalizeAnswer(i.es).includes(q))

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Vocabulario</h1>
      <p className="mt-1 text-muted">
        {learned.length === 1 ? '1 palabra o frase aprendida' : `${learned.length} palabras y frases aprendidas`}
      </p>

      {learned.length === 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-surface p-6">
          <p className="font-medium">Aún no has aprendido palabras.</p>
          <p className="mt-1 text-muted">Las palabras de cada lección que completes aparecerán aquí, con su audio y sus ejemplos.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Ir al curso
          </Button>
        </div>
      ) : (
        <>
          <label className="relative mt-6 block">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="vocab-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en inglés o español"
              aria-label="Buscar en tu vocabulario"
              className="w-full rounded-lg border border-line bg-surface py-2.5 pr-3 pl-9 outline-none focus:border-accent focus:ring-2 focus:ring-accent/25"
            />
          </label>
          {visible.length === 0 && <p className="mt-8 text-muted">Sin resultados para «{query}».</p>}

          {COURSE.map((level) => {
            const rows = visible.filter((i) => i.levelId === level.id)
            if (rows.length === 0) return null
            return (
              <section key={level.id} className="mt-8">
                <h2 className="mb-2 text-sm font-medium text-muted">
                  Nivel {level.id} · {level.title}
                </h2>
                <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
                  {rows.map((item) => (
                    <li key={item.id}>
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted transition group-open:rotate-90" />
                          <span className="min-w-0 flex-1">
                            <span lang="en" className="font-medium">
                              {item.en}
                            </span>{' '}
                            <span className="text-muted">= {item.es}</span>
                          </span>
                          {mistakes[item.id] ? <span className="shrink-0 rounded bg-bad-soft px-2 py-0.5 text-xs text-bad">Para repasar</span> : null}
                          <AudioButton text={item.en} className="h-8 w-8" />
                        </summary>
                        <ul className="flex flex-col gap-2 px-11 pb-4">
                          {item.examples.map((ex) => (
                            <li key={ex.en} className="flex items-start gap-2 text-sm">
                              <AudioButton text={ex.en} className="h-7 w-7 border-transparent" />
                              <span>
                                <span lang="en">{ex.en}</span>
                                <span className="block text-muted">{ex.es}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </>
      )}
    </div>
  )
}
