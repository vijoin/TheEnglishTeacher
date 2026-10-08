import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { initialProgress, useProgress } from './store/progress'

beforeEach(() => {
  useProgress.setState(initialProgress())
  window.history.replaceState(null, '', '#/')
})

test('boots on the learning path and navigates between sections', async () => {
  const user = userEvent.setup()
  render(<App />)
  expect(screen.getAllByRole('link', { name: /The English Teacher/i }).length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: /^Lección 1 · Saludos — disponible$/ })).toBeEnabled()

  await user.click(screen.getAllByRole('button', { name: /Vocabulario/i })[0])
  expect(screen.getByRole('heading', { name: 'Vocabulario' })).toBeInTheDocument()

  await user.click(screen.getAllByRole('button', { name: /Perfil/i })[0])
  expect(screen.getByRole('heading', { name: 'Tu progreso' })).toBeInTheDocument()
})

test('opening the first lesson shows its first card', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^Lección 1 · Saludos — disponible$/ }))
  expect(await screen.findByRole('heading', { level: 1, name: 'hello' })).toBeInTheDocument()
})
