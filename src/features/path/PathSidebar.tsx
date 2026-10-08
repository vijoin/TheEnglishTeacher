import { Target, Trophy, Zap } from 'lucide-react'
import { ProgressRing } from '../../components/ProgressRing'
import { toDateKey } from '../../engine/streak'
import { useProgress } from '../../store/progress'

const RHYTHM = [
  { icon: Zap, title: 'Cada 5 palabras', text: 'Quiz rápido de 8 preguntas', tone: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-300' },
  { icon: Target, title: 'Cada 20 palabras', text: 'Repaso de 15 preguntas', tone: 'bg-sky-500/12 text-sky-600 dark:text-sky-300' },
  { icon: Trophy, title: 'Cada 50 palabras', text: 'Examen que desbloquea el siguiente nivel', tone: 'bg-amber-500/15 text-amber-600 dark:text-amber-300' },
]

/** Desktop-only side rail with the daily goal and how the course works. */
export function PathSidebar() {
  const daily = useProgress((s) => s.daily)
  const goal = useProgress((s) => s.settings.dailyGoal)
  const todayXp = daily.date === toDateKey(new Date()) ? daily.xp : 0
  const done = todayXp >= goal

  return (
    <aside className="sticky top-8 flex flex-col gap-4">
      <div className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5">
        <ProgressRing value={todayXp / goal} size={64} stroke={8} color={done ? 'var(--color-emerald-500)' : 'var(--brand)'} label={`Meta diaria: ${todayXp} de ${goal} XP`}>
          <span className="text-sm font-black">{Math.min(100, Math.round((todayXp / goal) * 100))}%</span>
        </ProgressRing>
        <div>
          <p className="font-black">Meta diaria</p>
          <p className="text-sm text-muted">
            {done ? '¡Meta cumplida! Sigue así 🎉' : `${todayXp} de ${goal} XP hoy`}
          </p>
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-surface p-5">
        <p className="font-black">Cómo funciona</p>
        <ul className="mt-4 flex flex-col gap-4">
          {RHYTHM.map(({ icon: Icon, title, text, tone }) => (
            <li key={title} className="flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-sm font-extrabold">{title}</p>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
