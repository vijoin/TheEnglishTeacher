export type QuizKind = 'quiz5' | 'review20' | 'exam50'

/** A quiz only counts as passed when every answer is right. */
export function isPassed(correct: number, total: number): boolean {
  return total > 0 && correct === total
}
