import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialProgress, useProgress } from '../../store/progress'
import { ProfileScreen } from './ProfileScreen'

beforeEach(() => useProgress.setState(initialProgress()))

test('settings update the store', async () => {
  const user = userEvent.setup()
  render(<ProfileScreen />)
  await user.click(screen.getByRole('radio', { name: 'Oscuro' }))
  expect(useProgress.getState().settings.theme).toBe('dark')
  await user.click(screen.getByRole('switch', { name: /Efectos de sonido/i }))
  expect(useProgress.getState().settings.sfx).toBe(false)
  await user.click(screen.getByRole('radio', { name: '50 XP' }))
  expect(useProgress.getState().settings.dailyGoal).toBe(50)
})

test('shows stats and resets progress after confirmation', async () => {
  const user = userEvent.setup()
  useProgress.getState().completeLesson('1:0', '2026-10-08')
  render(<ProfileScreen />)
  expect(screen.getByText('Palabras aprendidas').closest('div')).toHaveTextContent('5')

  await user.click(screen.getByRole('button', { name: /Reiniciar progreso/i }))
  await user.click(screen.getByRole('button', { name: /Sí, borrar todo/i }))
  expect(useProgress.getState().completed).toEqual({})
  expect(useProgress.getState().xp).toBe(0)
})
