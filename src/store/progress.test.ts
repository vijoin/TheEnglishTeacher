import { initialProgress, safeJSONStorage, STORAGE_KEY, useProgress } from './progress'

const TODAY = '2026-10-08'
const store = () => useProgress.getState()

beforeEach(() => {
  useProgress.setState(initialProgress())
})

describe('completeLesson', () => {
  test('marks the node, adds 10 XP and starts the streak', () => {
    expect(store().completeLesson('1:0', TODAY)).toBe(10)
    expect(store().completed['1:0']).toMatchObject({ attempts: 1, stars: 0 })
    expect(store().xp).toBe(10)
    expect(store().daily).toEqual({ date: TODAY, xp: 10 })
    expect(store().streak).toEqual({ count: 1, lastDate: TODAY })
  })

  test('replaying increments attempts', () => {
    store().completeLesson('1:0', TODAY)
    store().completeLesson('1:0', TODAY)
    expect(store().completed['1:0'].attempts).toBe(2)
  })
})

describe('recordQuiz', () => {
  test('a pass stores the result and XP', () => {
    const out = store().recordQuiz(
      { nodeId: '1:1', kind: 'quiz5', correct: 8, total: 8, wrongItemIds: [], rightItemIds: ['a'] },
      TODAY,
    )
    expect(out).toEqual({ score: 1, passed: true, stars: 3, xp: 21, isNewBest: true })
    expect(store().completed['1:1']).toMatchObject({ bestScore: 1, stars: 3, attempts: 1 })
    expect(store().xp).toBe(21)
  })

  test('a fail does not complete the node but counts mistakes and XP', () => {
    const out = store().recordQuiz(
      { nodeId: '1:1', kind: 'quiz5', correct: 3, total: 8, wrongItemIds: ['a', 'b'], rightItemIds: [] },
      TODAY,
    )
    expect(out.passed).toBe(false)
    expect(store().completed['1:1']).toBeUndefined()
    expect(store().mistakes).toEqual({ a: 1, b: 1 })
    expect(store().xp).toBe(6)
  })

  test('retries keep the best score and count attempts', () => {
    store().recordQuiz({ nodeId: '1:1', kind: 'quiz5', correct: 8, total: 8, wrongItemIds: [], rightItemIds: [] }, TODAY)
    const out = store().recordQuiz(
      { nodeId: '1:1', kind: 'quiz5', correct: 6, total: 8, wrongItemIds: [], rightItemIds: [] },
      TODAY,
    )
    expect(out.isNewBest).toBe(false)
    expect(store().completed['1:1']).toMatchObject({ bestScore: 1, stars: 3, attempts: 2 })
  })

  test('right answers pay back mistakes until they disappear', () => {
    useProgress.setState({ mistakes: { a: 2 } })
    store().recordQuiz({ nodeId: null, kind: 'practice', correct: 1, total: 1, wrongItemIds: [], rightItemIds: ['a'] }, TODAY)
    expect(store().mistakes).toEqual({ a: 1 })
    store().recordQuiz({ nodeId: null, kind: 'practice', correct: 1, total: 1, wrongItemIds: [], rightItemIds: ['a'] }, TODAY)
    expect(store().mistakes).toEqual({})
  })

  test('daily XP resets on a new day', () => {
    store().completeLesson('1:0', '2026-10-07')
    store().completeLesson('1:2', TODAY)
    expect(store().daily).toEqual({ date: TODAY, xp: 10 })
    expect(store().streak.count).toBe(2)
  })
})

test('updateSettings merges and reset keeps settings', () => {
  store().updateSettings({ theme: 'dark', dailyGoal: 50 })
  store().completeLesson('1:0', TODAY)
  store().reset()
  expect(store().completed).toEqual({})
  expect(store().xp).toBe(0)
  expect(store().settings).toMatchObject({ theme: 'dark', dailyGoal: 50, sfx: true })
})

test('state is persisted under the storage key', () => {
  store().completeLesson('1:0', TODAY)
  const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)
  expect(saved.state.completed['1:0']).toBeDefined()
  expect(saved.version).toBe(1)
})

describe('safeJSONStorage', () => {
  test('survives a storage that throws', () => {
    const broken = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('quota')
      },
      removeItem: () => {
        throw new Error('blocked')
      },
    } as unknown as Storage
    const s = safeJSONStorage(() => broken)
    expect(s.getItem('x')).toBeNull()
    expect(() => s.setItem('x', { state: {}, version: 1 })).not.toThrow()
    expect(() => s.removeItem('x')).not.toThrow()
  })

  test('returns null for corrupt JSON', () => {
    window.localStorage.setItem('x', '{not json')
    expect(safeJSONStorage(() => window.localStorage).getItem('x')).toBeNull()
  })
})
