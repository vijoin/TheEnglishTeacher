import { isSpeechSupported, speak } from './speech'

test('speech is reported unsupported in jsdom and speak is a no-op', () => {
  expect(isSpeechSupported()).toBe(false)
  expect(() => speak('hello')).not.toThrow()
})
