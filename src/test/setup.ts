import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { MotionGlobalConfig } from 'motion/react'
import { afterEach, vi } from 'vitest'

// Animations resolve instantly so tests don't wait on exit transitions.
MotionGlobalConfig.skipAnimations = true

// jsdom has no layout: scrolling is a no-op.
window.scrollTo = () => {}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

vi.mock('canvas-confetti', () => ({ default: vi.fn() }))
