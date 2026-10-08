import type { Item } from '../content/types'
import { checkTyped, normalizeAnswer } from './answer'
import type { Question } from './quiz'

export type Response =
  | { kind: 'choice'; value: string }
  | { kind: 'text'; value: string }
  | { kind: 'tiles'; value: string[] }
  | { kind: 'match'; mistakes: number; wrongItemIds: string[] }

export interface Grade {
  correct: boolean
  /** Accepted, but with a spelling slip worth pointing out. */
  typo: boolean
}

const WRONG: Grade = { correct: false, typo: false }

export function gradeQuestion(q: Question, r: Response, getItem: (id: string) => Item | undefined): Grade {
  switch (q.type) {
    case 'choice-en-es':
    case 'choice-es-en':
    case 'listen':
      return r.kind === 'choice' && r.value === q.answer ? { correct: true, typo: false } : WRONG
    case 'type': {
      const item = getItem(q.itemId)
      if (r.kind !== 'text' || !item) return WRONG
      const result = checkTyped(r.value, item)
      return { correct: result !== 'wrong', typo: result === 'typo' }
    }
    case 'build': {
      const item = getItem(q.itemId)
      if (r.kind !== 'tiles' || !item) return WRONG
      const built = normalizeAnswer(r.value.join(' '))
      const ok = [item.en, ...(item.alt ?? [])].some((a) => normalizeAnswer(a) === built)
      return { correct: ok, typo: false }
    }
    case 'match':
      return r.kind === 'match' && r.mistakes === 0 ? { correct: true, typo: false } : WRONG
  }
}
