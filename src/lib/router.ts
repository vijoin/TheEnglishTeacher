import { useSyncExternalStore } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'play'; nodeId: string }
  | { name: 'vocab' }
  | { name: 'settings' }

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  switch (parts[0]) {
    case 'play':
      try {
        return parts[1] ? { name: 'play', nodeId: decodeURIComponent(parts[1]) } : { name: 'home' }
      } catch {
        return { name: 'home' }
      }
    case 'vocab':
      return { name: 'vocab' }
    case 'settings':
      return { name: 'settings' }
    default:
      return { name: 'home' }
  }
}

// The route lives in memory and is mirrored to the URL when the browser
// allows it (sandboxed frames may refuse history updates).
let current = typeof window === 'undefined' ? '' : window.location.hash
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function navigate(path: string, { replace = false } = {}): void {
  const hash = `#${path.startsWith('/') ? path : `/${path}`}`
  if (hash === current) return
  current = hash
  try {
    if (replace) window.history.replaceState(null, '', hash)
    else window.history.pushState(null, '', hash)
  } catch {
    // Keep navigating in memory.
  }
  emit()
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  const onHash = () => {
    current = window.location.hash
    emit()
  }
  window.addEventListener('hashchange', onHash)
  window.addEventListener('popstate', onHash)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('hashchange', onHash)
    window.removeEventListener('popstate', onHash)
  }
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => current, () => '')
  return parseRoute(hash)
}
