import { useState } from 'react'
import { Button } from '../../components/Button'
import type { Item } from '../../content/types'
import { navigate } from '../../lib/router'
import { useProgress } from '../../store/progress'
import { getItem } from '../course'
import { QuizRunner } from '../quiz/QuizRunner'
import { PlayerFrame, PlayerHeader } from './PlayerHeader'

const MAX_PRACTICE = 10

export function PracticeRoute() {
  // Freeze the list so answering doesn't reshuffle the session.
  const [items] = useState(() =>
    Object.entries(useProgress.getState().mistakes)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => getItem(id))
      .filter((i): i is Item => !!i)
      .slice(0, MAX_PRACTICE),
  )

  if (items.length === 0) {
    return (
      <PlayerFrame accent="indigo">
        <PlayerHeader progress={0} onClose={() => navigate('/vocab', { replace: true })} />
        <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
          <p className="text-6xl">🎯</p>
          <h1 className="mt-4 text-2xl font-black">No tienes errores pendientes</h1>
          <p className="mt-2 text-muted">Cuando falles una palabra en un quiz aparecerá aquí para repasarla.</p>
          <Button variant="primary" size="lg" className="mt-8" onClick={() => navigate('/', { replace: true })}>
            Seguir aprendiendo
          </Button>
        </div>
      </PlayerFrame>
    )
  }

  return (
    <QuizRunner
      kind="practice"
      items={items}
      accent="indigo"
      description={`Practica las ${items.length} palabras y frases que más te han costado.`}
    />
  )
}
