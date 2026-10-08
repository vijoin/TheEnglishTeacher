import { buildCourse } from './build'
import { level1 } from './levels/level1'
import { level2 } from './levels/level2'
import { level3 } from './levels/level3'
import { level4 } from './levels/level4'
import { level5 } from './levels/level5'
import { level6 } from './levels/level6'
import type { Item, Level } from './types'

export const LEVEL_INPUTS = [level1, level2, level3, level4, level5, level6]

export const COURSE: Level[] = buildCourse(LEVEL_INPUTS)

export const ALL_ITEMS: Item[] = COURSE.flatMap((l) => l.items)

const itemsById = new Map(ALL_ITEMS.map((i) => [i.id, i]))
const levelsById = new Map(COURSE.map((l) => [l.id, l]))

export function getItem(id: string): Item | undefined {
  return itemsById.get(id)
}

export function getLevel(id: number): Level | undefined {
  return levelsById.get(id)
}
