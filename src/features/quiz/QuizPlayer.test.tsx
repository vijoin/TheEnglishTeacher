import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Question } from '../../engine/quiz'
import { getItem } from '../course'
import { QuizPlayer } from './QuizPlayer'

// Level 1, lesson 1: hello / goodbye / Good morning! / Good night! / How are you?
const hello = getItem('1-01-1')!
const goodbye = getItem('1-01-2')!
const howAreYou = getItem('1-01-5')!

async function checkAndContinue(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /Comprobar/i }))
  await user.click(await screen.findByRole('button', { name: /Continuar/i }))
}

test('answers every question type and reports the result', async () => {
  const user = userEvent.setup()
  const onFinish = vi.fn()
  const questions: Question[] = [
    { id: 'q1', type: 'choice-en-es', itemId: hello.id, options: ['adiós', hello.es, 'gracias', 'por favor'], answer: hello.es },
    { id: 'q2', type: 'type', itemId: goodbye.id },
    { id: 'q3', type: 'build', itemId: howAreYou.id, tiles: ['you', 'How', 'is', 'are', 'my'] },
    { id: 'q4', type: 'choice-es-en', itemId: goodbye.id, options: ['hello', 'goodbye', 'please', 'sorry'], answer: 'goodbye' },
    { id: 'q5', type: 'match', itemIds: [hello.id, goodbye.id, howAreYou.id, '1-01-3'] },
  ]
  render(<QuizPlayer questions={questions} onFinish={onFinish} onExit={() => {}} />)

  // 1. choice EN → ES (correct)
  expect(screen.getByText(/¿Qué significa\?/i)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: new RegExp(hello.es, 'i') }))
  await user.click(screen.getByRole('button', { name: /Comprobar/i }))
  expect(await screen.findByText(/¡(Correcto|Excelente|Muy bien|Perfecto)!/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Continuar/i }))

  // 2. typing with a small typo still counts
  await user.type(screen.getByRole('textbox'), 'goodby')
  await user.click(screen.getByRole('button', { name: /Comprobar/i }))
  expect(await screen.findByText(/Casi/i)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Continuar/i }))

  // 3. build the phrase
  const bank = screen.getByRole('group', { name: /Fichas disponibles/i })
  for (const word of ['How', 'are', 'you']) await user.click(within(bank).getByRole('button', { name: word }))
  await checkAndContinue(user)

  // 4. choice ES → EN, answered wrong on purpose
  await user.click(screen.getByRole('button', { name: /please/i }))
  await user.click(screen.getByRole('button', { name: /Comprobar/i }))
  expect(await screen.findByText(/Respuesta correcta/i)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Continuar/i }))

  // 5. match pairs without mistakes
  const left = screen.getByRole('group', { name: /Inglés/i })
  const right = screen.getByRole('group', { name: /Español/i })
  for (const id of [hello.id, goodbye.id, howAreYou.id, '1-01-3']) {
    const item = getItem(id)!
    await user.click(within(left).getByRole('button', { name: item.en }))
    await user.click(within(right).getByRole('button', { name: item.es }))
  }
  await user.click(await screen.findByRole('button', { name: /Continuar/i }))

  expect(onFinish).toHaveBeenCalledTimes(1)
  const result = onFinish.mock.calls[0][0]
  expect(result.total).toBe(5)
  expect(result.correct).toBe(4)
  expect(result.wrongItemIds).toEqual([goodbye.id])
  expect(result.rightItemIds).toEqual(expect.arrayContaining([hello.id, howAreYou.id]))
})

test('number keys pick options and Enter checks', async () => {
  const user = userEvent.setup()
  const onFinish = vi.fn()
  const questions: Question[] = [
    { id: 'q1', type: 'choice-es-en', itemId: hello.id, options: ['goodbye', 'hello', 'please', 'sorry'], answer: 'hello' },
  ]
  render(<QuizPlayer questions={questions} onFinish={onFinish} onExit={() => {}} />)
  await user.keyboard('2')
  await user.keyboard('{Enter}')
  expect(await screen.findByText(/¡(Correcto|Excelente|Muy bien|Perfecto)!/)).toBeInTheDocument()
  await user.keyboard('{Enter}')
  expect(onFinish).toHaveBeenCalledWith(expect.objectContaining({ correct: 1, total: 1 }))
})
