import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import type { Item } from '../../content/types'
import { isButtonTarget, useSettings, useSpeak } from '../hooks'
import { PlayerFooter, PlayerHeader } from '../player/PlayerHeader'
import { StudyCard } from './StudyCard'

interface StudyPlayerProps {
  title: string
  items: Item[]
  finishLabel: string
  onFinish: () => void
  onClose: (studiedAny: boolean) => void
}

/** Shows one item at a time with Previous / Next. */
export function StudyPlayer({ title, items, finishLabel, onFinish, onClose }: StudyPlayerProps) {
  const { autoplay } = useSettings()
  const say = useSpeak()
  const [index, setIndex] = useState(0)
  const item = items[index]
  const last = index === items.length - 1

  useEffect(() => {
    if (autoplay && item) say(item.en)
  }, [item, autoplay, say])

  const next = useCallback(() => (last ? onFinish() : setIndex((i) => i + 1)), [last, onFinish])
  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="alertdialog"]')) return
      if (e.key === 'ArrowRight' || (e.key === 'Enter' && !isButtonTarget(e))) {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        back()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, back])

  return (
    <>
      <PlayerHeader title={title} progress={(index + 1) / items.length} onClose={() => onClose(index > 0)} />
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <StudyCard key={item.id} item={item} position={index + 1} total={items.length} />
      </div>
      <PlayerFooter>
        <Button variant="secondary" size="lg" onClick={back} disabled={index === 0}>
          <ArrowLeft className="h-5 w-5" /> Anterior
        </Button>
        <Button size="lg" onClick={next}>
          {last ? finishLabel : 'Siguiente'} <ArrowRight className="h-5 w-5" />
        </Button>
      </PlayerFooter>
    </>
  )
}
