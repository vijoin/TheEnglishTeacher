import type { Item } from '../content/types'
import { gradeQuestion } from './grade'

const item: Item = {
  id: '1-01-1',
  levelId: 1,
  lessonIndex: 0,
  en: 'How are you?',
  es: '¿Cómo estás?',
  kind: 'phrase',
  example: { en: 'How are you?', es: '¿Cómo estás?' },
  alt: ['How are you doing?'],
}
const lookup = (id: string) => (id === item.id ? item : undefined)

test('choice questions compare the selected option', () => {
  const q = { id: 'q1', type: 'choice-es-en' as const, itemId: item.id, options: [], answer: 'How are you?' }
  expect(gradeQuestion(q, { kind: 'choice', value: 'How are you?' }, lookup)).toEqual({ correct: true, typo: false })
  expect(gradeQuestion(q, { kind: 'choice', value: 'Who are you?' }, lookup)).toEqual({ correct: false, typo: false })
})

test('typed answers accept typos but flag them', () => {
  const q = { id: 'q1', type: 'type' as const, itemId: item.id }
  expect(gradeQuestion(q, { kind: 'text', value: 'how are you' }, lookup)).toEqual({ correct: true, typo: false })
  expect(gradeQuestion(q, { kind: 'text', value: 'how ar you' }, lookup)).toEqual({ correct: true, typo: true })
  expect(gradeQuestion(q, { kind: 'text', value: 'how old are you' }, lookup)).toEqual({ correct: false, typo: false })
})

test('built phrases must be in the exact order', () => {
  const q = { id: 'q1', type: 'build' as const, itemId: item.id, tiles: [] }
  expect(gradeQuestion(q, { kind: 'tiles', value: ['How', 'are', 'you'] }, lookup).correct).toBe(true)
  expect(gradeQuestion(q, { kind: 'tiles', value: ['are', 'How', 'you'] }, lookup).correct).toBe(false)
  expect(gradeQuestion(q, { kind: 'tiles', value: ['How', 'are', 'you', 'doing'] }, lookup).correct).toBe(true)
})

test('match is correct only without mistakes', () => {
  const q = { id: 'q1', type: 'match' as const, itemIds: [item.id] }
  expect(gradeQuestion(q, { kind: 'match', mistakes: 0, wrongItemIds: [] }, lookup).correct).toBe(true)
  expect(gradeQuestion(q, { kind: 'match', mistakes: 1, wrongItemIds: [item.id] }, lookup).correct).toBe(false)
})

test('a response of the wrong kind is incorrect', () => {
  const q = { id: 'q1', type: 'type' as const, itemId: item.id }
  expect(gradeQuestion(q, { kind: 'choice', value: 'How are you?' }, lookup).correct).toBe(false)
})
