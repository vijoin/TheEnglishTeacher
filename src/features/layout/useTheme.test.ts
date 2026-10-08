import { resolveDark } from './useTheme'

test('explicit app choice wins', () => {
  expect(resolveDark('dark', 'light', false)).toBe(true)
  expect(resolveDark('light', 'dark', true)).toBe(false)
})

test('system follows the host theme, then the OS', () => {
  expect(resolveDark('system', 'dark', false)).toBe(true)
  expect(resolveDark('system', 'light', true)).toBe(false)
  expect(resolveDark('system', null, true)).toBe(true)
  expect(resolveDark('system', null, false)).toBe(false)
})
