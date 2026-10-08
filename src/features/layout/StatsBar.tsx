import { Flame, Zap } from 'lucide-react'
import { ProgressRing } from '../../components/ProgressRing'
import { currentStreak, toDateKey } from '../../engine/streak'
import { cn } from '../../lib/cn'
import { useProgress } from '../../store/progress'

export function StatsBar({ vertical = false }: { vertical?: boolean }) {
  const streak = useProgress((s) => s.streak)
  const xp = useProgress((s) => s.xp)
  const daily = useProgress((s) => s.daily)
  const goal = useProgress((s) => s.settings.dailyGoal)
  const today = toDateKey(new Date())
  const streakCount = currentStreak(streak, today)
  const activeToday = streak.lastDate === today
  const todayXp = daily.date === today ? daily.xp : 0
  const goalDone = todayXp >= goal

  const chip = 'flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 font-extrabold'
  return (
    <div className={cn('flex items-center', vertical ? 'flex-col items-stretch gap-2' : 'gap-1')}>
      <div className={cn(chip, activeToday ? 'text-orange-500' : 'text-muted')} title="Racha de días seguidos">
        <Flame className={cn('h-5 w-5', activeToday && 'fill-orange-400')} strokeWidth={2.5} />
        <span aria-label={`Racha: ${streakCount} días`}>{streakCount}</span>
        {vertical && <span className="text-sm font-bold text-muted">días de racha</span>}
      </div>
      <div className={cn(chip, 'text-amber-500')} title="Experiencia total">
        <Zap className="h-5 w-5 fill-amber-400" strokeWidth={2.5} />
        <span aria-label={`${xp} puntos de experiencia`}>{xp}</span>
        {vertical && <span className="text-sm font-bold text-muted">XP total</span>}
      </div>
      <div className={cn(chip, 'text-brand')} title={`Meta diaria: ${todayXp}/${goal} XP`}>
        <ProgressRing value={todayXp / goal} size={26} stroke={4} color={goalDone ? 'var(--color-emerald-500)' : 'var(--brand)'} label={`Meta diaria: ${todayXp} de ${goal} XP`}>
          <span className="text-[10px]">{goalDone ? '✓' : ''}</span>
        </ProgressRing>
        {vertical && (
          <span className="text-sm font-bold text-muted">
            Meta diaria {Math.min(todayXp, goal)}/{goal} XP
          </span>
        )}
      </div>
    </div>
  )
}
