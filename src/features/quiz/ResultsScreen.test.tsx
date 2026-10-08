import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getNode } from '../course'
import { ResultsScreen } from './ResultsScreen'

const noop = () => {}

test('passing the level exam announces the unlocked level', () => {
  render(
    <ResultsScreen
      kind="exam50"
      result={{ correct: 22, total: 25, wrongItemIds: ['1-07-3'], rightItemIds: [] }}
      outcome={{ score: 0.88, passed: true, stars: 1, xp: 104, isNewBest: true }}
      node={getNode('1:22')}
      next={getNode('2:0')}
      onRetry={noop}
      onContinue={noop}
    />,
  )
  expect(screen.getByRole('heading', { name: '¡Nivel superado!' })).toBeInTheDocument()
  expect(screen.getByText(/Nivel 2: Mi día a día/)).toBeInTheDocument()
  expect(screen.getByText('22/25 correctas', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('+104 XP', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('Para repasar')).toBeInTheDocument()
  expect(screen.getByText('we')).toBeInTheDocument()
})

test('failing shows the pass mark and offers a retry and the lesson', async () => {
  const user = userEvent.setup()
  const onRetry = vi.fn()
  const onReviewLesson = vi.fn()
  render(
    <ResultsScreen
      kind="quiz5"
      result={{ correct: 4, total: 8, wrongItemIds: [], rightItemIds: [] }}
      outcome={{ score: 0.5, passed: false, stars: 0, xp: 8, isNewBest: false }}
      node={getNode('1:1')}
      next={getNode('1:2')}
      onRetry={onRetry}
      onContinue={noop}
      onReviewLesson={onReviewLesson}
    />,
  )
  expect(screen.getByRole('heading', { name: '¡Casi lo logras!' })).toBeInTheDocument()
  expect(screen.getByText(/Necesitas 70 % para aprobar/)).toBeInTheDocument()
  expect(screen.queryByText(/Nuevo nivel desbloqueado/i)).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Intentar de nuevo' }))
  await user.click(screen.getByRole('button', { name: 'Repasar la lección' }))
  expect(onRetry).toHaveBeenCalled()
  expect(onReviewLesson).toHaveBeenCalled()
})
