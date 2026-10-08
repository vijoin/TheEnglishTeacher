import { ArrowLeft } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { nextNodeId, type PathNode } from '../../engine/path'
import { navigate } from '../../lib/router'
import { useProgress } from '../../store/progress'
import { COURSE_PATH, getLevel, getNode, nodeItems } from '../course'
import { isButtonTarget, useSettings, useSfx, useSpeak } from '../hooks'
import { PlayerFrame, PlayerHeader } from '../player/PlayerHeader'
import { ItemCard } from './ItemCard'
import { LessonSummary } from './LessonSummary'

export function LessonPlayer({ node }: { node: PathNode }) {
  const items = nodeItems(node)
  const level = getLevel(node.levelId)!
  const completeLesson = useProgress((s) => s.completeLesson)
  const { autoplay } = useSettings()
  const say = useSpeak()
  const sfx = useSfx()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [earnedXp, setEarnedXp] = useState<number | null>(null)
  const [confirmExit, setConfirmExit] = useState(false)
  const finished = earnedXp !== null
  const item = items[index]
  const nextId = nextNodeId(COURSE_PATH, node.id)

  useEffect(() => {
    if (!finished && autoplay && item) say(item.en)
  }, [item, finished, autoplay, say])

  const goNext = useCallback(() => {
    if (index < items.length - 1) {
      setDirection(1)
      setIndex((i) => i + 1)
    } else {
      setEarnedXp(completeLesson(node.id))
      sfx('complete')
    }
  }, [index, items.length, completeLesson, node.id, sfx])

  const goBack = useCallback(() => {
    if (index === 0) return
    setDirection(-1)
    setIndex((i) => i - 1)
  }, [index])

  useEffect(() => {
    if (finished || confirmExit) return
    const onKey = (e: KeyboardEvent) => {
      // A focused button already reacts to Enter natively.
      if (e.key === 'Enter' && isButtonTarget(e)) return
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        goBack()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finished, confirmExit, goNext, goBack])

  const close = () => (finished || index === 0 ? navigate('/', { replace: true }) : setConfirmExit(true))

  return (
    <PlayerFrame accent={level.color}>
      <PlayerHeader progress={finished ? 1 : index / items.length} onClose={close} />
      {finished ? (
        <LessonSummary items={items} next={nextId ? getNode(nextId) : undefined} xp={earnedXp} />
      ) : (
        <>
          <div className="mx-auto w-full max-w-xl flex-1 overflow-hidden px-4 pb-6">
            <p className="mb-4 text-center text-sm font-extrabold uppercase tracking-wider text-muted">
              {level.lessons[node.lessonIndex].emoji} Lección {node.lessonIndex + 1} · {node.title}
            </p>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={item.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.22 }}
              >
                <ItemCard item={item} position={index + 1} total={items.length} />
              </motion.div>
            </AnimatePresence>
          </div>
          <footer className="sticky bottom-0 border-t border-line bg-bg/90 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-xl gap-3 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button variant="outline" size="lg" onClick={goBack} disabled={index === 0} aria-label="Anterior">
                <ArrowLeft className="h-5 w-5" strokeWidth={3} />
              </Button>
              <Button variant="accent" size="lg" block onClick={goNext}>
                {index === items.length - 1 ? 'Terminar' : 'Siguiente'}
              </Button>
            </div>
          </footer>
        </>
      )}
      <ConfirmDialog
        open={confirmExit}
        title="¿Salir de la lección?"
        message="Perderás el avance de esta lección."
        confirmLabel="Salir de la lección"
        cancelLabel="Seguir aprendiendo"
        danger
        onConfirm={() => navigate('/', { replace: true })}
        onCancel={() => setConfirmExit(false)}
      />
    </PlayerFrame>
  )
}
