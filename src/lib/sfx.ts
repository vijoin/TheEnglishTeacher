export type SfxName = 'correct' | 'wrong' | 'complete' | 'tap' | 'levelup'

let ctx: AudioContext | null = null

function audioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  ctx ??= new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(c: AudioContext, freq: number, start: number, duration: number, type: OscillatorType = 'sine', volume = 0.12) {
  const osc = c.createOscillator()
  const gain = c.createGain()
  const t0 = c.currentTime + start
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

/** Tiny synthesized sound effects; silently does nothing without Web Audio. */
export function playSfx(name: SfxName): void {
  try {
    const c = audioContext()
    if (!c) return
    switch (name) {
      case 'correct':
        tone(c, 660, 0, 0.12)
        tone(c, 990, 0.09, 0.22)
        break
      case 'wrong':
        tone(c, 200, 0, 0.16, 'square', 0.05)
        tone(c, 150, 0.12, 0.24, 'square', 0.05)
        break
      case 'complete':
        ;[523, 659, 784, 1047].forEach((f, i) => tone(c, f, i * 0.11, 0.26, 'triangle', 0.14))
        break
      case 'levelup':
        ;[392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(c, f, i * 0.09, 0.3, 'triangle', 0.13))
        break
      case 'tap':
        tone(c, 520, 0, 0.05, 'sine', 0.04)
        break
    }
  } catch {
    // Audio is a nicety; never let it break the lesson.
  }
}
