import { isSpeechSupported, speak } from './speech'

test('speech is reported unsupported in jsdom and speak is a no-op', () => {
  expect(isSpeechSupported()).toBe(false)
  expect(() => speak('hello')).not.toThrow()
})

describe('with a speech engine', () => {
  const spoken: { text: string; lang: string }[] = []
  let voices: { name: string; lang: string; voiceURI: string }[] = []
  const listeners: (() => void)[] = []

  beforeEach(() => {
    spoken.length = 0
    listeners.length = 0
    class Utterance {
      text: string
      lang = ''
      voice: unknown = null
      rate = 1
      onstart?: () => void
      onend?: () => void
      onerror?: () => void
      constructor(t: string) {
        this.text = t
      }
    }
    Object.assign(window, {
      SpeechSynthesisUtterance: Utterance,
      speechSynthesis: {
        getVoices: () => voices,
        speak: (u: Utterance) => spoken.push({ text: u.text, lang: u.lang }),
        cancel: () => {},
        addEventListener: (_: string, cb: () => void) => listeners.push(cb),
        removeEventListener: () => {},
      },
    })
  })

  afterEach(() => {
    delete (window as Partial<typeof window>).speechSynthesis
    delete (window as Partial<typeof window>).SpeechSynthesisUtterance
  })

  test('never reads English with a non-English voice', () => {
    voices = [{ name: 'Mónica', lang: 'es-ES', voiceURI: 'es' }]
    speak('hello')
    expect(spoken).toEqual([])
  })

  test('speaks with an English voice', () => {
    voices = [{ name: 'Samantha', lang: 'en-US', voiceURI: 'en' }]
    speak('hello')
    expect(spoken).toEqual([{ text: 'hello', lang: 'en-US' }])
  })

  test('waits for voices that load late, then speaks the last request once', () => {
    voices = []
    speak('hello')
    speak('goodbye')
    expect(spoken).toEqual([])
    voices = [{ name: 'Samantha', lang: 'en-US', voiceURI: 'en' }]
    listeners.forEach((cb) => cb())
    listeners.forEach((cb) => cb())
    expect(spoken).toEqual([{ text: 'goodbye', lang: 'en-US' }])
  })
})
