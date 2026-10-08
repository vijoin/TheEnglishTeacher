import { Snail, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { useHasVoices, useSpeak } from '../features/hooks'
import { cn } from '../lib/cn'

interface AudioButtonProps {
  text: string
  slow?: boolean
  /** Show a text label next to the icon. */
  label?: string
  className?: string
}

/** Speaks `text` in English; renders nothing when the browser has no voices. */
export function AudioButton({ text, slow, label, className }: AudioButtonProps) {
  const say = useSpeak()
  const hasVoices = useHasVoices()
  const [speaking, setSpeaking] = useState(false)
  if (!hasVoices) return null
  const Icon = slow ? Snail : Volume2
  return (
    <button
      type="button"
      aria-label={label ? undefined : slow ? `Escuchar despacio: ${text}` : `Escuchar: ${text}`}
      onClick={(e) => {
        e.stopPropagation()
        say(text, { slow, onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) })
      }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-line bg-surface text-accent transition hover:bg-accent-soft',
        label ? 'px-3 py-2 text-sm font-medium' : 'h-9 w-9',
        speaking && 'bg-accent-soft',
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      {label}
    </button>
  )
}
