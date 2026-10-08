export type ItemKind = 'word' | 'phrase'

export type LevelColor = 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'indigo'

export interface Example {
  en: string
  es: string
}

/** A word or phrase as authored in a level file. */
export interface ItemInput {
  en: string
  es: string
  kind: ItemKind
  /** Three short sentences showing how the word or phrase is used. */
  examples: Example[]
  /** Other English answers accepted when the learner types the answer. */
  alt?: string[]
  /** Short tip in Spanish shown on the lesson card. */
  note?: string
}

export interface LessonInput {
  title: string
  emoji: string
  items: ItemInput[]
}

export interface LevelInput {
  id: number
  title: string
  subtitle: string
  cefr: string
  emoji: string
  color: LevelColor
  lessons: LessonInput[]
}

export interface Item extends ItemInput {
  /** `${levelId}-${lesson 2 digits}-${item 1-based}`, e.g. `1-03-2`. */
  id: string
  levelId: number
  /** 0-based lesson index inside the level. */
  lessonIndex: number
}

export interface Lesson {
  index: number
  title: string
  emoji: string
  items: Item[]
}

export interface Level extends Omit<LevelInput, 'lessons'> {
  lessons: Lesson[]
  items: Item[]
}
