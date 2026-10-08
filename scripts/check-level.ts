// Usage: node scripts/check-level.ts <levelNumber>
// Validates one authored level file (structure, uniqueness, style rules).
const n = Number(process.argv[2])
const mod = await import(`../src/content/levels/level${n}.ts`)
const level = mod[`level${n}`]
const errors: string[] = []
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim()

if (!level) errors.push(`missing export level${n}`)
else {
  if (level.id !== n) errors.push(`id should be ${n}`)
  if (level.lessons.length !== 10) errors.push(`expected 10 lessons, got ${level.lessons.length}`)
  const en = new Map<string, string>()
  const es = new Map<string, string>()
  let words = 0
  let phrases = 0
  level.lessons.forEach((lesson: any, li: number) => {
    if (lesson.items.length !== 5) errors.push(`lesson ${li + 1} "${lesson.title}" has ${lesson.items.length} items`)
    lesson.items.forEach((item: any, ii: number) => {
      const where = `L${li + 1}.${ii + 1} "${item.en}"`
      for (const f of ['en', 'es'] as const) {
        if (typeof item[f] !== 'string' || !item[f].trim() || item[f] !== item[f].trim()) errors.push(`${where}: bad ${f}`)
      }
      if (!item.example?.en?.trim() || !item.example?.es?.trim()) errors.push(`${where}: missing example`)
      if (item.kind === 'word') words++
      else if (item.kind === 'phrase') phrases++
      else errors.push(`${where}: bad kind`)
      if (item.note && item.note.length > 140) errors.push(`${where}: note too long`)
      const k = norm(item.en)
      if (en.has(k)) errors.push(`${where}: duplicate en with ${en.get(k)}`)
      en.set(k, where)
      const ks = norm(item.es)
      if (es.has(ks)) errors.push(`${where}: duplicate es "${item.es}" with ${es.get(ks)}`)
      es.set(ks, where)
      if (item.kind === 'word' && item.en.split(/\s+/).length > 3) errors.push(`${where}: word kind with >3 tokens`)
    })
  })
  if (words < 15) errors.push(`only ${words} words (need >= 15)`)
  if (phrases < 15) errors.push(`only ${phrases} phrases (need >= 15)`)
  console.log(`level ${n}: ${words} words, ${phrases} phrases`)
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('OK')
