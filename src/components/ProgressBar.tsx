import { motion } from 'motion/react'
import { cn } from '../lib/cn'

interface ProgressBarProps {
  value: number
  className?: string
  barClassName?: string
  label?: string
}

export function ProgressBar({ value, className, barClassName = 'bg-accent', label }: ProgressBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn('h-4 w-full overflow-hidden rounded-full bg-surface-2', className)}
    >
      <motion.div
        className={cn('relative h-full rounded-full', barClassName)}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/30" />
      </motion.div>
    </div>
  )
}
