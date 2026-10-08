export type QuizKind = 'quiz5' | 'review20' | 'exam50' | 'practice'

export const PASS_THRESHOLD: Record<QuizKind, number> = {
  quiz5: 0.7,
  review20: 0.75,
  exam50: 0.8,
  practice: 0,
}

export const LESSON_XP = 10
const XP_PER_CORRECT = 2
const PASS_BONUS = 5
const EXAM_BONUS = 50

// Guard against float noise such as 7/10 = 0.7000000000000001 vs 0.7.
const EPS = 1e-9

export function isPassing(score: number, kind: QuizKind): boolean {
  return score + EPS >= PASS_THRESHOLD[kind]
}

export function scoreToStars(score: number, kind: QuizKind): 0 | 1 | 2 | 3 {
  if (!isPassing(score, kind)) return 0
  if (score + EPS >= 1) return 3
  if (score + EPS >= 0.9) return 2
  return 1
}

export function quizXp(correct: number, passed: boolean, kind: QuizKind): number {
  let xp = correct * XP_PER_CORRECT
  if (passed) xp += PASS_BONUS
  if (passed && kind === 'exam50') xp += EXAM_BONUS
  return xp
}
