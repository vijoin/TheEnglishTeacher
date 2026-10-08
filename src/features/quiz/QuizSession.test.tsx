import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Question } from '../../engine/quiz'
import { initialProgress, useProgress } from '../../store/progress'
import { getItem, getNode, nodeItems } from '../course'
import { QuizSession, type GenerateQuiz } from './QuizSession'

beforeEach(() => useProgress.setState(initialProgress()))

const hello = getItem('1-01-1')!
const goodbye = getItem('1-01-2')!

const choice = (id: string, itemId: string, answer: string, options: string[]): Question => ({ id, type: 'choice-es-en', itemId, answer, options })
const twoQuestions: GenerateQuiz = () => [
  choice('q1', hello.id, hello.en, [hello.en, goodbye.en, 'please', 'sorry']),
  choice('q2', goodbye.id, goodbye.en, [goodbye.en, hello.en, 'please', 'sorry']),
]

async function answer(user: ReturnType<typeof userEvent.setup>, option: string) {
  await user.click(screen.getByRole('radio', { name: new RegExp(option, 'i') }))
  await user.click(screen.getByRole('button', { name: 'Responder' }))
}

test('a mistake forces a review of the missed word and a retake until all answers are right', async () => {
  const user = userEvent.setup()
  const generate = vi.fn(twoQuestions)
  const onContinue = vi.fn()
  const step = getNode('1:1')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={onContinue} onHome={() => {}} generate={generate} />)

  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  expect(generate).toHaveBeenLastCalledWith([], 1)

  // Cannot move on without answering.
  expect(screen.getByRole('button', { name: 'Responder' })).toBeDisabled()
  expect(screen.getByText('Responde para continuar.')).toBeInTheDocument()

  await answer(user, 'goodbye') // wrong: the prompt is "hola"
  expect(screen.getByText('Incorrecto.')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Siguiente pregunta/ }))
  await answer(user, 'goodbye') // right
  expect(screen.getByText('Correcto.')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Ver resultado/ }))

  expect(screen.getByRole('heading', { name: 'Todavía no' })).toBeInTheDocument()
  expect(screen.getByText('1 de 2 respuestas correctas')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Continuar' })).not.toBeInTheDocument()
  expect(useProgress.getState().completed['1:1']).toBeUndefined()
  expect(useProgress.getState().mistakes).toEqual({ [hello.id]: 1 })

  // The review shows the missed word with its examples, then the quiz comes back.
  await user.click(screen.getByRole('button', { name: 'Repasar las palabras falladas' }))
  expect(screen.getByRole('heading', { level: 1, name: hello.en })).toBeInTheDocument()
  expect(screen.getByText(hello.examples[2].en)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Repetir el quiz/ }))
  expect(generate).toHaveBeenLastCalledWith([hello.id], 2)

  await answer(user, 'hello')
  await user.click(screen.getByRole('button', { name: /Siguiente pregunta/ }))
  await answer(user, 'goodbye')
  await user.click(screen.getByRole('button', { name: /Ver resultado/ }))

  expect(screen.getByRole('heading', { name: 'Quiz superado' })).toBeInTheDocument()
  expect(screen.getByText(/intento 2/)).toBeInTheDocument()
  expect(useProgress.getState().completed['1:1']).toBeDefined()
  expect(useProgress.getState().mistakes).toEqual({})
  await user.click(screen.getByRole('button', { name: 'Continuar' }))
  expect(onContinue).toHaveBeenCalled()
})

test('Enter answers and continues; letters pick options', async () => {
  const user = userEvent.setup()
  const step = getNode('1:1')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={() => {}} onHome={() => {}} generate={() => twoQuestions([], 1).slice(0, 1)} />)
  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  await user.keyboard('a')
  await user.keyboard('{Enter}')
  expect(screen.getByText('Correcto.')).toBeInTheDocument()
  await user.keyboard('{Enter}')
  expect(screen.getByRole('heading', { name: 'Quiz superado' })).toBeInTheDocument()
})

test('passing the level exam for the first time announces the unlocked level', async () => {
  const user = userEvent.setup()
  const step = getNode('1:22')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={() => {}} onHome={() => {}} generate={() => twoQuestions([], 1).slice(0, 1)} />)
  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  await answer(user, 'hello')
  await user.click(screen.getByRole('button', { name: /Ver resultado/ }))
  expect(screen.getByRole('heading', { name: 'Examen superado' })).toBeInTheDocument()
  expect(screen.getByText(/Desbloqueaste el/)).toHaveTextContent('nivel 2: Mi día a día')
})

test('leaving mid-quiz asks first and saves nothing', async () => {
  const user = userEvent.setup()
  const onHome = vi.fn()
  const step = getNode('1:1')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={() => {}} onHome={onHome} generate={twoQuestions} />)
  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  await answer(user, 'hello')
  await user.click(screen.getByRole('button', { name: 'Salir' }))
  const dialog = screen.getByRole('alertdialog')
  await user.click(within(dialog).getByRole('button', { name: 'Salir' }))
  expect(onHome).toHaveBeenCalled()
  expect(useProgress.getState().completed).toEqual({})
})

test('option keys do nothing while the exit dialog is open', async () => {
  const user = userEvent.setup()
  const step = getNode('1:1')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={() => {}} onHome={() => {}} generate={twoQuestions} />)
  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  await user.click(screen.getByRole('button', { name: 'Salir' }))
  await user.keyboard('b')
  await user.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Seguir' }))
  expect(screen.getByRole('button', { name: 'Responder' })).toBeDisabled()
})

test('Tab to an option and Enter selects it; Enter again answers', async () => {
  const user = userEvent.setup()
  const step = getNode('1:1')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={() => {}} onHome={() => {}} generate={twoQuestions} />)
  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  await user.keyboard('b') // pick B ("goodbye", wrong) first
  screen.getByRole('radio', { name: /hello/ }).focus()
  await user.keyboard('{Enter}')
  expect(screen.getByRole('radio', { name: /hello/ })).toHaveAttribute('aria-checked', 'true')
  expect(screen.queryByRole('status')).toBeEmptyDOMElement()
  await user.keyboard('{Enter}')
  expect(screen.getByText('Correcto.')).toBeInTheDocument()
})

test('shortcuts with modifier keys are ignored', async () => {
  const user = userEvent.setup()
  const step = getNode('1:1')!
  render(<QuizSession step={step} items={nodeItems(step)} onContinue={() => {}} onHome={() => {}} generate={twoQuestions} />)
  await user.click(screen.getByRole('button', { name: 'Empezar' }))
  await user.keyboard('{Control>}c{/Control}')
  expect(screen.getByRole('button', { name: 'Responder' })).toBeDisabled()
})
