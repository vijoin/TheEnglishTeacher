import { Snail, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { useSpeak } from '../features/hooks'
import { cn } from '../lib/cn'
import { isSpeechSupported } from '../lib/speech'

interface AudioButtonProps {
  text: string
  slow?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  label?: string
}

const SIZES = {
  sm: 'h-8 w-8 rounded-xl [&_svg]:h-4 [&_svg]:w-4',
  md: 'h-11 w-11 rounded-2xl [&_svg]:h-5 [&_svg]:w-5',
  lg: 'h-14 w-14 rounded-2xl [&_svg]:h-7 [&_svg]:w-7',
  xl: 'h-24 w-24 rounded-3xl [&_svg]:h-11 [&_svg]:w-11',
}

/** Speaks `text` in English; renders nothing when the browser has no voices. */
export function AudioButton({ text, slow, size = 'md', className, label }: AudioButtonProps) {
  const say = useSpeak()
  const [speaking, setSpeaking] = useState(false)
  if (!isSpeechSupported()) return null
  const Icon = slow ? Snail : Volume2
  return (
    <button
      type="button"
      aria-label={label ?? (slow ? `Escuchar despacio: ${text}` : `Escuchar: ${text}`)}
      onClick={(e) => {
        e.stopPropagation()
        say(text, { slow, onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) })
      }}
      className={cn(
        'inline-grid shrink-0 place-items-center transition active:translate-y-[2px] active:shadow-none',
        slow
          ? 'border-2 border-line bg-surface text-muted shadow-[0_3px_0_0_var(--line)] hover:text-ink'
          : 'bg-brand text-white shadow-[0_3px_0_0_var(--brand-strong)] hover:brightness-110',
        speaking && 'animate-pulse',
        SIZES[size],
        className,
      )}
    >
      <Icon strokeWidth={2.5} />
    </button>
  )
}
