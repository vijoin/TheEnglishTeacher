import type { Item, Level, LevelInput } from './types'

export function itemId(levelId: number, lessonIndex: number, itemIndex: number): string {
  return `${levelId}-${String(lessonIndex + 1).padStart(2, '0')}-${itemIndex + 1}`
}

/** Turns authored level files into the runtime course with derived ids. */
export function buildCourse(inputs: LevelInput[]): Level[] {
  return inputs.map(({ lessons, ...meta }) => {
    const built = lessons.map((lesson, lessonIndex) => ({
      index: lessonIndex,
      title: lesson.title,
      emoji: lesson.emoji,
      items: lesson.items.map(
        (item, itemIndex): Item => ({ ...item, id: itemId(meta.id, lessonIndex, itemIndex), levelId: meta.id, lessonIndex }),
      ),
    }))
    return { ...meta, lessons: built, items: built.flatMap((l) => l.items) }
  })
}
