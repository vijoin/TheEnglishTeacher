import { ALL_ITEMS, COURSE, getItem, getLevel } from '../content'
import type { Item } from '../content/types'
import { normalizeAnswer } from '../engine/answer'
import { buildCoursePath, type PathNode } from '../engine/path'

export { ALL_ITEMS, COURSE, getItem, getLevel }

export const COURSE_PATH: PathNode[] = buildCoursePath(COURSE)

const nodesById = new Map(COURSE_PATH.map((n) => [n.id, n]))

/** Every English word used in the course, to tell typos from other words. */
export const KNOWN_WORDS: ReadonlySet<string> = new Set(
  ALL_ITEMS.flatMap((i) => [i.en, ...(i.alt ?? []), ...i.examples.map((e) => e.en)]).flatMap((t) => normalizeAnswer(t).split(' ')),
)

export function getNode(id: string): PathNode | undefined {
  return nodesById.get(id)
}

export function nodeItems(node: PathNode): Item[] {
  return node.itemIds.map((id) => getItem(id)).filter((i): i is Item => !!i)
}

/** Human label for a step, e.g. "Lección 3 · Presentarse". */
export function nodeLabel(node: PathNode): string {
  switch (node.kind) {
    case 'lesson':
      return `Lección ${node.lessonIndex + 1} · ${node.title}`
    case 'quiz5':
      return `Quiz de la lección ${node.lessonIndex + 1}`
    case 'review20': {
      const level = getLevel(node.levelId)!
      const first = level.items.findIndex((i) => i.id === node.itemIds[0]) + 1
      return `Repaso de las palabras ${first}–${first + node.itemIds.length - 1}`
    }
    case 'exam50':
      return `Examen del nivel ${node.levelId}`
  }
}
