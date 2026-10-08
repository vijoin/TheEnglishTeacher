import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialProgress, useProgress } from '../../store/progress'
import { VocabScreen } from './VocabScreen'

beforeEach(() => useProgress.setState(initialProgress()))

test('empty state before any lesson', () => {
  render(<VocabScreen />)
  expect(screen.getByText(/Aún no has aprendido palabras/)).toBeInTheDocument()
})

test('lists learned words with examples, searches both languages and flags mistakes', async () => {
  const user = userEvent.setup()
  useProgress.getState().completeLesson('1:0')
  useProgress.setState({ mistakes: { '1-01-2': 1 } })
  render(<VocabScreen />)

  expect(screen.getByText('5 palabras y frases aprendidas')).toBeInTheDocument()
  expect(screen.getAllByText(/^= /)).toHaveLength(5)
  expect(screen.getByText('Para repasar')).toBeInTheDocument()

  await user.type(screen.getByRole('searchbox'), 'adios')
  expect(screen.getAllByText(/^= /)).toHaveLength(1)
  expect(screen.getByText('goodbye')).toBeInTheDocument()

  await user.click(screen.getByText('goodbye'))
  expect(screen.getByText('Goodbye, Anna! See you later.')).toBeVisible()
})
