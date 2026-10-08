import { checkTyped, normalizeAnswer, tokenize } from '../engine/answer'
import { KNOWN_WORDS } from '../features/course'
import { ALL_ITEMS, COURSE, getItem, getLevel } from './index'

const norm = (s: string) => normalizeAnswer(s)

test('6 levels with ids 1..6', () => {
  expect(COURSE.map((l) => l.id)).toEqual([1, 2, 3, 4, 5, 6])
  expect(new Set(COURSE.map((l) => l.color)).size).toBe(6)
})

test.each(COURSE.map((l) => [l.id, l] as const))('level %i has 10 lessons × 5 items', (_, level) => {
  expect(level.lessons).toHaveLength(10)
  level.lessons.forEach((lesson) => {
    expect(lesson.items).toHaveLength(5)
    expect(lesson.title.trim()).not.toBe('')
    expect(lesson.emoji.trim()).not.toBe('')
  })
  expect(level.items).toHaveLength(50)
})

test('item ids follow the level-lesson-item pattern', () => {
  ALL_ITEMS.forEach((i) => expect(i.id).toMatch(/^\d-\d{2}-[1-5]$/))
  expect(getItem('1-01-1')?.levelId).toBe(1)
  expect(getLevel(6)?.title).toBeTruthy()
})

test('English is unique across the whole course', () => {
  const seen = new Map<string, string>()
  const dups: string[] = []
  for (const i of ALL_ITEMS) {
    const k = norm(i.en)
    if (seen.has(k)) dups.push(`${i.id} "${i.en}" duplicates ${seen.get(k)}`)
    seen.set(k, i.id)
  }
  expect(dups).toEqual([])
})

test.each(COURSE.map((l) => [l.id, l] as const))('level %i: Spanish is unique and the mix is balanced', (_, level) => {
  const es = level.items.map((i) => norm(i.es))
  expect(new Set(es).size).toBe(es.length)
  expect(level.items.filter((i) => i.kind === 'word').length).toBeGreaterThanOrEqual(15)
  expect(level.items.filter((i) => i.kind === 'phrase').length).toBeGreaterThanOrEqual(15)
})

test('every item is well formed', () => {
  for (const i of ALL_ITEMS) {
    expect(i.examples, i.id).toHaveLength(3)
    for (const s of [i.en, i.es, ...i.examples.flatMap((e) => [e.en, e.es])]) {
      expect(s, i.id).toBe(s.trim())
      expect(s.length, i.id).toBeGreaterThan(0)
    }
    expect(i.en, i.id).not.toMatch(/[‘’]/)
    expect(i.en, i.id).not.toMatch(/\.\.\.|…|\//)
    if (i.kind === 'phrase') expect(tokenize(i.en).length, i.id).toBeLessThanOrEqual(10)
    if (i.note) expect(i.note.length, i.id).toBeLessThanOrEqual(140)
  }
})

test("typing another item's English is never accepted as a typo", () => {
  // Exact matches stay valid (typing "book" for "to book" is right).
  const accepted: string[] = []
  for (const a of ALL_ITEMS) {
    for (const b of ALL_ITEMS) {
      if (a !== b && checkTyped(b.en, a, KNOWN_WORDS) === 'typo') accepted.push(`${b.en} → ${a.en}`)
    }
  }
  expect(accepted).toEqual([])
})
