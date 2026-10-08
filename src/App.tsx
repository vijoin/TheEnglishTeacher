import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { AppShell } from './features/layout/AppShell'
import { useTheme } from './features/layout/useTheme'
import { PathScreen } from './features/path/PathScreen'
import { PlayRoute } from './features/player/PlayRoute'
import { PracticeRoute } from './features/player/PracticeRoute'
import { ProfileScreen } from './features/profile/ProfileScreen'
import { VocabScreen } from './features/vocab/VocabScreen'
import { useRoute } from './lib/router'

export default function App() {
  useTheme()
  const route = useRoute()

  useEffect(() => {
    if (route.name === 'vocab' || route.name === 'profile') window.scrollTo?.({ top: 0 })
  }, [route.name])

  return (
    <MotionConfig reducedMotion="user">
      {route.name === 'play' ? (
        <PlayRoute key={route.nodeId} nodeId={route.nodeId} />
      ) : route.name === 'practice' ? (
        <PracticeRoute />
      ) : (
        <AppShell route={route}>
          {route.name === 'vocab' ? <VocabScreen /> : route.name === 'profile' ? <ProfileScreen /> : <PathScreen />}
        </AppShell>
      )}
    </MotionConfig>
  )
}
