import confetti from 'canvas-confetti'

export function celebrate(big = false): void {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  try {
    const colors = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#0ea5e9']
    confetti({ particleCount: big ? 160 : 90, spread: big ? 100 : 70, origin: { y: 0.65 }, colors, disableForReducedMotion: true })
    if (big) {
      setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors }), 250)
      setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors }), 400)
    }
  } catch {
    // Decoration only.
  }
}
