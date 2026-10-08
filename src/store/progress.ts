import { create } from 'zustand'
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware'
import { isPassing, LESSON_XP, quizXp, scoreToStars, type QuizKind } from '../engine/scoring'
import { registerActivity, toDateKey, type Streak } from '../engine/streak'

export const STORAGE_KEY = 'tet-progress'

export interface NodeResult {
  bestScore: number
  stars: number
  attempts: number
  completedAt: string
}

export type ThemePreference = 'system' | 'light' | 'dark'

export interface Settings {
  theme: ThemePreference
  sfx: boolean
  voiceURI: string | null
  rate: number
  dailyGoal: number
  autoplay: boolean
}

export interface QuizRecord {
  nodeId: string | null
  kind: QuizKind
  correct: number
  total: number
  wrongItemIds: string[]
  rightItemIds: string[]
}

export interface QuizOutcome {
  score: number
  passed: boolean
  stars: number
  xp: number
  isNewBest: boolean
}

export interface ProgressData {
  version: 1
  completed: Record<string, NodeResult>
  xp: number
  streak: Streak
  daily: { date: string; xp: number }
  mistakes: Record<string, number>
  settings: Settings
}

interface ProgressActions {
  completeLesson(nodeId: string, today?: string): number
  recordQuiz(record: QuizRecord, today?: string): QuizOutcome
  updateSettings(patch: Partial<Settings>): void
  reset(): void
}

export type ProgressState = ProgressData & ProgressActions

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  sfx: true,
  voiceURI: null,
  rate: 0.95,
  dailyGoal: 20,
  autoplay: true,
}

export function initialProgress(): ProgressData {
  return {
    version: 1,
    completed: {},
    xp: 0,
    streak: { count: 0, lastDate: null },
    daily: { date: '', xp: 0 },
    mistakes: {},
    settings: { ...DEFAULT_SETTINGS },
  }
}

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

function gainXp(state: ProgressData, xp: number, today: string): Pick<ProgressData, 'xp' | 'daily' | 'streak'> {
  return {
    xp: state.xp + xp,
    daily: state.daily.date === today ? { date: today, xp: state.daily.xp + xp } : { date: today, xp },
    streak: registerActivity(state.streak, today),
  }
}

function updateMistakes(mistakes: Record<string, number>, wrong: string[], right: string[]): Record<string, number> {
  const next = { ...mistakes }
  for (const id of wrong) next[id] = (next[id] ?? 0) + 1
  for (const id of right) {
    if (!(id in next)) continue
    next[id] -= 1
    if (next[id] <= 0) delete next[id]
  }
  return next
}

type PersistedProgress = ProgressData

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialProgress(),

      completeLesson(nodeId, today = toDateKey(new Date())) {
        const state = get()
        const prev = state.completed[nodeId]
        set({
          ...gainXp(state, LESSON_XP, today),
          completed: {
            ...state.completed,
            [nodeId]: prev
              ? { ...prev, attempts: prev.attempts + 1 }
              : { bestScore: 1, stars: 0, attempts: 1, completedAt: today },
          },
        })
        return LESSON_XP
      },

      recordQuiz(record, today = toDateKey(new Date())) {
        const state = get()
        const score = record.total > 0 ? record.correct / record.total : 0
        const passed = isPassing(score, record.kind)
        const stars = scoreToStars(score, record.kind)
        const xp = quizXp(record.correct, passed, record.kind)
        const prev = record.nodeId ? state.completed[record.nodeId] : undefined
        const isNewBest = passed && !!record.nodeId && (!prev || score > prev.bestScore)

        let completed = state.completed
        if (record.nodeId && (passed || prev)) {
          completed = {
            ...completed,
            [record.nodeId]: prev
              ? {
                  bestScore: Math.max(prev.bestScore, score),
                  stars: Math.max(prev.stars, stars),
                  attempts: prev.attempts + 1,
                  completedAt: prev.completedAt,
                }
              : { bestScore: score, stars, attempts: 1, completedAt: today },
          }
        }

        set({
          ...gainXp(state, xp, today),
          completed,
          mistakes: updateMistakes(state.mistakes, record.wrongItemIds, record.rightItemIds),
        })
        return { score, passed, stars, xp, isNewBest }
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
      version: 1,
      storage: safeJSONStorage<PersistedProgress>(() => window.localStorage),
      partialize: (s): PersistedProgress => ({
        version: 1,
        completed: s.completed,
        xp: s.xp,
        streak: s.streak,
        daily: s.daily,
        mistakes: s.mistakes,
        settings: s.settings,
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<PersistedProgress>
        return {
          ...current,
          ...saved,
          settings: { ...current.settings, ...(saved.settings ?? {}) },
        }
      },
    },
  ),
)
