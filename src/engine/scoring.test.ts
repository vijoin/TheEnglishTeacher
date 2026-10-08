import { isPassing, LESSON_XP, PASS_THRESHOLD, quizXp, scoreToStars } from './scoring'

test('pass thresholds', () => {
  expect(PASS_THRESHOLD).toEqual({ quiz5: 0.7, review20: 0.75, exam50: 0.8, practice: 0 })
  expect(isPassing(0.69, 'quiz5')).toBe(false)
  expect(isPassing(0.7, 'quiz5')).toBe(true)
  expect(isPassing(0.74, 'review20')).toBe(false)
  expect(isPassing(0.8, 'exam50')).toBe(true)
})

test('stars', () => {
  expect(scoreToStars(0.69, 'quiz5')).toBe(0)
  expect(scoreToStars(0.7, 'quiz5')).toBe(1)
  expect(scoreToStars(0.9, 'quiz5')).toBe(2)
  expect(scoreToStars(1, 'quiz5')).toBe(3)
  expect(scoreToStars(0.79, 'exam50')).toBe(0)
})

test('xp', () => {
  expect(LESSON_XP).toBe(10)
  expect(quizXp(8, true, 'quiz5')).toBe(21)
  expect(quizXp(3, false, 'quiz5')).toBe(6)
  expect(quizXp(20, true, 'exam50')).toBe(95)
})
