export type TypedResult = 'correct' | 'typo' | 'wrong'

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, 'will not'],
  [/\bcan't\b/g, 'can not'],
  [/\bcannot\b/g, 'can not'],
  [/n't\b/g, ' not'],
  [/'m\b/g, ' am'],
  [/'re\b/g, ' are'],
  [/'s\b/g, ' is'],
  [/'ll\b/g, ' will'],
  [/'ve\b/g, ' have'],
  [/'d\b/g, ' would'],
]

function straightenApostrophes(s: string): string {
  return s.replace(/[‘’ʼ`´]/g, "'")
}

/** Canonical form used to compare typed answers. */
export function normalizeAnswer(s: string): string {
  let out = straightenApostrophes(s.toLowerCase())
  for (const [re, rep] of CONTRACTIONS) out = out.replace(re, rep)
  return out
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[b.length]
}

function typoTolerance(answer: string): number {
  if (answer.length <= 3) return 0
  if (answer.length <= 8) return 1
  return 2
}

function acceptedAnswers(item: { en: string; alt?: string[] }): string[] {
  const out = new Set<string>()
  for (const raw of [item.en, ...(item.alt ?? [])]) {
    const n = normalizeAnswer(raw)
    if (!n) continue
    out.add(n)
    // "to eat" is also accepted as "eat".
    if (n.startsWith('to ')) out.add(n.slice(3))
  }
  return [...out]
}

export function checkTyped(input: string, item: { en: string; alt?: string[] }): TypedResult {
  const given = normalizeAnswer(input)
  if (!given) return 'wrong'
  const accepted = acceptedAnswers(item)
  if (accepted.includes(given)) return 'correct'
  const close = accepted.some((a) => levenshtein(given, a) <= typoTolerance(a))
  return close ? 'typo' : 'wrong'
}

/** Splits a phrase into word tiles, keeping inner apostrophes ("don't"). */
export function tokenize(s: string): string[] {
  return straightenApostrophes(s)
    .split(/\s+/)
    .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(Boolean)
}
