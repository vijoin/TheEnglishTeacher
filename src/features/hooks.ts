import { useCallback, useMemo } from 'react'
import { getNodeStatuses } from '../engine/path'
import { playSfx, type SfxName } from '../lib/sfx'
import { speak, type SpeakOptions } from '../lib/speech'
import { useProgress } from '../store/progress'
import { COURSE_PATH } from './course'

export const SLOW_RATE = 0.6

export function useSettings() {
  return useProgress((s) => s.settings)
}

export function useSpeak() {
  const { rate, voiceURI } = useSettings()
  return useCallback(
    (text: string, opts: { slow?: boolean } & Pick<SpeakOptions, 'onStart' | 'onEnd'> = {}) =>
      speak(text, { rate: opts.slow ? SLOW_RATE : rate, voiceURI, onStart: opts.onStart, onEnd: opts.onEnd }),
    [rate, voiceURI],
  )
}

export function useSfx() {
  const enabled = useProgress((s) => s.settings.sfx)
  return useCallback((name: SfxName) => enabled && playSfx(name), [enabled])
}

export function useNodeStatuses() {
  const completed = useProgress((s) => s.completed)
  return useMemo(() => getNodeStatuses(COURSE_PATH, completed), [completed])
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function isButtonTarget(e: KeyboardEvent): boolean {
  return e.target instanceof HTMLElement && !!e.target.closest('button, a, [role="radio"], [role="switch"]')
}
