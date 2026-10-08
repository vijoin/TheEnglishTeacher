import { buildCourse } from '../content/build'
import type { Item } from '../content/types'
import { makeLevelInput } from '../test/fixtures'
import { normalizeAnswer } from './answer'
import { buildLevelPath } from './path'
import { generateQuiz, QUIZ_SIZE, type Question, type QuizOptions } from './quiz'
import { createRng } from './random'
import type { QuizKind } from './scoring'

const course = buildCourse([makeLevelInput(1), makeLevelInput(2)])
const pool = course.flatMap((l) => l.items)
const level = course[0]
const path = buildLevelPath(level)
const byId = new Map(pool.map((i) => [i.id, i]))
const itemsOf = (nodeIndex: number) => path[nodeIndex].itemIds.map((id) => byId.get(id)!)

function quiz(kind: QuizKind, items: Item[], seed = 1, extra: Partial<QuizOptions> = {}) {
  return generateQuiz(kind, items, { rng: createRng(seed), audio: true, pool, ...extra })
}

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1)

test('quiz sizes are 5, 10 and 15', () => {
  expect(QUIZ_SIZE).toEqual({ quiz5: 5, review20: 10, exam50: 15 })
  expect(quiz('quiz5', itemsOf(1))).toHaveLength(5)
  expect(quiz('review20', itemsOf(8))).toHaveLength(10)
  expect(quiz('exam50', itemsOf(22))).toHaveLength(15)
})

test('each question asks a different item and quiz5 asks all five', () => {
  for (const seed of SEEDS) {
    const q5 = quiz('quiz5', itemsOf(1), seed)
    expect(new Set(q5.map((q) => q.itemId))).toEqual(new Set(path[1].itemIds))
    const exam = quiz('exam50', itemsOf(22), seed)
    expect(new Set(exam.map((q) => q.itemId)).size).toBe(15)
  }
})

test('a retake always asks the items that were missed', () => {
  const items = itemsOf(22)
  const missed = [items[2].id, items[30].id, items[49].id]
  for (const seed of SEEDS) {
    const asked = new Set(quiz('exam50', items, seed, { focus: missed }).map((q) => q.itemId))
    missed.forEach((id) => expect(asked.has(id)).toBe(true))
  }
})

test('reviews prioritise items with past mistakes', () => {
  const items = itemsOf(8)
  const weak = [items[3].id, items[11].id, items[19].id]
  for (const seed of SEEDS.slice(0, 10)) {
    const asked = new Set(quiz('review20', items, seed, { mistakes: Object.fromEntries(weak.map((id) => [id, 2])) }).map((q) => q.itemId))
    weak.forEach((id) => expect(asked.has(id)).toBe(true))
  }
})

describe('question validity', () => {
  const all: Question[] = SEEDS.flatMap((seed) => [
    ...quiz('quiz5', itemsOf(1), seed),
    ...quiz('review20', itemsOf(8), seed),
    ...quiz('exam50', itemsOf(22), seed),
  ])

  test('only the four simple question types are used', () => {
    const types = new Set(all.map((q) => q.type))
    expect([...types].sort()).toEqual(['choice-en-es', 'choice-es-en', 'listen', 'type'])
  })

  test('choice questions have 4 unique options including the answer', () => {
    for (const q of all) {
      if (q.type === 'type') continue
      const item = byId.get(q.itemId)!
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options.map(normalizeAnswer)).size).toBe(4)
      expect(q.options).toContain(q.answer)
      expect(q.answer).toBe(q.type === 'choice-en-es' ? item.es : item.en)
    }
  })

  test('distractors come from the same level and kind when possible', () => {
    for (const q of all) {
      if (q.type !== 'choice-es-en') continue
      const item = byId.get(q.itemId)!
      for (const opt of q.options) {
        const other = pool.find((i) => i.en === opt)!
        expect(other.levelId).toBe(item.levelId)
        expect(other.kind).toBe(item.kind)
      }
    }
  })

  test('typing is only asked for short answers', () => {
    all.filter((q) => q.type === 'type').forEach((q) => expect(byId.get(q.itemId)!.en.length).toBeLessThanOrEqual(24))
  })

  test('question ids are unique within a quiz', () => {
    const q = quiz('exam50', itemsOf(22))
    expect(new Set(q.map((x) => x.id)).size).toBe(q.length)
  })
})

test('no listen questions without audio', () => {
  for (const seed of SEEDS) expect(quiz('exam50', itemsOf(22), seed, { audio: false }).some((q) => q.type === 'listen')).toBe(false)
})

test('generation is deterministic for a seed', () => {
  expect(quiz('review20', itemsOf(8), 99)).toEqual(quiz('review20', itemsOf(8), 99))
})
