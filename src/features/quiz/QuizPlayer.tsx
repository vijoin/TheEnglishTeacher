import { ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../components/Button'
import { gradeQuestion, type Grade, type Response } from '../../engine/grade'
import type { Question } from '../../engine/quiz'
import { getItem, KNOWN_WORDS } from '../course'
import { isButtonTarget, useSettings, useSpeak } from '../hooks'
import { PlayerFooter, PlayerHeader } from '../player/PlayerHeader'
import { QuestionView } from './QuestionView'

export interface QuizResult {
  correct: number
  total: number
  wrongItemIds: string[]
  rightItemIds: string[]
}

interface QuizPlayerProps {
  title: string
  questions: Question[]
  onFinish: (result: QuizResult) => void
  onClose: () => void
}

function hasAnswer(r: Response | null): boolean {
  return !!r && r.value.trim().length > 0
}

/** Every question must be answered before moving on; there is no skip. */
export function QuizPlayer({ title, questions, onFinish, onClose }: QuizPlayerProps) {
  const say = useSpeak()
  const { autoplay } = useSettings()
  const [index, setIndex] = useState(0)
  const [response, setResponse] = useState<Response | null>(null)
  const [grade, setGrade] = useState<Grade | null>(null)
  const [results, setResults] = useState<{ itemId: string; correct: boolean }[]>([])
  const question = questions[index]
  const item = getItem(question.itemId)!
  const last = index === questions.length - 1
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (index > 0 && question.type !== 'type') cardRef.current?.focus({ preventScroll: true })
  }, [index, question.type])

  const answer = useCallback(() => {
    if (grade || !response || !hasAnswer(response)) return
    const g = gradeQuestion(question, response, getItem, KNOWN_WORDS)
    setGrade(g)
    setResults((r) => [...r, { itemId: question.itemId, correct: g.correct }])
    if (autoplay) say(item.en)
  }, [grade, response, question, item.en, autoplay, say])

  const next = useCallback(() => {
    if (!grade) return
    if (last) {
      onFinish({
        correct: results.filter((r) => r.correct).length,
        total: questions.length,
        wrongItemIds: results.filter((r) => !r.correct).map((r) => r.itemId),
        rightItemIds: results.filter((r) => r.correct).map((r) => r.itemId),
      })
      return
    }
    setIndex((i) => i + 1)
    setResponse(null)
    setGrade(null)
  }, [grade, last, results, questions.length, onFinish])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.repeat || document.querySelector('[role="alertdialog"]')) return
      const option = e.target instanceof HTMLElement ? e.target.closest<HTMLElement>('[data-choice]') : null
      const selected = response?.kind === 'choice' ? response.value : null
      // Enter on a focused option the learner hasn't chosen yet just chooses it.
      if (option && !grade && option.dataset.value !== selected) return
      if (isButtonTarget(e)) return
      e.preventDefault()
      if (grade) next()
      else answer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [grade, next, answer, response])

  return (
    <>
      <PlayerHeader
        title={title}
        progress={(index + (grade ? 1 : 0)) / questions.length}
        onClose={onClose}
        right={`${index + 1} / ${questions.length}`}
      />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <article
          key={question.id}
          ref={cardRef}
          tabIndex={-1}
          aria-label={`Pregunta ${index + 1} de ${questions.length}`}
          className="animate-enter rounded-xl border border-line bg-surface p-5 shadow-sm outline-none sm:p-8"
        >
          <p className="mb-4 text-sm text-muted tabular-nums">
            Pregunta {index + 1} de {questions.length}
          </p>
          <QuestionView question={question} item={item} response={response} grade={grade} onResponse={setResponse} />
        </article>
      </main>
      <PlayerFooter>
        {grade ? (
          <Button size="lg" onClick={next} autoFocus>
            {last ? 'Ver resultado' : 'Siguiente pregunta'} <ArrowRight className="h-5 w-5" />
          </Button>
        ) : (
          <>
            {!hasAnswer(response) && <p className="mr-auto self-center text-sm text-muted">Responde para continuar.</p>}
            <Button size="lg" onClick={answer} disabled={!hasAnswer(response)}>
              Responder
            </Button>
          </>
        )}
      </PlayerFooter>
    </>
  )
}
