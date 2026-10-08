import type { Item } from '../content/types'
import { normalizeAnswer, tokenize } from './answer'
import { pick, sample, shuffle, type Rng } from './random'
import type { QuizKind } from './scoring'

export type ChoiceType = 'choice-en-es' | 'choice-es-en' | 'listen'
export type SingleType = ChoiceType | 'type' | 'build'

export type Question =
  | { id: string; type: ChoiceType; itemId: string; options: string[]; answer: string }
  | { id: string; type: 'type'; itemId: string }
  | { id: string; type: 'build'; itemId: string; tiles: string[] }
  | { id: string; type: 'match'; itemIds: string[] }

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never
type QuestionDraft = DistributiveOmit<Question, 'id'>

export interface QuizOptions {
  rng: Rng
  /** Whether speech synthesis is available (enables `listen`). */
  audio: boolean
  /** Items used to draw wrong options from (usually the whole course). */
  pool: Item[]
  /** Mistake counters per item id; reviews ask weak items first. */
  mistakes?: Record<string, number>
}

export const QUIZ_SIZE: Record<Exclude<QuizKind, 'practice'>, number> = {
  quiz5: 8,
  review20: 15,
  exam50: 25,
}

const MAX_TYPED_LENGTH = 24
const MIN_BUILD_TOKENS = 3
const EXTRA_TILES = 2
const OPTION_COUNT = 4
const MATCH_SIZE = 4
const FALLBACK_TILES = ['the', 'a', 'is', 'do', 'to', 'it', 'my', 'at', 'on', 'very']

export function questionItemIds(q: Question): string[] {
  return q.type === 'match' ? q.itemIds : [q.itemId]
}

function candidateTypes(item: Item, audio: boolean): SingleType[] {
  const types: SingleType[] = ['choice-en-es', 'choice-es-en']
  if (audio) types.push('listen')
  if (item.en.length <= MAX_TYPED_LENGTH) types.push('type')
  if (item.kind === 'phrase' && tokenize(item.en).length >= MIN_BUILD_TOKENS) types.push('build')
  return types
}

function pickType(item: Item, kind: QuizKind, opts: QuizOptions, avoid?: SingleType): SingleType {
  let types = candidateTypes(item, opts.audio)
  if (avoid && types.length > 1) types = types.filter((t) => t !== avoid)
  // The level exam leans on production (typing / building) over recognition.
  const weighted = types.flatMap((t) => (kind === 'exam50' && (t === 'type' || t === 'build') ? [t, t] : [t]))
  return pick(weighted, opts.rng)
}

/** Wrong options: same level and kind first, then same kind, then anything. */
function distractors(item: Item, field: 'en' | 'es', opts: QuizOptions): string[] {
  const seen = new Set([normalizeAnswer(item[field])])
  const tiers = [
    opts.pool.filter((o) => o.levelId === item.levelId && o.kind === item.kind),
    opts.pool.filter((o) => o.kind === item.kind),
    opts.pool,
  ]
  const out: string[] = []
  for (const tier of tiers) {
    for (const other of shuffle(tier, opts.rng)) {
      if (out.length === OPTION_COUNT - 1) return out
      const key = normalizeAnswer(other[field])
      if (other.id === item.id || seen.has(key)) continue
      seen.add(key)
      out.push(other[field])
    }
  }
  return out
}

function extraTiles(item: Item, opts: QuizOptions): string[] {
  const own = new Set(tokenize(item.en).map((t) => t.toLowerCase()))
  const candidates = shuffle(
    opts.pool.filter((o) => o.id !== item.id && o.kind === 'phrase').flatMap((o) => tokenize(o.en)),
    opts.rng,
  )
  const out: string[] = []
  for (const t of [...candidates, ...shuffle(FALLBACK_TILES, opts.rng)]) {
    const key = t.toLowerCase()
    if (own.has(key) || out.some((o) => o.toLowerCase() === key)) continue
    out.push(t)
    if (out.length === EXTRA_TILES) break
  }
  return out
}

function makeSingle(item: Item, type: SingleType, opts: QuizOptions): QuestionDraft {
  switch (type) {
    case 'choice-en-es':
      return { type, itemId: item.id, answer: item.es, options: shuffle([item.es, ...distractors(item, 'es', opts)], opts.rng) }
    case 'choice-es-en':
    case 'listen':
      return { type, itemId: item.id, answer: item.en, options: shuffle([item.en, ...distractors(item, 'en', opts)], opts.rng) }
    case 'type':
      return { type, itemId: item.id }
    case 'build':
      return { type, itemId: item.id, tiles: shuffle([...tokenize(item.en), ...extraTiles(item, opts)], opts.rng) }
  }
}

/** Up to `size` items whose English and Spanish are pairwise distinct. */
function matchItems(items: Item[], size: number, rng: Rng): string[] {
  const en = new Set<string>()
  const es = new Set<string>()
  const out: string[] = []
  for (const item of shuffle(items, rng)) {
    const a = normalizeAnswer(item.en)
    const b = normalizeAnswer(item.es)
    if (en.has(a) || es.has(b)) continue
    en.add(a)
    es.add(b)
    out.push(item.id)
    if (out.length === size) break
  }
  return out
}

/** Weak items (most mistakes first), then the rest in random order. */
function prioritise(items: Item[], opts: QuizOptions): Item[] {
  const mistakes = opts.mistakes ?? {}
  const shuffled = shuffle(items, opts.rng)
  const weak = shuffled.filter((i) => (mistakes[i.id] ?? 0) > 0).sort((a, b) => mistakes[b.id] - mistakes[a.id])
  return [...weak, ...shuffled.filter((i) => !((mistakes[i.id] ?? 0) > 0))]
}

export function generateQuiz(kind: QuizKind, items: Item[], opts: QuizOptions): Question[] {
  if (items.length === 0) return []
  const singles: QuestionDraft[] = []
  let matchSize = MATCH_SIZE

  if (kind === 'quiz5') {
    const first = new Map<string, SingleType>()
    for (const item of items) {
      const t = pickType(item, kind, opts)
      first.set(item.id, t)
      singles.push(makeSingle(item, t, opts))
    }
    const extras = QUIZ_SIZE.quiz5 - 1 - items.length
    for (const item of sample(items, extras, opts.rng)) {
      singles.push(makeSingle(item, pickType(item, kind, opts, first.get(item.id)), opts))
    }
    matchSize = Math.min(5, items.length)
  } else if (kind === 'practice') {
    for (const item of items) singles.push(makeSingle(item, pickType(item, kind, opts), opts))
  } else {
    const count = QUIZ_SIZE[kind] - 1
    const ordered = prioritise(items, opts)
    for (let i = 0; i < count; i++) {
      const item = ordered[i % ordered.length]
      singles.push(makeSingle(item, pickType(item, kind, opts), opts))
    }
  }

  const questions = shuffle(singles, opts.rng)
  const match = items.length >= MATCH_SIZE ? matchItems(items, matchSize, opts.rng) : []
  if (match.length >= MATCH_SIZE) questions.push({ type: 'match', itemIds: match })
  return questions.map((q, i) => ({ ...q, id: `q${i + 1}` }) as Question)
}
