import { createRng, sample, shuffle } from './random'

describe('random', () => {
  test('same seed gives the same sequence', () => {
    const a = createRng(42)
    const b = createRng(42)
    const seqA = Array.from({ length: 5 }, () => a())
    const seqB = Array.from({ length: 5 }, () => b())
    expect(seqA).toEqual(seqB)
    seqA.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(1)
    })
  })

  test('different seeds give different sequences', () => {
    expect(createRng(1)()).not.toEqual(createRng(2)())
  })

  test('shuffle keeps all elements and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8]
    const out = shuffle(input, createRng(7))
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect([...out].sort((x, y) => x - y)).toEqual(input)
  })

  test('sample returns n distinct elements (capped at length)', () => {
    const rng = createRng(3)
    const s = sample([1, 2, 3, 4, 5], 3, rng)
    expect(s).toHaveLength(3)
    expect(new Set(s).size).toBe(3)
    expect(sample([1, 2], 5, rng)).toHaveLength(2)
  })
})
