import type { Level } from '../content/types'

export type NodeKind = 'lesson' | 'quiz5' | 'review20' | 'exam50'
export type NodeStatus = 'locked' | 'available' | 'completed'

export interface PathNode {
  /** `${levelId}:${index}` */
  id: string
  levelId: number
  index: number
  kind: NodeKind
  /** Lesson this node belongs to (or the last lesson it reviews). */
  lessonIndex: number
  itemIds: string[]
  title: string
}

export const NODE_TITLES: Record<Exclude<NodeKind, 'lesson'>, string> = {
  quiz5: 'Quiz',
  review20: 'Repaso',
  exam50: 'Examen del nivel',
}

/**
 * Lesson → quick quiz after every 5 items, a review after every 20 items
 * and the level exam after all 50 items.
 */
export function buildLevelPath(level: Level): PathNode[] {
  const nodes: Omit<PathNode, 'id' | 'index'>[] = []
  const ids = (from: number, to: number) => level.items.slice(from, to).map((i) => i.id)

  level.lessons.forEach((lesson, li) => {
    const lessonIds = lesson.items.map((i) => i.id)
    nodes.push({ levelId: level.id, kind: 'lesson', lessonIndex: li, itemIds: lessonIds, title: lesson.title })
    nodes.push({ levelId: level.id, kind: 'quiz5', lessonIndex: li, itemIds: lessonIds, title: NODE_TITLES.quiz5 })
    const seen = (li + 1) * lesson.items.length
    const isLast = li === level.lessons.length - 1
    if (isLast) {
      nodes.push({ levelId: level.id, kind: 'exam50', lessonIndex: li, itemIds: ids(0, seen), title: NODE_TITLES.exam50 })
    } else if (seen % 20 === 0) {
      nodes.push({ levelId: level.id, kind: 'review20', lessonIndex: li, itemIds: ids(seen - 20, seen), title: NODE_TITLES.review20 })
    }
  })

  return nodes.map((n, index) => ({ ...n, index, id: `${level.id}:${index}` }))
}

export function buildCoursePath(course: Level[]): PathNode[] {
  return course.flatMap(buildLevelPath)
}

/** Nodes unlock strictly in order across the whole course. */
export function getNodeStatuses(path: PathNode[], completed: Record<string, unknown>): Record<string, NodeStatus> {
  const out: Record<string, NodeStatus> = {}
  let previousDone = true
  for (const node of path) {
    const done = node.id in completed
    out[node.id] = done ? 'completed' : previousDone ? 'available' : 'locked'
    previousDone = done
  }
  return out
}

export function isLevelUnlocked(levelId: number, path: PathNode[], completed: Record<string, unknown>): boolean {
  const first = path.find((n) => n.levelId === levelId)
  if (!first) return false
  return getNodeStatuses(path, completed)[first.id] !== 'locked'
}

export function learnedItemIds(path: PathNode[], completed: Record<string, unknown>): string[] {
  return path.filter((n) => n.kind === 'lesson' && n.id in completed).flatMap((n) => n.itemIds)
}

export function nextNodeId(path: PathNode[], nodeId: string): string | null {
  const i = path.findIndex((n) => n.id === nodeId)
  return i >= 0 && i + 1 < path.length ? path[i + 1].id : null
}

/** First node that is available but not yet completed. */
export function currentNodeId(path: PathNode[], completed: Record<string, unknown>): string | null {
  const statuses = getNodeStatuses(path, completed)
  return path.find((n) => statuses[n.id] === 'available')?.id ?? null
}
