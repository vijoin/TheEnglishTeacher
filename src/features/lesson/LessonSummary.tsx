import { Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { AudioButton } from '../../components/AudioButton'
import { Button } from '../../components/Button'
import type { Item } from '../../content/types'
import type { PathNode } from '../../engine/path'
import { navigate } from '../../lib/router'

interface LessonSummaryProps {
  items: Item[]
  next: PathNode | undefined
  xp: number
}

export function LessonSummary({ items, next, xp }: LessonSummaryProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-xl flex-1 px-4 pb-6">
        <div className="text-center">
          <motion.p className="inline-block text-6xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
            🎉
          </motion.p>
          <h1 className="mt-3 text-3xl font-black">¡Lección completada!</h1>
          <p className="mt-1 text-muted">Aprendiste estas {items.length} palabras y frases:</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 font-extrabold text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
            <Zap className="h-4 w-4 fill-current" /> +{xp} XP
          </span>
        </div>
        <ul className="mt-6 flex flex-col gap-2">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3"
            >
              <AudioButton text={item.en} size="sm" />
              <div className="min-w-0">
                <p lang="en" className="font-extrabold">
                  {item.en}
                </p>
                <p className="text-sm text-muted">{item.es}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        {next?.kind === 'quiz5' && (
          <p className="mt-6 rounded-2xl bg-accent-soft p-4 text-center font-bold text-accent-ink">
            ⚡ Ahora un quiz rápido de 8 preguntas para fijarlas.
          </p>
        )}
      </div>
      <footer className="sticky bottom-0 border-t border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {next && (
            <Button variant="accent" size="lg" block autoFocus onClick={() => navigate(`/play/${next.id}`, { replace: true })}>
              {next.kind === 'quiz5' ? 'Empezar quiz' : 'Continuar'}
            </Button>
          )}
          <Button variant="ghost" block onClick={() => navigate('/', { replace: true })}>
            Volver al mapa
          </Button>
        </div>
      </footer>
    </motion.div>
  )
}
