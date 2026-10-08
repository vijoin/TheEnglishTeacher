import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { navigate } from './lib/router'
import { initialProgress, useProgress } from './store/progress'

beforeEach(() => {
  useProgress.setState(initialProgress())
  navigate('/', { replace: true })
})

test('boots on the course index and navigates between sections', async () => {
  const user = userEvent.setup()
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Primeros pasos' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Vocabulario' }))
  expect(screen.getByRole('heading', { name: 'Vocabulario' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Ajustes' }))
  expect(screen.getByRole('heading', { name: 'Ajustes' })).toBeInTheDocument()
})

test('a lesson shows one word at a time and then leads into its quiz', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /Empezar/ }))
  expect(screen.getByRole('heading', { level: 1, name: 'hello' })).toBeInTheDocument()
  expect(screen.getByText('hola')).toBeInTheDocument()
  expect(screen.getByText('Hello, my name is Tom.')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)

  for (let i = 0; i < 4; i++) await user.click(screen.getByRole('button', { name: /Siguiente/ }))
  expect(screen.getByRole('heading', { level: 1, name: 'How are you?' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Ir al quiz/ }))

  expect(useProgress.getState().completed['1:0']).toBeDefined()
  expect(window.location.hash).toBe('#/play/1:1')
  expect(screen.getByRole('heading', { name: 'Quiz de la lección 1' })).toBeInTheDocument()
  expect(screen.getByText(/hay que acertar todas/)).toBeInTheDocument()
})

test('a locked step sends the learner back to the index', () => {
  navigate('/play/1:5', { replace: true })
  render(<App />)
  expect(window.location.hash).toBe('#/')
  expect(screen.getByRole('heading', { name: 'Primeros pasos' })).toBeInTheDocument()
})

test('leaving a lesson after the first word asks for confirmation', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /Empezar/ }))
  await user.click(screen.getByRole('button', { name: /Siguiente/ }))
  await user.click(screen.getByRole('button', { name: 'Salir' }))
  expect(screen.getByRole('alertdialog')).toHaveTextContent('¿Salir de la lección?')
})

test('in test mode an advanced step opens directly', () => {
  useProgress.getState().updateSettings({ unlockAll: true })
  navigate('/play/6:0', { replace: true })
  render(<App />)
  expect(window.location.hash).toBe('#/play/6:0')
  expect(screen.getByRole('heading', { level: 1, name: 'however' })).toBeInTheDocument()
})
