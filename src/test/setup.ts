import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom has no layout: scrolling is a no-op.
window.scrollTo = () => {}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})
