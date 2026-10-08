import { Dumbbell, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AudioButton } from '../../components/AudioButton'
import { Button } from '../../components/Button'
import { Segmented } from '../../components/Segmented'
import type { Item, ItemKind } from '../../content/types'
import { normalizeAnswer } from '../../engine/answer'
import { learnedItemIds } from '../../engine/path'
import { navigate } from '../../lib/router'
import { useProgress } from '../../store/progress'
import { COURSE, COURSE_PATH, getItem } from '../course'

type KindFilter = 'all' | ItemKind

export function VocabScreen() {
  const completed = useProgress((s) => s.completed)
  const mistakes = useProgress((s) => s.mistakes)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<KindFilter>('all')
  const [levelId, setLevelId] = useState<number | 'all'>('all')

  const learned = useMemo(
    () => learnedItemIds(COURSE_PATH, completed).map(getItem).filter((i): i is Item => !!i),
    [completed],
  )
  const learnedLevels = COURSE.filter((l) => learned.some((i) => i.levelId === l.id))
  const pending = Object.keys(mistakes).length

  const q = normalizeAnswer(query)
  const visible = learned.filter(
    (i) =>
      (kind === 'all' || i.kind === kind) &&
      (levelId === 'all' || i.levelId === levelId) &&
      (!q || normalizeAnswer(i.en).includes(q) || normalizeAnswer(i.es).includes(q)),
  )

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-6 pb-32 md:pt-10">
      <h1 className="text-3xl font-black">Vocabulario</h1>
      <p className="mt-1 text-muted">
        {learned.length} {learned.length === 1 ? 'palabra o frase aprendida' : 'palabras y frases aprendidas'}
      </p>

      {learned.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-line bg-surface p-8 text-center">
          <p className="text-5xl">📚</p>
          <p className="mt-3 text-xl font-black">Aún no has aprendido palabras.</p>
          <p className="mt-1 text-muted">Completa tu primera lección para empezar tu vocabulario.</p>
          <Button className="mt-6" onClick={() => navigate('/')}>
            Ir a aprender
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center gap-4 rounded-3xl border border-line bg-surface p-4" data-accent="indigo">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
              <Dumbbell className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">Practica lo que más te cuesta</p>
              <p className="text-sm text-muted">{pending > 0 ? `${pending} pendientes de los quizzes` : '¡Sin errores pendientes!'}</p>
            </div>
            <Button variant="accent" size="sm" disabled={pending === 0} onClick={() => navigate('/practice')}>
              Practicar errores
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <label className="relative block">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en inglés o español"
                aria-label="Buscar en tu vocabulario"
                className="w-full rounded-2xl border-2 border-line bg-surface py-3 pr-4 pl-12 font-semibold outline-none focus:border-brand"
              />
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Segmented<KindFilter>
                  label="Tipo"
                  value={kind}
                  onChange={setKind}
                  options={[
                    { value: 'all', label: 'Todo' },
                    { value: 'word', label: 'Palabras' },
                    { value: 'phrase', label: 'Frases' },
                  ]}
                />
              </div>
              {learnedLevels.length > 1 && (
                <select
                  aria-label="Nivel"
                  value={levelId}
                  onChange={(e) => setLevelId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="rounded-2xl border-2 border-line bg-surface px-3 py-2 font-bold"
                >
                  <option value="all">Todos los niveles</option>
                  {learnedLevels.map((l) => (
                    <option key={l.id} value={l.id}>
                      Nivel {l.id} · {l.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {visible.length === 0 && <p className="mt-10 text-center text-muted">Sin resultados para «{query}».</p>}

          {learnedLevels.map((level) => {
            const rows = visible.filter((i) => i.levelId === level.id)
            if (rows.length === 0) return null
            return (
              <section key={level.id} className="mt-8" data-accent={level.color}>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-muted">
                  <span className="text-lg">{level.emoji}</span> Nivel {level.id} · {level.title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {rows.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
                      <AudioButton text={item.en} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p lang="en" className="font-extrabold">
                          {item.en}
                        </p>
                        <p className="text-sm text-muted">{item.es}</p>
                      </div>
                      {mistakes[item.id] ? (
                        <span className="shrink-0 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-extrabold text-rose-600 dark:text-rose-300">
                          Para repasar
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-extrabold text-accent-ink">
                          {item.kind === 'word' ? 'Palabra' : 'Frase'}
                        </span>
                      )}
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
