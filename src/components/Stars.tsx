import { Star } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '../lib/cn'

interface StarsProps {
  count: number
  size?: number
  animated?: boolean
  className?: string
}

export function Stars({ count, size = 14, animated = false, className }: StarsProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={`${count} de 3 estrellas`}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={animated ? { scale: 0, rotate: -45 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: animated ? 0.35 + i * 0.25 : 0, type: 'spring', stiffness: 260, damping: 14 }}
        >
          <Star
            width={size}
            height={size}
            className={i < count ? 'fill-amber-400 text-amber-400' : 'fill-surface-2 text-line'}
            strokeWidth={2}
          />
        </motion.span>
      ))}
    </div>
  )
}
