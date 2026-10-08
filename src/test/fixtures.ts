import type { ItemInput, LevelInput } from '../content/types'

/** A synthetic 10×5 level: odd items are words, even items are 4-word phrases. */
export function makeLevelInput(id: number): LevelInput {
  return {
    id,
    title: `Level ${id}`,
    subtitle: 'Test level',
    cefr: 'A1',
    emoji: '⭐',
    color: 'emerald',
    lessons: Array.from({ length: 10 }, (_, li) => ({
      title: `Lesson ${li + 1}`,
      emoji: '📘',
      items: Array.from({ length: 5 }, (_, ii): ItemInput => {
        const n = `${id}x${li + 1}x${ii + 1}`
        return ii % 2 === 0
          ? { en: `word${n}`, es: `palabra${n}`, kind: 'word', example: { en: `A word${n}.`, es: `Una palabra${n}.` } }
          : {
              en: `This is phrase p${n}.`,
              es: `Esta es la frase f${n}.`,
              kind: 'phrase',
              example: { en: `This is phrase p${n}.`, es: `Esta es la frase f${n}.` },
            }
      }),
    })),
  }
}
