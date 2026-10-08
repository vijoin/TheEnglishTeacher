import type { Item } from '../content/types'
import { normalizeAnswer } from './answer'
import { pick, shuffle, type Rng } from './random'
import type { QuizKind } from './scoring'

export type ChoiceType = 'choice-en-es' | 'choice-es-en' | 'listen'
export type QuestionType = ChoiceType | 'type'

export type Question =
  | { id: string; type: ChoiceType; itemId: string; options: string[]; answer: string }
  | { id: string; type: 'type'; itemId: string }

export interface QuizOptions {
  rng: Rng
  /** Whether speech synthesis is available (enables `listen`). */
  audio: boolean
  /** Items used to draw wrong options from (usually the whole course). */
  pool: Item[]
  /** Mistake counters per item id; weak items are asked first. */
  mistakes?: Record<string, number>
  /** Items that must be asked, e.g. the ones missed in the previous attempt. */
  focus?: string[]
}

export const QUIZ_SIZE: Record<QuizKind, number> = {
  quiz5: 5,
  review20: 10,
  exam50: 15,
}

const MAX_TYPED_LENGTH = 24
const OPTION_COUNT = 4

function questionTypes(item: Item, audio: boolean): QuestionType[] {
  const types: QuestionType[] = ['choice-en-es', 'choice-es-en']
  if (audio) types.push('listen')
  if (item.en.length <= MAX_TYPED_LENGTH) types.push('type')
  return types
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

function makeQuestion(id: string, item: Item, opts: QuizOptions): Question {
  const type = pick(questionTypes(item, opts.audio), opts.rng)
  switch (type) {
    case 'choice-en-es':
      return { id, type, itemId: item.id, answer: item.es, options: shuffle([item.es, ...distractors(item, 'es', opts)], opts.rng) }
    case 'choice-es-en':
    case 'listen':
      return { id, type, itemId: item.id, answer: item.en, options: shuffle([item.en, ...distractors(item, 'en', opts)], opts.rng) }
    case 'type':
      return { id, type, itemId: item.id }
  }
}

/** Focus items first, then items with past mistakes, then the rest at random. */
function prioritise(items: Item[], opts: QuizOptions): Item[] {
  const focus = new Set(opts.focus ?? [])
  const mistakes = opts.mistakes ?? {}
  const shuffled = shuffle(items, opts.rng)
  const rank = (i: Item) => (focus.has(i.id) ? 2 : (mistakes[i.id] ?? 0) > 0 ? 1 : 0)
  return [...shuffled].sort((a, b) => rank(b) - rank(a) || (mistakes[b.id] ?? 0) - (mistakes[a.id] ?? 0))
}

/** One question per item, each item asked at most once. */
export function generateQuiz(kind: QuizKind, items: Item[], opts: QuizOptions): Question[] {
  const chosen = prioritise(items, opts).slice(0, QUIZ_SIZE[kind])
  return shuffle(chosen, opts.rng).map((item, i) => makeQuestion(`q${i + 1}`, item, opts))
}
