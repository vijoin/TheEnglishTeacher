import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { navigate } from '../../lib/router'
import { initialProgress, useProgress } from '../../store/progress'
import { PlayRoute } from './PlayRoute'

beforeEach(() => {
  useProgress.setState(initialProgress())
  navigate('/play/1:1', { replace: true })
})

test('a locked node sends the learner back to the map', () => {
  render(<PlayRoute nodeId="1:1" />)
  expect(window.location.hash).toBe('#/')
})

test('an available quiz shows its intro with the pass mark', () => {
  useProgress.getState().completeLesson('1:0', '2026-10-08')
  render(<PlayRoute nodeId="1:1" />)
  expect(screen.getByRole('heading', { name: /Quiz rápido/i })).toBeInTheDocument()
  expect(screen.getByText(/8 preguntas/i)).toBeInTheDocument()
  expect(screen.getByText(/70 %/i)).toBeInTheDocument()
})

test('leaving a quiz midway keeps the node unfinished', async () => {
  const user = userEvent.setup()
  useProgress.getState().completeLesson('1:0', '2026-10-08')
  const before = useProgress.getState().xp
  render(<PlayRoute nodeId="1:1" />)
  await user.click(screen.getByRole('button', { name: /Comenzar/i }))
  await user.click(screen.getByRole('button', { name: /Salir/i }))
  await user.click(screen.getByRole('button', { name: /Salir del quiz/i }))
  expect(useProgress.getState().completed['1:1']).toBeUndefined()
  expect(useProgress.getState().xp).toBe(before)
  expect(window.location.hash).toBe('#/')
})
