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

const MIN_FUZZY_WORD = 4
const MAX_SLIPPED_WORDS = 2

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

/**
 * A slip is a missing/extra space, or up to two words each off by one letter.
 * Short words never get leeway, and a word that is itself a known English
 * word ("red" for "read", "fire" for "hire") is a different answer, not a slip.
 */
function isSlip(given: string, target: string, vocabulary: ReadonlySet<string>): boolean {
  if (given.replace(/ /g, '') === target.replace(/ /g, '')) return true
  const g = given.split(' ')
  const t = target.split(' ')
  if (g.length !== t.length) return false
  let slipped = 0
  for (let i = 0; i < t.length; i++) {
    if (g[i] === t[i]) continue
    slipped++
    if (slipped > MAX_SLIPPED_WORDS) return false
    if (t[i].length < MIN_FUZZY_WORD || levenshtein(g[i], t[i]) > 1 || vocabulary.has(g[i])) return false
  }
  return slipped > 0
}

/** `vocabulary` lists known English words (normalized) to tell slips from other words. */
export function checkTyped(input: string, item: { en: string; alt?: string[] }, vocabulary: ReadonlySet<string> = new Set()): TypedResult {
  const given = normalizeAnswer(input)
  if (!given) return 'wrong'
  const accepted = acceptedAnswers(item)
  if (accepted.includes(given)) return 'correct'
  return accepted.some((a) => isSlip(given, a, vocabulary)) ? 'typo' : 'wrong'
}

/** Splits a phrase into word tiles, keeping inner apostrophes ("don't"). */
export function tokenize(s: string): string[] {
  return straightenApostrophes(s)
    .split(/\s+/)
    .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(Boolean)
}
