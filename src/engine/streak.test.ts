import { currentStreak, registerActivity, toDateKey } from './streak'

test('toDateKey uses the local date', () => {
  expect(toDateKey(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
})

test('registerActivity', () => {
  expect(registerActivity({ count: 0, lastDate: null }, '2026-10-08')).toEqual({ count: 1, lastDate: '2026-10-08' })
  expect(registerActivity({ count: 3, lastDate: '2026-10-08' }, '2026-10-08')).toEqual({ count: 3, lastDate: '2026-10-08' })
  expect(registerActivity({ count: 3, lastDate: '2026-10-07' }, '2026-10-08')).toEqual({ count: 4, lastDate: '2026-10-08' })
  expect(registerActivity({ count: 3, lastDate: '2026-10-05' }, '2026-10-08')).toEqual({ count: 1, lastDate: '2026-10-08' })
  // Month boundary
  expect(registerActivity({ count: 2, lastDate: '2026-09-30' }, '2026-10-01')).toEqual({ count: 3, lastDate: '2026-10-01' })
})

test('currentStreak drops to 0 after a missed day', () => {
  expect(currentStreak({ count: 5, lastDate: '2026-10-08' }, '2026-10-08')).toBe(5)
  expect(currentStreak({ count: 5, lastDate: '2026-10-07' }, '2026-10-08')).toBe(5)
  expect(currentStreak({ count: 5, lastDate: '2026-10-06' }, '2026-10-08')).toBe(0)
  expect(currentStreak({ count: 0, lastDate: null }, '2026-10-08')).toBe(0)
})
