import { Check, Lock, Target, Trophy, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Stars } from '../../components/Stars'
import type { NodeStatus, PathNode } from '../../engine/path'
import { cn } from '../../lib/cn'
import { navigate } from '../../lib/router'
import { nodeLabel } from '../course'

const SIZE: Record<PathNode['kind'], number> = { lesson: 68, quiz5: 56, review20: 76, exam50: 88 }
const STATUS_TEXT: Record<NodeStatus, string> = { available: 'disponible', completed: 'completado', locked: 'bloqueado' }
const SHORT: Record<PathNode['kind'], string> = { lesson: '', quiz5: 'Quiz', review20: 'Repaso 20', exam50: 'Examen 50' }

interface PathNodeButtonProps {
  node: PathNode
  status: NodeStatus
  stars: number
  emoji: string
  offset: number
  isCurrent: boolean
}

export function PathNodeButton({ node, status, stars, emoji, offset, isCurrent }: PathNodeButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (isCurrent) ref.current?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })
  }, [isCurrent])

  const size = SIZE[node.kind]
  const locked = status === 'locked'
  const done = status === 'completed'
  const isExam = node.kind === 'exam50'
  const iconSize = Math.round(size * 0.42)

  let content
  if (locked) content = <Lock width={iconSize * 0.8} height={iconSize * 0.8} strokeWidth={2.5} />
  else if (node.kind === 'lesson') content = done ? <Check width={iconSize} height={iconSize} strokeWidth={3.5} /> : <span style={{ fontSize: iconSize }}>{emoji}</span>
  else if (node.kind === 'quiz5') content = <Zap width={iconSize} height={iconSize} strokeWidth={2.5} className="fill-current" />
  else if (node.kind === 'review20') content = <Target width={iconSize} height={iconSize} strokeWidth={2.5} />
  else content = <Trophy width={iconSize} height={iconSize} strokeWidth={2.5} />

  return (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {isCurrent && (
        <div className="absolute -top-11 z-10 animate-float whitespace-nowrap rounded-xl border-2 border-line bg-surface px-3 py-1.5 text-sm font-extrabold text-accent-strong shadow-sm dark:text-accent-ink">
          ¡Empieza!
          <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-line bg-surface" />
        </div>
      )}
      <motion.button
        ref={ref}
        type="button"
        disabled={locked}
        whileTap={locked ? undefined : { scale: 0.94 }}
        onClick={() => navigate(`/play/${node.id}`)}
        aria-label={`${nodeLabel(node)} — ${STATUS_TEXT[status]}`}
        className={cn(
          'relative grid place-items-center rounded-full transition',
          locked && 'cursor-not-allowed bg-surface-2 text-muted shadow-[0_6px_0_0_var(--line)]',
          !locked && !isExam && 'bg-accent text-white shadow-[0_6px_0_0_var(--accent-strong)] hover:brightness-110',
          !locked && isExam && 'bg-amber-400 text-amber-900 shadow-[0_6px_0_0_var(--color-amber-600)] hover:brightness-105',
          node.kind === 'review20' && !locked && 'ring-4 ring-accent/25',
          isExam && 'ring-4 ring-amber-300/40',
        )}
        style={{ width: size, height: size }}
      >
        {isCurrent && <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-accent" />}
        <span className="relative">{content}</span>
      </motion.button>
      <div className="mt-3 flex h-8 flex-col items-center">
        {node.kind === 'lesson' ? (
          <span className={cn('max-w-36 truncate text-xs font-bold', locked ? 'text-muted' : 'text-ink')}>{node.title}</span>
        ) : (
          <span className={cn('text-[11px] font-extrabold uppercase tracking-wider', locked ? 'text-muted' : 'text-accent-strong dark:text-accent-ink')}>
            {SHORT[node.kind]}
          </span>
        )}
        {done && node.kind !== 'lesson' && <Stars count={stars} size={12} className="mt-0.5" />}
      </div>
    </div>
  )
}
