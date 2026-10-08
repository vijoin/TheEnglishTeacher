import { Play } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { Segmented } from '../../components/Segmented'
import { Switch } from '../../components/Switch'
import { useEnglishVoices } from '../../lib/speech'
import { SPEECH_RATES, useProgress, type ThemePreference } from '../../store/progress'
import { COURSE, COURSE_PATH } from '../course'
import { useSettings, useSpeak } from '../hooks'

const RATE_LABELS = ['Lenta', 'Normal', 'Rápida']
const RATES = SPEECH_RATES.map((value, i) => ({ value, label: RATE_LABELS[i] }))

function Row({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-medium">{title}</p>
        {hint && <p className="text-sm text-muted">{hint}</p>}
      </div>
      <div className="sm:w-72">{children}</div>
    </div>
  )
}

export function SettingsScreen() {
  const completed = useProgress((s) => s.completed)
  const updateSettings = useProgress((s) => s.updateSettings)
  const reset = useProgress((s) => s.reset)
  const settings = useSettings()
  const voices = useEnglishVoices()
  const say = useSpeak()
  const [confirmReset, setConfirmReset] = useState(false)
  const doneSteps = COURSE_PATH.filter((n) => n.id in completed).length
  const doneLevels = COURSE.filter((l) => COURSE_PATH.filter((n) => n.levelId === l.id).every((n) => n.id in completed)).length

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Ajustes</h1>
      <p className="mt-1 text-muted tabular-nums">
        {doneSteps} de {COURSE_PATH.length} pasos completados · {doneLevels} de {COURSE.length} niveles superados
      </p>

      <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
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
        {voices.length > 0 ? (
          <>
            <Row title="Pronunciar automáticamente" hint="Escucha cada palabra al aparecer">
              <div className="flex sm:justify-end">
                <Switch label="Pronunciar automáticamente" checked={settings.autoplay} onChange={(autoplay) => updateSettings({ autoplay })} />
              </div>
            </Row>
            <Row title="Velocidad de la voz">
              <Segmented<number> label="Velocidad de la voz" value={settings.rate} onChange={(rate) => updateSettings({ rate })} options={RATES} />
            </Row>
            <Row title="Voz en inglés" hint={`${voices.length} voces disponibles en este dispositivo`}>
              <div className="flex gap-2">
                <select
                  id="voice"
                  aria-label="Voz en inglés"
                  value={settings.voiceURI ?? ''}
                  onChange={(e) => updateSettings({ voiceURI: e.target.value || null })}
                  className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2"
                >
                  <option value="">Automática</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
                <Button variant="secondary" aria-label="Probar voz" onClick={() => say('Hello! This is how I sound.')}>
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </Row>
          </>
        ) : (
          <p className="px-5 py-4 text-sm text-muted">Este navegador no tiene voces en inglés, así que el audio no está disponible.</p>
        )}
      </div>

      <h2 className="mt-8 text-sm font-medium text-muted">Modo de prueba</h2>
      <div className="mt-2 rounded-xl border border-line bg-surface">
        <Row title="Desbloquear todos los niveles" hint="Abre todas las lecciones, quizzes y niveles para probarlos. Lo que completes en este modo se guarda.">
          <div className="flex sm:justify-end">
            <Switch label="Desbloquear todos los niveles" checked={settings.unlockAll} onChange={(unlockAll) => updateSettings({ unlockAll })} />
          </div>
        </Row>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-5 py-4">
        <div>
          <p className="font-medium">Reiniciar progreso</p>
          <p className="text-sm text-muted">Borra las lecciones y quizzes completados. Los ajustes se conservan.</p>
        </div>
        <Button variant="danger" onClick={() => setConfirmReset(true)}>
          Reiniciar progreso
        </Button>
      </div>

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
