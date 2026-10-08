import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialProgress, useProgress } from '../../store/progress'
import { VocabScreen } from './VocabScreen'

beforeEach(() => useProgress.setState(initialProgress()))

test('empty state before any lesson', () => {
  render(<VocabScreen />)
  expect(screen.getByText(/Aún no has aprendido palabras/i)).toBeInTheDocument()
})

test('lists learned items, searches in both languages and flags mistakes', async () => {
  const user = userEvent.setup()
  useProgress.getState().completeLesson('1:0', '2026-10-08')
  useProgress.setState({ mistakes: { '1-01-2': 1 } })
  render(<VocabScreen />)

  expect(screen.getByText(/5 palabras y frases/i)).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(5)
  expect(screen.getByText(/Para repasar/i)).toBeInTheDocument()

  const search = screen.getByRole('searchbox')
  await user.type(search, 'adios')
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
  expect(screen.getByText('goodbye')).toBeInTheDocument()

  await user.clear(search)
  await user.type(search, 'MORNING')
  expect(screen.getAllByRole('listitem')).toHaveLength(1)

  await user.click(screen.getByRole('button', { name: /Practicar errores/i }))
  expect(window.location.hash).toBe('#/practice')
})

test('kind filter', async () => {
  const user = userEvent.setup()
  useProgress.getState().completeLesson('1:0', '2026-10-08')
  render(<VocabScreen />)
  await user.click(screen.getByRole('radio', { name: 'Frases' }))
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})
