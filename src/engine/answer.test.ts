import { checkTyped, levenshtein, normalizeAnswer, tokenize } from './answer'

describe('normalizeAnswer', () => {
  test('lowercases, strips punctuation, collapses spaces and expands contractions', () => {
    expect(normalizeAnswer('I’m  HERE!')).toBe('i am here')
    expect(normalizeAnswer("What's your name?")).toBe('what is your name')
    expect(normalizeAnswer("I don't know.")).toBe('i do not know')
    expect(normalizeAnswer("I can't")).toBe('i can not')
    expect(normalizeAnswer("I won't")).toBe('i will not')
    expect(normalizeAnswer("We're, they'll, I've, she'd")).toBe('we are they will i have she would')
  })

  test('strips accents', () => {
    expect(normalizeAnswer('Café')).toBe('cafe')
  })
})

describe('levenshtein', () => {
  test('computes edit distance', () => {
    expect(levenshtein('house', 'house')).toBe(0)
    expect(levenshtein('hous', 'house')).toBe(1)
    expect(levenshtein('kitten', 'sitting')).toBe(3)
    expect(levenshtein('', 'abc')).toBe(3)
  })
})

describe('checkTyped', () => {
  test('exact and normalized answers are correct', () => {
    expect(checkTyped('house', { en: 'house' })).toBe('correct')
    expect(checkTyped('what is your name', { en: "What's your name?" })).toBe('correct')
    expect(checkTyped("I’m fine, thanks", { en: "I'm fine, thanks." })).toBe('correct')
  })

  test('small typos are accepted as typo', () => {
    expect(checkTyped('hous', { en: 'house' })).toBe('typo')
    expect(checkTyped('wher is the bathrom', { en: 'Where is the bathroom?' })).toBe('typo')
  })

  test('answers of 3 letters or fewer must be exact; up to 8 letters tolerate one edit', () => {
    expect(checkTyped('car', { en: 'cat' })).toBe('wrong')
    expect(checkTyped('blu', { en: 'blue' })).toBe('typo')
    expect(checkTyped('bl', { en: 'blue' })).toBe('wrong')
  })

  test('different words are wrong, empty input is wrong', () => {
    expect(checkTyped('car', { en: 'house' })).toBe('wrong')
    expect(checkTyped('   ', { en: 'a' })).toBe('wrong')
  })

  test('alternative answers are accepted', () => {
    expect(checkTyped('colour', { en: 'color', alt: ['colour'] })).toBe('correct')
    expect(checkTyped('hi', { en: 'hello', alt: ['hi'] })).toBe('correct')
  })

  test('verbs accept answers without the leading "to"', () => {
    expect(checkTyped('eat', { en: 'to eat' })).toBe('correct')
  })
})

describe('tokenize', () => {
  test('splits words and strips surrounding punctuation', () => {
    expect(tokenize('How are you?')).toEqual(['How', 'are', 'you'])
    expect(tokenize("I don't know, sorry.")).toEqual(['I', "don't", 'know', 'sorry'])
    expect(tokenize('  Nice   to meet you! ')).toEqual(['Nice', 'to', 'meet', 'you'])
  })

  test('normalizes curly apostrophes', () => {
    expect(tokenize('I’m here')).toEqual(["I'm", 'here'])
  })
})

describe('typo tolerance never accepts a different word', () => {
  // Words a learner could type that exist elsewhere in the course.
  const vocab = new Set(['red', 'bread', 'fire', 'block', 'waiter', 'get', 'find', 'who', 'angry', 'were', 'did'])

  test('real words that differ by one letter are wrong', () => {
    expect(checkTyped('red', { en: 'to read' }, vocab)).toBe('wrong')
    expect(checkTyped('bread', { en: 'to read' }, vocab)).toBe('wrong')
    expect(checkTyped('fire', { en: 'to hire' }, vocab)).toBe('wrong')
    expect(checkTyped('block', { en: 'black' }, vocab)).toBe('wrong')
    expect(checkTyped('waiter', { en: 'water' }, vocab)).toBe('wrong')
    expect(checkTyped('to get off', { en: 'to put off' }, vocab)).toBe('wrong')
    expect(checkTyped('to find out', { en: 'to fill out' }, vocab)).toBe('wrong')
  })

  test('changing a short word or a meaning in a phrase is wrong', () => {
    expect(checkTyped('Who are you?', { en: 'How are you?' }, vocab)).toBe('wrong')
    expect(checkTyped("I'm very angry.", { en: "I'm very hungry." }, vocab)).toBe('wrong')
    expect(checkTyped('How old were you?', { en: 'How old are you?' }, vocab)).toBe('wrong')
    expect(checkTyped('Where did you live?', { en: 'Where do you live?' }, vocab)).toBe('wrong')
    expect(checkTyped('How old you?', { en: 'How old are you?' }, vocab)).toBe('wrong')
  })

  test('genuine slips are still accepted as typos', () => {
    expect(checkTyped('reed', { en: 'to read' }, vocab)).toBe('typo')
    expect(checkTyped('good mornin', { en: 'Good morning!' }, vocab)).toBe('typo')
    expect(checkTyped('wher is the bathrom', { en: 'Where is the bathroom?' }, vocab)).toBe('typo')
    expect(checkTyped('good bye', { en: 'goodbye' }, vocab)).toBe('typo')
  })

  test('at most two words may have a slip', () => {
    expect(checkTyped('wher iz thee bathrom', { en: 'Where is the bathroom?' }, vocab)).toBe('wrong')
  })
})

test('two swapped letters count as one slip', () => {
  expect(levenshtein('nieghbor', 'neighbor')).toBe(1)
  expect(checkTyped('nieghbor', { en: 'neighbor' })).toBe('typo')
})
