import { useSyncExternalStore } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'play'; nodeId: string }
  | { name: 'practice' }
  | { name: 'vocab' }
  | { name: 'profile' }

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  switch (parts[0]) {
    case 'play':
      return parts[1] ? { name: 'play', nodeId: decodeURIComponent(parts[1]) } : { name: 'home' }
    case 'practice':
      return { name: 'practice' }
    case 'vocab':
      return { name: 'vocab' }
    case 'profile':
      return { name: 'profile' }
    default:
      return { name: 'home' }
  }
}

export function navigate(path: string, { replace = false } = {}): void {
  const hash = `#${path.startsWith('/') ? path : `/${path}`}`
  if (hash === window.location.hash) return
  if (replace) window.history.replaceState(null, '', hash)
  else window.history.pushState(null, '', hash)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')
  return parseRoute(hash)
}
