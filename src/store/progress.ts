import { create } from 'zustand'
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware'
import { isPassed } from '../engine/scoring'

export const STORAGE_KEY = 'tet-progress'
const VERSION = 2

export interface StepResult {
  completedAt: string
}

export type ThemePreference = 'system' | 'light' | 'dark'

export interface Settings {
  theme: ThemePreference
  voiceURI: string | null
  rate: number
  autoplay: boolean
  /** Test mode: open every level and step without completing earlier ones. */
  unlockAll: boolean
}

export interface QuizRecord {
  stepId: string
  correct: number
  total: number
  wrongItemIds: string[]
  rightItemIds: string[]
}

export interface ProgressData {
  version: 2
  completed: Record<string, StepResult>
  /** Mistake counters per item id; reviews and exams ask weak items first. */
  mistakes: Record<string, number>
  settings: Settings
}

interface ProgressActions {
  completeLesson(stepId: string): void
  recordQuiz(record: QuizRecord): { passed: boolean }
  updateSettings(patch: Partial<Settings>): void
  reset(): void
}

export type ProgressState = ProgressData & ProgressActions

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  voiceURI: null,
  rate: 0.95,
  autoplay: true,
  unlockAll: false,
}

export function initialProgress(): ProgressData {
  return { version: VERSION, completed: {}, mistakes: {}, settings: { ...DEFAULT_SETTINGS } }
}

const today = () => new Date().toISOString().slice(0, 10)

/** JSON storage that never throws (private mode, quota, corrupt data). */
export function safeJSONStorage<S>(getStorage: () => Storage): PersistStorage<S> {
  return {
    getItem(name) {
      try {
        const raw = getStorage().getItem(name)
        return raw ? (JSON.parse(raw) as StorageValue<S>) : null
      } catch {
        return null
      }
    },
    setItem(name, value) {
      try {
        getStorage().setItem(name, JSON.stringify(value))
      } catch {
        // Progress simply stays in memory.
      }
    },
    removeItem(name) {
      try {
        getStorage().removeItem(name)
      } catch {
        // Nothing to clean up.
      }
    },
  }
}

export const SPEECH_RATES = [0.75, 0.95, 1.1]

/** Closest supported speech speed. */
function snapRate(rate: number): number {
  return SPEECH_RATES.reduce((best, r) => (Math.abs(r - rate) < Math.abs(best - rate) ? r : best))
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

/** Upgrades saved progress from older versions, keeping what still applies. */
export function migrateProgress(persisted: unknown, _version: number): ProgressData {
  const fresh = initialProgress()
  if (!isRecord(persisted)) return fresh
  const completed: Record<string, StepResult> = {}
  if (isRecord(persisted.completed)) {
    for (const [id, r] of Object.entries(persisted.completed)) {
      completed[id] = { completedAt: isRecord(r) && typeof r.completedAt === 'string' ? r.completedAt : today() }
    }
  }
  const mistakes: Record<string, number> = {}
  if (isRecord(persisted.mistakes)) {
    for (const [id, n] of Object.entries(persisted.mistakes)) if (typeof n === 'number' && n > 0) mistakes[id] = n
  }
  const old = isRecord(persisted.settings) ? persisted.settings : {}
  const settings: Settings = {
    theme: old.theme === 'light' || old.theme === 'dark' ? old.theme : 'system',
    voiceURI: typeof old.voiceURI === 'string' ? old.voiceURI : null,
    rate: typeof old.rate === 'number' ? snapRate(old.rate) : DEFAULT_SETTINGS.rate,
    autoplay: typeof old.autoplay === 'boolean' ? old.autoplay : DEFAULT_SETTINGS.autoplay,
    unlockAll: old.unlockAll === true,
  }
  return { version: VERSION, completed, mistakes, settings }
}

function updateMistakes(mistakes: Record<string, number>, wrong: string[], right: string[]): Record<string, number> {
  const next = { ...mistakes }
  for (const id of wrong) next[id] = (next[id] ?? 0) + 1
  for (const id of right) {
    if (!(id in next) || wrong.includes(id)) continue
    next[id] -= 1
    if (next[id] <= 0) delete next[id]
  }
  return next
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialProgress(),

      completeLesson(stepId) {
        const state = get()
        if (state.completed[stepId]) return
        set({ completed: { ...state.completed, [stepId]: { completedAt: today() } } })
      },

      recordQuiz(record) {
        const state = get()
        const passed = isPassed(record.correct, record.total)
        set({
          mistakes: updateMistakes(state.mistakes, record.wrongItemIds, record.rightItemIds),
          completed:
            passed && !state.completed[record.stepId]
              ? { ...state.completed, [record.stepId]: { completedAt: today() } }
              : state.completed,
        })
        return { passed }
      },

      updateSettings(patch) {
        set({ settings: { ...get().settings, ...patch } })
      },

      reset() {
        set({ ...initialProgress(), settings: get().settings })
      },
    }),
    {
      name: STORAGE_KEY,
      version: VERSION,
      storage: safeJSONStorage<ProgressData>(() => window.localStorage),
      partialize: (s): ProgressData => ({ version: VERSION, completed: s.completed, mistakes: s.mistakes, settings: s.settings }),
      migrate: (persisted, version) => migrateProgress(persisted, version),
      merge: (persisted, current) => {
        const saved = isRecord(persisted) ? migrateProgress(persisted, VERSION) : initialProgress()
        return { ...current, ...saved }
      },
    },
  ),
)
