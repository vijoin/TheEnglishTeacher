import type { Item } from '../content/types'
import { checkTyped } from './answer'
import type { Question } from './quiz'

export type Response = { kind: 'choice'; value: string } | { kind: 'text'; value: string }

export interface Grade {
  correct: boolean
  /** Accepted, but with a spelling slip worth pointing out. */
  typo: boolean
}

const WRONG: Grade = { correct: false, typo: false }

export function gradeQuestion(
  q: Question,
  r: Response,
  getItem: (id: string) => Item | undefined,
  vocabulary?: ReadonlySet<string>,
): Grade {
  if (q.type === 'type') {
    const item = getItem(q.itemId)
    if (r.kind !== 'text' || !item) return WRONG
    const result = checkTyped(r.value, item, vocabulary)
    return { correct: result !== 'wrong', typo: result === 'typo' }
  }
  return r.kind === 'choice' && r.value === q.answer ? { correct: true, typo: false } : WRONG
}
