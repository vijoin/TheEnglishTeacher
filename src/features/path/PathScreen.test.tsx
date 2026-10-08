import { render, screen, within } from '@testing-library/react'
import { initialProgress, useProgress } from '../../store/progress'
import { COURSE_PATH } from '../course'
import { PathScreen } from './PathScreen'

beforeEach(() => useProgress.setState(initialProgress()))

test('a fresh learner can only start the first lesson', () => {
  render(<PathScreen />)
  const first = screen.getByRole('button', { name: /^Lección 1 · Saludos — disponible$/i })
  expect(first).toBeEnabled()
  expect(screen.getByRole('button', { name: /^Quiz rápido · Lección 1 — bloqueado$/i })).toBeDisabled()
})

test('completed nodes unlock the next one', () => {
  useProgress.getState().completeLesson('1:0', '2026-10-08')
  render(<PathScreen />)
  expect(screen.getByRole('button', { name: /^Quiz rápido · Lección 1 — disponible$/i })).toBeEnabled()
})

test('locked levels show what unlocks them', () => {
  render(<PathScreen />)
  const level2 = screen.getByRole('region', { name: /Nivel 2/i })
  expect(within(level2).getByText(/Aprueba el examen del Nivel 1/i)).toBeInTheDocument()
})

test('a completed level announces it', () => {
  const done = Object.fromEntries(
    COURSE_PATH.filter((n) => n.levelId === 1).map((n) => [n.id, { bestScore: 1, stars: 3, attempts: 1, completedAt: '' }]),
  )
  useProgress.setState({ completed: done })
  render(<PathScreen />)
  const level1 = screen.getByRole('region', { name: /Nivel 1/i })
  expect(within(level1).getByText(/Nivel completado/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^Lección 1 · Rutina de la mañana — disponible$/i })).toBeEnabled()
})
