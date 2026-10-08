export interface Streak {
  count: number
  /** Local date `YYYY-MM-DD` of the last activity. */
  lastDate: string | null
}

export function toDateKey(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function daysBetween(from: string, to: string): number {
  const [y1, m1, d1] = from.split('-').map(Number)
  const [y2, m2, d2] = to.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000)
}

export function registerActivity(streak: Streak, today: string): Streak {
  if (!streak.lastDate) return { count: 1, lastDate: today }
  const gap = daysBetween(streak.lastDate, today)
  if (gap <= 0) return streak
  if (gap === 1) return { count: streak.count + 1, lastDate: today }
  return { count: 1, lastDate: today }
}

export function currentStreak(streak: Streak, today: string): number {
  if (!streak.lastDate) return 0
  return daysBetween(streak.lastDate, today) <= 1 ? streak.count : 0
}
