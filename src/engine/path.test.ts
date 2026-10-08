import { buildCourse } from '../content/build'
import { makeLevelInput } from '../test/fixtures'
import { buildCoursePath, buildLevelPath, getNodeStatuses, isLevelUnlocked, learnedItemIds, nextNodeId } from './path'

const course = buildCourse([makeLevelInput(1), makeLevelInput(2)])
const level = course[0]

describe('buildLevelPath', () => {
  const path = buildLevelPath(level)

  test('has 23 nodes in the 5 / 20 / 50 rhythm', () => {
    expect(path.map((n) => n.kind)).toEqual([
      'lesson', 'quiz5', 'lesson', 'quiz5', 'lesson', 'quiz5', 'lesson', 'quiz5', 'review20',
      'lesson', 'quiz5', 'lesson', 'quiz5', 'lesson', 'quiz5', 'lesson', 'quiz5', 'review20',
      'lesson', 'quiz5', 'lesson', 'quiz5', 'exam50',
    ])
    expect(path.map((n) => n.id)).toEqual(path.map((_, i) => `1:${i}`))
  })

  test('lessons and quiz5 cover the 5 items of their lesson', () => {
    expect(path[0].itemIds).toEqual(level.lessons[0].items.map((i) => i.id))
    expect(path[1].itemIds).toEqual(path[0].itemIds)
    expect(path[1].lessonIndex).toBe(0)
    expect(path[20].lessonIndex).toBe(9)
  })

  test('reviews cover 20 items and the exam covers 50', () => {
    expect(path[8].itemIds).toEqual(level.items.slice(0, 20).map((i) => i.id))
    expect(path[17].itemIds).toEqual(level.items.slice(20, 40).map((i) => i.id))
    expect(path[22].itemIds).toEqual(level.items.map((i) => i.id))
  })

  test('titles', () => {
    expect(path[0].title).toBe('Lesson 1')
    expect(path[1].title).toBe('Quiz')
    expect(path[8].title).toBe('Repaso')
    expect(path[22].title).toBe('Examen del nivel')
  })
})

describe('statuses and unlocking', () => {
  const path = buildCoursePath(course)

  test('initially only the first node is available', () => {
    const s = getNodeStatuses(path, {})
    expect(s['1:0']).toBe('available')
    expect(s['1:1']).toBe('locked')
    expect(s['2:0']).toBe('locked')
  })

  test('completing a node unlocks the next one', () => {
    const s = getNodeStatuses(path, { '1:0': {} })
    expect(s['1:0']).toBe('completed')
    expect(s['1:1']).toBe('available')
    expect(s['1:2']).toBe('locked')
  })

  test('the next level unlocks only after passing the level exam', () => {
    const almost = Object.fromEntries(path.slice(0, 22).map((n) => [n.id, {}]))
    expect(isLevelUnlocked(2, path, almost)).toBe(false)
    expect(getNodeStatuses(path, almost)['1:22']).toBe('available')
    const done = { ...almost, '1:22': {} }
    expect(isLevelUnlocked(1, path, {})).toBe(true)
    expect(isLevelUnlocked(2, path, done)).toBe(true)
    expect(getNodeStatuses(path, done)['2:0']).toBe('available')
  })

  test('learned items come from completed lessons only', () => {
    expect(learnedItemIds(path, { '1:0': {}, '1:1': {} })).toEqual(level.lessons[0].items.map((i) => i.id))
    expect(learnedItemIds(path, {})).toEqual([])
  })

  test('nextNodeId', () => {
    expect(nextNodeId(path, '1:0')).toBe('1:1')
    expect(nextNodeId(path, '1:22')).toBe('2:0')
    expect(nextNodeId(path, '2:22')).toBeNull()
  })
})
