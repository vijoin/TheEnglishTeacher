import { useEffect } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { HomeScreen } from './features/home/HomeScreen'
import { AppShell } from './features/layout/AppShell'
import { useTheme } from './features/layout/useTheme'
import { PlayRoute } from './features/player/PlayRoute'
import { SettingsScreen } from './features/settings/SettingsScreen'
import { VocabScreen } from './features/vocab/VocabScreen'
import { useRoute } from './lib/router'

function Screens() {
  useTheme()
  const route = useRoute()

  useEffect(() => {
    window.scrollTo?.({ top: 0 })
  }, [route])

  if (route.name === 'play') return <PlayRoute key={route.nodeId} stepId={route.nodeId} />
  return (
    <AppShell route={route}>
      {route.name === 'vocab' ? <VocabScreen /> : route.name === 'settings' ? <SettingsScreen /> : <HomeScreen />}
    </AppShell>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Screens />
    </ErrorBoundary>
  )
}
