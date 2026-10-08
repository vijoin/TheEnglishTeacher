import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialProgress, useProgress } from '../../store/progress'
import { COURSE_PATH } from '../course'
import { HomeScreen } from './HomeScreen'

beforeEach(() => useProgress.setState(initialProgress()))

test('a new learner starts with lesson 1; everything after it is locked', () => {
  render(<HomeScreen />)
  expect(screen.getByText('Lección 1 · Saludos', { selector: 'p' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Lección 1 · Saludos — disponible' })).toBeEnabled()
  expect(screen.getByRole('button', { name: 'Quiz de la lección 1 — bloqueado' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Examen del nivel 1 — bloqueado' })).toBeDisabled()
  expect(screen.getByText('0 de 23 pasos')).toBeInTheDocument()
})

test('locked levels explain how to unlock them', async () => {
  const user = userEvent.setup()
  render(<HomeScreen />)
  const tabs = screen.getByRole('tablist', { name: 'Niveles' })
  await user.click(within(tabs).getByRole('tab', { name: /Nivel 2/ }))
  expect(screen.getByText(/Supera el examen del nivel 1 sin errores/)).toBeInTheDocument()
})

test('finishing level 1 unlocks level 2 and marks level 1 done', () => {
  const done = Object.fromEntries(COURSE_PATH.filter((n) => n.levelId === 1).map((n) => [n.id, { completedAt: '2026-10-08' }]))
  useProgress.setState({ completed: done })
  render(<HomeScreen />)
  expect(screen.getByRole('heading', { name: 'Mi día a día' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Lección 1 · Rutina de la mañana — disponible' })).toBeEnabled()
  expect(screen.getByRole('tab', { name: /Nivel 1/ })).toContainElement(screen.getByLabelText('superado'))
})
