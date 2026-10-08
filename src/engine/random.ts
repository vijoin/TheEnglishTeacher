export type Rng = () => number

/** Deterministic PRNG (mulberry32) returning floats in [0, 1). */
export function createRng(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randomInt(max: number, rng: Rng): number {
  return Math.floor(rng() * max)
}

/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, rng)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function sample<T>(items: readonly T[], n: number, rng: Rng): T[] {
  return shuffle(items, rng).slice(0, Math.max(0, n))
}

export function pick<T>(items: readonly T[], rng: Rng): T {
  return items[randomInt(items.length, rng)]
}
