import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialProgress, useProgress } from '../../store/progress'
import { SettingsScreen } from './SettingsScreen'

beforeEach(() => useProgress.setState(initialProgress()))

test('settings update the store', async () => {
  const user = userEvent.setup()
  render(<SettingsScreen />)
  await user.click(screen.getByRole('radio', { name: 'Oscuro' }))
  expect(useProgress.getState().settings.theme).toBe('dark')
  // Without English voices there is nothing to pronounce, so audio settings are hidden.
  expect(screen.getByText(/no tiene voces en inglés/)).toBeInTheDocument()
  expect(screen.queryByRole('switch', { name: 'Pronunciar automáticamente' })).not.toBeInTheDocument()
})

test('reset clears progress after confirmation', async () => {
  const user = userEvent.setup()
  useProgress.getState().completeLesson('1:0')
  render(<SettingsScreen />)
  expect(screen.getByText(/1 de 138 pasos completados/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Reiniciar progreso' }))
  await user.click(screen.getByRole('button', { name: 'Sí, borrar todo' }))
  expect(useProgress.getState().completed).toEqual({})
})
