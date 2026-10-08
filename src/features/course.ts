import { ALL_ITEMS, COURSE, getItem, getLevel } from '../content'
import type { Item } from '../content/types'
import { buildCoursePath, type PathNode } from '../engine/path'

export { ALL_ITEMS, COURSE, getItem, getLevel }

export const COURSE_PATH: PathNode[] = buildCoursePath(COURSE)

const nodesById = new Map(COURSE_PATH.map((n) => [n.id, n]))

export function getNode(id: string): PathNode | undefined {
  return nodesById.get(id)
}

export function nodeItems(node: PathNode): Item[] {
  return node.itemIds.map((id) => getItem(id)).filter((i): i is Item => !!i)
}

/** Human label for a node, e.g. "Lección 3 · Presentarse". */
export function nodeLabel(node: PathNode): string {
  switch (node.kind) {
    case 'lesson':
      return `Lección ${node.lessonIndex + 1} · ${node.title}`
    case 'quiz5':
      return `Quiz rápido · Lección ${node.lessonIndex + 1}`
    case 'review20':
      return `Repaso de 20 palabras`
    case 'exam50':
      return `Examen del nivel · 50 palabras`
  }
}
