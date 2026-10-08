import { useEffect, useState } from 'react'

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function'
}

function englishVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return []
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en'))
}

const PREFERRED = [/google us english/i, /samantha/i, /aria|jenny|guy/i, /natural/i, /alex/i]

function pickVoice(voiceURI: string | null | undefined): SpeechSynthesisVoice | null {
  const voices = englishVoices()
  if (voiceURI) {
    const chosen = voices.find((v) => v.voiceURI === voiceURI)
    if (chosen) return chosen
  }
  const us = voices.filter((v) => /en[-_]us/i.test(v.lang))
  for (const re of PREFERRED) {
    const v = us.find((x) => re.test(x.name))
    if (v) return v
  }
  return us[0] ?? voices[0] ?? null
}

export interface SpeakOptions {
  rate?: number
  voiceURI?: string | null
  onStart?: () => void
  onEnd?: () => void
}

let pending: { text: string; opts: SpeakOptions } | null = null
let waitingOn: SpeechSynthesis | null = null

/** Voices often load after the page; replay the latest request once they arrive. */
function speakWhenVoicesLoad(synth: SpeechSynthesis, text: string, opts: SpeakOptions) {
  pending = { text, opts }
  if (waitingOn === synth) return
  waitingOn = synth
  synth.addEventListener('voiceschanged', () => {
    const next = pending
    pending = null
    if (next && englishVoices().length > 0) speak(next.text, next.opts)
  })
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  if (!isSpeechSupported()) return
  const { rate = 0.95, voiceURI, onStart, onEnd } = opts
  const synth = window.speechSynthesis
  if (englishVoices().length === 0) {
    // Reading English with a Spanish voice would teach the wrong sounds.
    if (synth.getVoices().length === 0) speakWhenVoicesLoad(synth, text, opts)
    return
  }
  pending = null
  synth.cancel()
  const utterance = new window.SpeechSynthesisUtterance(text)
  const voice = pickVoice(voiceURI)
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang ?? 'en-US'
  utterance.rate = rate
  utterance.onstart = () => onStart?.()
  utterance.onend = () => onEnd?.()
  utterance.onerror = () => onEnd?.()
  synth.speak(utterance)
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) window.speechSynthesis.cancel()
}

/** English voices installed on this device (they load asynchronously). */
export function useEnglishVoices(): SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState(englishVoices)
  useEffect(() => {
    if (!isSpeechSupported()) return
    const update = () => setVoices(englishVoices())
    window.speechSynthesis.addEventListener('voiceschanged', update)
    update()
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update)
  }, [])
  return voices
}
