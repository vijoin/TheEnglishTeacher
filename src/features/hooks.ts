import { useCallback, useMemo } from 'react'
import { getNodeStatuses } from '../engine/path'
import { speak, useEnglishVoices, type SpeakOptions } from '../lib/speech'
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

export function useStepStatuses() {
  const completed = useProgress((s) => s.completed)
  return useMemo(() => getNodeStatuses(COURSE_PATH, completed), [completed])
}

/** A focused button or link already reacts to Enter natively. */
export function isButtonTarget(e: KeyboardEvent): boolean {
  // Quiz options are the exception: Enter on a chosen option submits it.
  return e.target instanceof HTMLElement && !!e.target.closest('button:not([data-choice]), a, [role="radio"]:not([data-choice]), [role="switch"], summary')
}

/** True once the device offers at least one English voice. */
export function useHasVoices(): boolean {
  return useEnglishVoices().length > 0
}
