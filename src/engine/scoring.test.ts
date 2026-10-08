import { isPassed } from './scoring'

test('a quiz is passed only with every answer right', () => {
  expect(isPassed(5, 5)).toBe(true)
  expect(isPassed(4, 5)).toBe(false)
  expect(isPassed(0, 0)).toBe(false)
})
