import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialProgress, useProgress } from '../../store/progress'
import { getNode, nodeItems } from '../course'
import { LessonPlayer } from './LessonPlayer'

beforeEach(() => useProgress.setState(initialProgress()))

const node = getNode('1:0')!
const items = nodeItems(node)

test('stepping through the 5 cards completes the lesson and offers the quiz', async () => {
  const user = userEvent.setup()
  render(<LessonPlayer node={node} />)

  for (let i = 0; i < items.length; i++) {
    expect(screen.getByRole('heading', { level: 1, name: items[i].en })).toBeInTheDocument()
    expect(screen.getByText(items[i].es)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: i === items.length - 1 ? /Terminar/i : /Siguiente/i }))
  }

  expect(screen.getByText(/¡Lección completada!/i)).toBeInTheDocument()
  expect(useProgress.getState().completed['1:0']).toBeDefined()
  expect(useProgress.getState().xp).toBe(10)

  await user.click(screen.getByRole('button', { name: /Empezar quiz/i }))
  expect(window.location.hash).toBe('#/play/1:1')
})

test('arrow keys move between cards', async () => {
  render(<LessonPlayer node={node} />)
  fireEvent.keyDown(window, { key: 'ArrowRight' })
  expect(await screen.findByRole('heading', { level: 1, name: items[1].en })).toBeInTheDocument()
  fireEvent.keyDown(window, { key: 'ArrowLeft' })
  expect(await screen.findByRole('heading', { level: 1, name: items[0].en })).toBeInTheDocument()
})

test('closing midway asks for confirmation and saves nothing', async () => {
  const user = userEvent.setup()
  render(<LessonPlayer node={node} />)
  await user.click(screen.getByRole('button', { name: /Siguiente/i }))
  await user.click(screen.getByRole('button', { name: /Salir/i }))
  expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Salir de la lección/i }))
  expect(useProgress.getState().completed).toEqual({})
  expect(window.location.hash).toBe('#/')
})
