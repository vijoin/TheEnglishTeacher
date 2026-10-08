import { buildCourse } from '../content/build'
import type { Item } from '../content/types'
import { makeLevelInput } from '../test/fixtures'
import { normalizeAnswer, tokenize } from './answer'
import { buildLevelPath } from './path'
import { generateQuiz, questionItemIds, type Question } from './quiz'
import { createRng } from './random'
import type { QuizKind } from './scoring'

const course = buildCourse([makeLevelInput(1), makeLevelInput(2)])
const pool = course.flatMap((l) => l.items)
const level = course[0]
const path = buildLevelPath(level)
const byId = new Map(pool.map((i) => [i.id, i]))
const itemsOf = (nodeIndex: number) => path[nodeIndex].itemIds.map((id) => byId.get(id)!)

function quiz(kind: QuizKind, items: Item[], seed = 1, extra: Partial<Parameters<typeof generateQuiz>[2]> = {}) {
  return generateQuiz(kind, items, { rng: createRng(seed), audio: true, pool, ...extra })
}

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1)

describe('generateQuiz sizes', () => {
  test('quiz5 has 8, review20 has 15, exam50 has 25 questions', () => {
    expect(quiz('quiz5', itemsOf(1))).toHaveLength(8)
    expect(quiz('review20', itemsOf(8))).toHaveLength(15)
    expect(quiz('exam50', itemsOf(22))).toHaveLength(25)
  })

  test('practice: one question per item plus a match when there are 4+ items', () => {
    const six = level.items.slice(0, 6)
    const p6 = quiz('practice', six)
    expect(p6).toHaveLength(7)
    expect(p6.filter((q) => q.type === 'match')).toHaveLength(1)
    expect(quiz('practice', level.items.slice(0, 3))).toHaveLength(3)
  })

  test('each quiz has exactly one match question', () => {
    for (const [kind, node] of [['quiz5', 1], ['review20', 8], ['exam50', 22]] as const) {
      expect(quiz(kind, itemsOf(node)).filter((q) => q.type === 'match')).toHaveLength(1)
    }
  })
})

describe('coverage', () => {
  test('every quiz5 item appears', () => {
    for (const seed of SEEDS) {
      const items = itemsOf(1)
      const covered = new Set(quiz('quiz5', items, seed).filter((q) => q.type !== 'match').flatMap(questionItemIds))
      items.forEach((i) => expect(covered.has(i.id)).toBe(true))
    }
  })

  test('exam50 asks 24 different items', () => {
    const singles = quiz('exam50', itemsOf(22)).filter((q) => q.type !== 'match')
    expect(new Set(singles.flatMap(questionItemIds)).size).toBe(24)
  })

  test('review20 prioritises items with mistakes', () => {
    const items = itemsOf(8)
    const weak = [items[3].id, items[11].id, items[19].id]
    for (const seed of SEEDS.slice(0, 10)) {
      const qs = quiz('review20', items, seed, { mistakes: Object.fromEntries(weak.map((id) => [id, 2])) })
      const asked = new Set(qs.filter((q) => q.type !== 'match').flatMap(questionItemIds))
      weak.forEach((id) => expect(asked.has(id)).toBe(true))
    }
  })
})

describe('question validity', () => {
  const all: Question[] = SEEDS.flatMap((seed) => [
    ...quiz('quiz5', itemsOf(1), seed),
    ...quiz('review20', itemsOf(8), seed),
    ...quiz('exam50', itemsOf(22), seed),
  ])

  test('choice questions have 4 unique options including the answer', () => {
    const choices = all.filter((q) => q.type === 'choice-en-es' || q.type === 'choice-es-en' || q.type === 'listen')
    expect(choices.length).toBeGreaterThan(0)
    for (const q of choices) {
      if (!('options' in q)) throw new Error('unreachable')
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

  test('build questions are phrases with 3+ tokens and 2 extra tiles', () => {
    const builds = all.filter((q) => q.type === 'build')
    expect(builds.length).toBeGreaterThan(0)
    for (const q of builds) {
      if (q.type !== 'build') throw new Error('unreachable')
      const item = byId.get(q.itemId)!
      const tokens = tokenize(item.en)
      expect(item.kind).toBe('phrase')
      expect(tokens.length).toBeGreaterThanOrEqual(3)
      expect(q.tiles).toHaveLength(tokens.length + 2)
      const remaining = [...q.tiles]
      for (const t of tokens) {
        const i = remaining.indexOf(t)
        expect(i).toBeGreaterThanOrEqual(0)
        remaining.splice(i, 1)
      }
      remaining.forEach((t) => expect(tokens.map((x) => x.toLowerCase())).not.toContain(t.toLowerCase()))
    }
  })

  test('type questions only for short answers', () => {
    const typed = all.filter((q) => q.type === 'type')
    expect(typed.length).toBeGreaterThan(0)
    typed.forEach((q) => expect(byId.get(questionItemIds(q)[0])!.en.length).toBeLessThanOrEqual(24))
  })

  test('match questions have 4-5 items with unique texts', () => {
    for (const q of all) {
      if (q.type !== 'match') continue
      const items = q.itemIds.map((id) => byId.get(id)!)
      expect(items.length).toBeGreaterThanOrEqual(4)
      expect(items.length).toBeLessThanOrEqual(5)
      expect(new Set(items.map((i) => normalizeAnswer(i.en))).size).toBe(items.length)
      expect(new Set(items.map((i) => normalizeAnswer(i.es))).size).toBe(items.length)
    }
  })

  test('question ids are unique within a quiz', () => {
    const q = quiz('exam50', itemsOf(22))
    expect(new Set(q.map((x) => x.id)).size).toBe(q.length)
  })
})

describe('audio', () => {
  test('no listen questions when audio is unavailable', () => {
    for (const seed of SEEDS) {
      const qs = quiz('exam50', itemsOf(22), seed, { audio: false })
      expect(qs.some((q) => q.type === 'listen')).toBe(false)
    }
  })

  test('listen questions appear when audio is available', () => {
    const qs = SEEDS.flatMap((seed) => quiz('exam50', itemsOf(22), seed))
    expect(qs.some((q) => q.type === 'listen')).toBe(true)
  })
})

test('generation is deterministic for a seed', () => {
  expect(quiz('review20', itemsOf(8), 99)).toEqual(quiz('review20', itemsOf(8), 99))
})
