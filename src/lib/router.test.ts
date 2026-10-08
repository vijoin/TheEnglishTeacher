import { act, renderHook } from '@testing-library/react'
import { navigate, parseRoute, useRoute } from './router'

test('parseRoute', () => {
  expect(parseRoute('')).toEqual({ name: 'home' })
  expect(parseRoute('#/')).toEqual({ name: 'home' })
  expect(parseRoute('#/play/1:7')).toEqual({ name: 'play', nodeId: '1:7' })
  expect(parseRoute('#/play/1%3A7')).toEqual({ name: 'play', nodeId: '1:7' })
  expect(parseRoute('#/practice')).toEqual({ name: 'practice' })
  expect(parseRoute('#/vocab')).toEqual({ name: 'vocab' })
  expect(parseRoute('#/profile')).toEqual({ name: 'profile' })
  expect(parseRoute('#/nope')).toEqual({ name: 'home' })
  expect(parseRoute('#/play/')).toEqual({ name: 'home' })
})

test('useRoute follows navigation', () => {
  const { result } = renderHook(() => useRoute())
  act(() => navigate('/vocab'))
  expect(result.current).toEqual({ name: 'vocab' })
  act(() => navigate('/'))
  expect(result.current).toEqual({ name: 'home' })
})

test('navigation keeps working when the browser refuses history updates', () => {
  const push = vi.spyOn(window.history, 'pushState').mockImplementation(() => {
    throw new DOMException('blocked', 'SecurityError')
  })
  const { result } = renderHook(() => useRoute())
  act(() => navigate('/profile'))
  expect(result.current).toEqual({ name: 'profile' })
  push.mockRestore()
  act(() => navigate('/', { replace: true }))
})
