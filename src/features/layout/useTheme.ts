import { useEffect } from 'react'
import { useProgress, type ThemePreference } from '../../store/progress'

/**
 * "system" follows the host page's data-theme when it sets one, otherwise
 * the OS preference. The `dark` class drives Tailwind's dark variant.
 */
export function resolveDark(theme: ThemePreference, hostTheme: string | null, osDark: boolean): boolean {
  if (theme !== 'system') return theme === 'dark'
  if (hostTheme === 'dark' || hostTheme === 'light') return hostTheme === 'dark'
  return osDark
}

export function useTheme() {
  const theme = useProgress((s) => s.settings.theme)
  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = resolveDark(theme, root.getAttribute('data-theme'), !!media?.matches)
      root.classList.toggle('dark', dark)
      root.classList.toggle('light', !dark && theme === 'light')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0f131b' : '#1d5bd8')
    }
    apply()
    media?.addEventListener?.('change', apply)
    const observer = typeof MutationObserver === 'undefined' ? null : new MutationObserver(apply)
    observer?.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      media?.removeEventListener?.('change', apply)
      observer?.disconnect()
    }
  }, [theme])
}
