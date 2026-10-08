import { initialProgress, migrateProgress, safeJSONStorage, STORAGE_KEY, useProgress } from './progress'

const store = () => useProgress.getState()

beforeEach(() => {
  useProgress.setState(initialProgress())
})

test('completing a lesson marks the step', () => {
  store().completeLesson('1:0')
  expect(store().completed['1:0']).toBeDefined()
})

test('a quiz with every answer right completes the step', () => {
  const out = store().recordQuiz({ stepId: '1:1', correct: 5, total: 5, wrongItemIds: [], rightItemIds: ['a'] })
  expect(out.passed).toBe(true)
  expect(store().completed['1:1']).toBeDefined()
})

test('any wrong answer leaves the step open and counts the mistakes', () => {
  const out = store().recordQuiz({ stepId: '1:1', correct: 4, total: 5, wrongItemIds: ['a'], rightItemIds: ['b'] })
  expect(out.passed).toBe(false)
  expect(store().completed['1:1']).toBeUndefined()
  expect(store().mistakes).toEqual({ a: 1 })
})

test('right answers pay back mistakes until they disappear', () => {
  useProgress.setState({ mistakes: { a: 2 } })
  store().recordQuiz({ stepId: '1:1', correct: 1, total: 1, wrongItemIds: [], rightItemIds: ['a'] })
  expect(store().mistakes).toEqual({ a: 1 })
  store().recordQuiz({ stepId: '1:1', correct: 1, total: 1, wrongItemIds: [], rightItemIds: ['a'] })
  expect(store().mistakes).toEqual({})
})

test('updateSettings merges and reset keeps settings', () => {
  store().updateSettings({ theme: 'dark', rate: 0.75 })
  store().completeLesson('1:0')
  store().reset()
  expect(store().completed).toEqual({})
  expect(store().settings).toMatchObject({ theme: 'dark', rate: 0.75, autoplay: true })
})

test('state is persisted under the storage key with version 2', () => {
  store().completeLesson('1:0')
  const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)
  expect(saved.state.completed['1:0']).toBeDefined()
  expect(saved.version).toBe(2)
})

test('v1 progress migrates: steps, mistakes and compatible settings survive', () => {
  const v1 = {
    version: 1,
    completed: { '1:0': { bestScore: 1, stars: 0, attempts: 1, completedAt: '2026-10-08' } },
    xp: 30,
    streak: { count: 2, lastDate: '2026-10-08' },
    daily: { date: '2026-10-08', xp: 30 },
    mistakes: { '1-01-2': 1 },
    settings: { theme: 'dark', sfx: false, voiceURI: null, rate: 0.75, dailyGoal: 50, autoplay: false },
  }
  const v2 = migrateProgress(v1, 1)
  expect(v2).toEqual({
    version: 2,
    completed: { '1:0': { completedAt: '2026-10-08' } },
    mistakes: { '1-01-2': 1 },
    settings: { theme: 'dark', voiceURI: null, rate: 0.75, autoplay: false },
  })
})

test('migrating garbage yields a fresh start', () => {
  expect(migrateProgress(null, 1)).toEqual(initialProgress())
  expect(migrateProgress('oops', 1)).toEqual(initialProgress())
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
    expect(() => s.setItem('x', { state: {}, version: 2 })).not.toThrow()
    expect(() => s.removeItem('x')).not.toThrow()
  })

  test('returns null for corrupt JSON', () => {
    window.localStorage.setItem('x', '{not json')
    expect(safeJSONStorage(() => window.localStorage).getItem('x')).toBeNull()
  })
})
