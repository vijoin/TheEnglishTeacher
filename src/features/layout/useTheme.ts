import { useEffect } from 'react'
import { useProgress } from '../../store/progress'

/** Applies the `dark` class from the saved preference or the OS setting. */
export function useTheme() {
  const theme = useProgress((s) => s.settings.theme)
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && !!media?.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b0f1d' : '#6366f1')
    }
    apply()
    media?.addEventListener?.('change', apply)
    return () => media?.removeEventListener?.('change', apply)
  }, [theme])
}
