import { useEffect, useMemo } from 'react'
import { navigate } from '../../lib/router'
import { getLevel, getNode, nodeItems } from '../course'
import { useNodeStatuses } from '../hooks'
import { LessonPlayer } from '../lesson/LessonPlayer'
import { QuizRunner } from '../quiz/QuizRunner'

export function PlayRoute({ nodeId }: { nodeId: string }) {
  const statuses = useNodeStatuses()
  const node = getNode(nodeId)
  const allowed = !!node && statuses[nodeId] !== 'locked'
  // Stable identity so the quiz isn't regenerated when progress changes.
  const items = useMemo(() => (node ? nodeItems(node) : []), [node])

  useEffect(() => {
    if (!allowed) navigate('/', { replace: true })
  }, [allowed])

  if (!node || !allowed) return null
  const level = getLevel(node.levelId)!
  if (node.kind === 'lesson') return <LessonPlayer node={node} />

  const first = level.items.findIndex((i) => i.id === items[0].id) + 1
  const description =
    node.kind === 'quiz5'
      ? `Pon a prueba las 5 palabras de la lección ${node.lessonIndex + 1}: ${level.lessons[node.lessonIndex].title}.`
      : node.kind === 'review20'
        ? `Repasa las palabras ${first}–${first + items.length - 1} del nivel ${level.id}.`
        : `Demuestra lo que sabes de las 50 palabras y frases del nivel ${level.id}${level.id < 6 ? ' y desbloquea el siguiente.' : '.'}`

  return <QuizRunner kind={node.kind} items={items} accent={level.color} description={description} node={node} />
}
