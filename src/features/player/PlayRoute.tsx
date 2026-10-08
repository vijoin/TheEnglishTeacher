import { useEffect, useMemo, useState } from 'react'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { nextNodeId } from '../../engine/path'
import { navigate } from '../../lib/router'
import { stopSpeaking } from '../../lib/speech'
import { useProgress } from '../../store/progress'
import { COURSE_PATH, getNode, nodeItems, nodeLabel } from '../course'
import { useStepStatuses } from '../hooks'
import { QuizSession } from '../quiz/QuizSession'
import { StudyPlayer } from '../study/StudyPlayer'
import { PlayerFrame } from './PlayerHeader'

const home = () => navigate('/', { replace: true })

export function PlayRoute({ stepId }: { stepId: string }) {
  const statuses = useStepStatuses()
  const completeLesson = useProgress((s) => s.completeLesson)
  const step = getNode(stepId)
  const allowed = !!step && statuses[stepId] !== 'locked'
  // Stable identity so a session isn't rebuilt when progress changes.
  const items = useMemo(() => (step ? nodeItems(step) : []), [step])
  const [confirmExit, setConfirmExit] = useState(false)

  useEffect(() => {
    if (!allowed) home()
  }, [allowed])

  useEffect(() => stopSpeaking, [])

  if (!step || !allowed) return null
  const nextId = nextNodeId(COURSE_PATH, step.id)
  const goNext = () => (nextId ? navigate(`/play/${nextId}`, { replace: true }) : home())

  return (
    <PlayerFrame>
      {step.kind === 'lesson' ? (
        <>
          <StudyPlayer
            title={nodeLabel(step)}
            items={items}
            finishLabel="Ir al quiz"
            onClose={(studiedAny) => (studiedAny ? setConfirmExit(true) : home())}
            onFinish={() => {
              completeLesson(step.id)
              goNext()
            }}
          />
          <ConfirmDialog
            open={confirmExit}
            title="¿Salir de la lección?"
            message="La lección quedará pendiente hasta que veas todas sus palabras."
            confirmLabel="Salir"
            cancelLabel="Seguir"
            onConfirm={home}
            onCancel={() => setConfirmExit(false)}
          />
        </>
      ) : (
        <QuizSession step={step} items={items} onContinue={goNext} onHome={home} />
      )}
    </PlayerFrame>
  )
}
