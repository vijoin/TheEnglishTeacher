import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Item } from '../../../content/types'
import { createRng, shuffle } from '../../../engine/random'
import { cn } from '../../../lib/cn'
import { useSfx, useSpeak } from '../../hooks'
import { QuestionPrompt } from './QuestionPrompt'

interface MatchQuestionProps {
  items: Item[]
  disabled: boolean
  onComplete: (result: { mistakes: number; wrongItemIds: string[] }) => void
}

export function MatchQuestion({ items, disabled, onComplete }: MatchQuestionProps) {
  const say = useSpeak()
  const sfx = useSfx()
  const [left] = useState(() => shuffle(items, createRng(Date.now())))
  const [right] = useState(() => shuffle(items, createRng(Date.now() + 7)))
  const [pickedLeft, setPickedLeft] = useState<string | null>(null)
  const [pickedRight, setPickedRight] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [wrong, setWrong] = useState<string[]>([])
  const [flash, setFlash] = useState<[string, string] | null>(null)
  const [mistakes, setMistakes] = useState(0)

  const resolve = (l: string | null, r: string | null) => {
    if (!l || !r) {
      setPickedLeft(l)
      setPickedRight(r)
      return
    }
    setPickedLeft(null)
    setPickedRight(null)
    if (l === r) {
      const next = [...matched, l]
      setMatched(next)
      sfx('tap')
      if (next.length === items.length) onComplete({ mistakes, wrongItemIds: wrong })
    } else {
      setMistakes((m) => m + 1)
      setWrong((w) => [...new Set([...w, l, r])])
      setFlash([l, r])
      sfx('wrong')
    }
  }

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(null), 450)
    return () => clearTimeout(t)
  }, [flash])

  const tile = (id: string, side: 'left' | 'right', text: string) => {
    const done = matched.includes(id)
    const picked = (side === 'left' ? pickedLeft : pickedRight) === id
    const isFlash = flash?.[side === 'left' ? 0 : 1] === id
    return (
      <motion.button
        key={id}
        type="button"
        lang={side === 'left' ? 'en' : 'es'}
        disabled={disabled || done}
        animate={isFlash ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        onClick={() => {
          if (side === 'left') {
            say(text)
            resolve(id, pickedRight)
          } else {
            resolve(pickedLeft, id)
          }
        }}
        className={cn(
          'min-h-16 rounded-2xl border-2 px-3 py-3 text-base font-bold transition sm:text-lg',
          'shadow-[0_4px_0_0_var(--line)] active:translate-y-[2px] active:shadow-none',
          done && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 opacity-60 shadow-none dark:text-emerald-300',
          !done && picked && 'border-brand bg-brand/10 text-brand shadow-[0_4px_0_0_var(--brand)]',
          !done && isFlash && 'border-rose-500 bg-rose-500/10 text-rose-600',
          !done && !picked && !isFlash && 'border-line bg-surface hover:bg-surface-2',
        )}
      >
        {text}
      </motion.button>
    )
  }

  return (
    <div>
      <QuestionPrompt label="Une las parejas" />
      <div className="grid grid-cols-2 gap-3">
        <div role="group" aria-label="Inglés" className="flex flex-col gap-3">
          {left.map((item) => tile(item.id, 'left', item.en))}
        </div>
        <div role="group" aria-label="Español" className="flex flex-col gap-3">
          {right.map((item) => tile(item.id, 'right', item.es))}
        </div>
      </div>
    </div>
  )
}
