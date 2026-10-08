import { Flame, Play, Star, Trash2, Trophy, Zap, BookOpenText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { ProgressBar } from '../../components/ProgressBar'
import { Segmented } from '../../components/Segmented'
import { Switch } from '../../components/Switch'
import { currentNodeId, learnedItemIds } from '../../engine/path'
import { currentStreak, toDateKey } from '../../engine/streak'
import { isSpeechSupported, useEnglishVoices } from '../../lib/speech'
import { useProgress, type ThemePreference } from '../../store/progress'
import { COURSE, COURSE_PATH, getLevel, getNode } from '../course'
import { useSettings, useSpeak } from '../hooks'

const RATES = [
  { value: 0.75, label: 'Lenta' },
  { value: 0.95, label: 'Normal' },
  { value: 1.1, label: 'Rápida' },
]

function Row({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-extrabold">{title}</p>
        {hint && <p className="text-sm text-muted">{hint}</p>}
      </div>
      <div className="sm:w-72">{children}</div>
    </div>
  )
}

export function ProfileScreen() {
  const completed = useProgress((s) => s.completed)
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const updateSettings = useProgress((s) => s.updateSettings)
  const reset = useProgress((s) => s.reset)
  const settings = useSettings()
  const voices = useEnglishVoices()
  const say = useSpeak()
  const [confirmReset, setConfirmReset] = useState(false)

  const learned = useMemo(() => learnedItemIds(COURSE_PATH, completed).length, [completed])
  const stars = Object.values(completed).reduce((sum, r) => sum + r.stars, 0)
  const levelsDone = COURSE.filter((l) => `${l.id}:22` in completed).length
  const currentId = currentNodeId(COURSE_PATH, completed)
  const currentLevel = currentId ? getLevel(getNode(currentId)!.levelId) : undefined

  const stats = [
    { label: 'XP total', value: xp, icon: Zap, tone: 'text-amber-500' },
    { label: 'Días de racha', value: currentStreak(streak, toDateKey(new Date())), icon: Flame, tone: 'text-orange-500' },
    { label: 'Palabras aprendidas', value: learned, icon: BookOpenText, tone: 'text-sky-500' },
    { label: 'Estrellas', value: stars, icon: Star, tone: 'text-yellow-500' },
  ]

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-6 pb-32 md:pt-10">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-brand to-violet-500 text-3xl shadow-[0_4px_0_0_var(--brand-strong)]">
          🎓
        </span>
        <div>
          <h1 className="text-3xl font-black">Tu progreso</h1>
          <p className="text-muted">
            {currentLevel ? `Nivel ${currentLevel.id} · ${currentLevel.title}` : '¡Curso completado!'} · {levelsDone} de {COURSE.length} niveles superados
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-3xl border border-line bg-surface p-4">
            <Icon className={`h-6 w-6 ${tone}`} strokeWidth={2.5} />
            <p className="mt-2 text-2xl font-black">{value}</p>
            <p className="text-sm font-bold text-muted">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-black">Niveles</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {COURSE.map((level) => {
          const nodes = COURSE_PATH.filter((n) => n.levelId === level.id)
          const done = nodes.filter((n) => n.id in completed).length
          return (
            <li key={level.id} data-accent={level.color} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-xl">{level.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-extrabold">
                    {level.id}. {level.title}
                  </p>
                  {done === nodes.length ? (
                    <Trophy className="h-5 w-5 shrink-0 text-amber-500" />
                  ) : (
                    <span className="text-sm font-bold text-muted">{Math.round((done / nodes.length) * 100)}%</span>
                  )}
                </div>
                <ProgressBar value={done / nodes.length} className="mt-1.5 h-2.5" label={`Progreso del nivel ${level.id}`} />
              </div>
            </li>
          )
        })}
      </ul>

      <h2 className="mt-10 text-xl font-black">Ajustes</h2>
      <div className="mt-2 divide-y divide-line rounded-3xl border border-line bg-surface px-5">
        <Row title="Tema">
          <Segmented<ThemePreference>
            label="Tema"
            value={settings.theme}
            onChange={(theme) => updateSettings({ theme })}
            options={[
              { value: 'system', label: 'Sistema' },
              { value: 'light', label: 'Claro' },
              { value: 'dark', label: 'Oscuro' },
            ]}
          />
        </Row>
        <Row title="Meta diaria" hint="XP que quieres ganar cada día">
          <Segmented<number>
            label="Meta diaria"
            value={settings.dailyGoal}
            onChange={(dailyGoal) => updateSettings({ dailyGoal })}
            options={[10, 20, 30, 50].map((v) => ({ value: v, label: `${v} XP` }))}
          />
        </Row>
        <Row title="Efectos de sonido" hint="Sonidos al acertar, fallar y aprobar">
          <div className="flex sm:justify-end">
            <Switch label="Efectos de sonido" checked={settings.sfx} onChange={(sfx) => updateSettings({ sfx })} />
          </div>
        </Row>
        <Row title="Pronunciar automáticamente" hint="Escucha cada palabra nueva al aparecer">
          <div className="flex sm:justify-end">
            <Switch label="Pronunciar automáticamente" checked={settings.autoplay} onChange={(autoplay) => updateSettings({ autoplay })} />
          </div>
        </Row>
        {isSpeechSupported() ? (
          <>
            <Row title="Velocidad de la voz">
              <Segmented<number> label="Velocidad de la voz" value={settings.rate} onChange={(rate) => updateSettings({ rate })} options={RATES} />
            </Row>
            <Row title="Voz en inglés" hint={voices.length ? `${voices.length} voces disponibles en tu dispositivo` : 'Cargando voces…'}>
              <div className="flex gap-2">
                <select
                  aria-label="Voz en inglés"
                  value={settings.voiceURI ?? ''}
                  onChange={(e) => updateSettings({ voiceURI: e.target.value || null })}
                  className="min-w-0 flex-1 rounded-2xl border-2 border-line bg-surface px-3 py-2 font-bold"
                >
                  <option value="">Automática</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm" aria-label="Probar voz" onClick={() => say('Hello! Welcome to The English Teacher.')}>
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </Row>
          </>
        ) : (
          <p className="py-4 text-sm text-muted">Tu navegador no tiene síntesis de voz: el audio no estará disponible.</p>
        )}
      </div>

      <div className="mt-10 rounded-3xl border-2 border-dashed border-rose-300/60 p-5 dark:border-rose-500/30">
        <p className="font-extrabold">Reiniciar progreso</p>
        <p className="text-sm text-muted">Borra lecciones, XP, racha y errores. Tus ajustes se conservan.</p>
        <Button variant="danger" size="sm" className="mt-4" onClick={() => setConfirmReset(true)}>
          <Trash2 className="h-4 w-4" /> Reiniciar progreso
        </Button>
      </div>

      <p className="mt-10 text-center text-xs text-muted">The English Teacher · El audio usa las voces de tu navegador.</p>

      <ConfirmDialog
        open={confirmReset}
        title="¿Reiniciar todo tu progreso?"
        message="Esta acción no se puede deshacer."
        confirmLabel="Sí, borrar todo"
        danger
        onConfirm={() => {
          reset()
          setConfirmReset(false)
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  )
}
