import { Flame } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import type { Item } from '../../content/types'
import { gradeQuestion, type Grade, type Response } from '../../engine/grade'
import { questionItemIds, type Question } from '../../engine/quiz'
import { getItem } from '../course'
import { isButtonTarget, useSettings, useSfx, useSpeak } from '../hooks'
import { PlayerHeader } from '../player/PlayerHeader'
import { FeedbackSheet } from './FeedbackSheet'
import { BuildQuestion } from './questions/BuildQuestion'
import { ChoiceQuestion } from './questions/ChoiceQuestion'
import { MatchQuestion } from './questions/MatchQuestion'
import { TypeQuestion } from './questions/TypeQuestion'

export interface QuizResult {
  correct: number
  total: number
  wrongItemIds: string[]
  rightItemIds: string[]
}

interface QuizPlayerProps {
  questions: Question[]
  onFinish: (result: QuizResult) => void
  onExit: () => void
}

interface Answered {
  correct: boolean
  wrongIds: string[]
  rightIds: string[]
}

function canCheck(r: Response | null): boolean {
  if (!r) return false
  if (r.kind === 'text') return r.value.trim().length > 0
  if (r.kind === 'tiles') return r.value.length > 0
  return true
}

const items = (ids: string[]) => ids.map(getItem).filter((i): i is Item => !!i)

export function QuizPlayer({ questions, onFinish, onExit }: QuizPlayerProps) {
  const sfx = useSfx()
  const say = useSpeak()
  const { autoplay } = useSettings()
  const [index, setIndex] = useState(0)
  const [response, setResponse] = useState<Response | null>(null)
  const [grade, setGrade] = useState<Grade | null>(null)
  const [answers, setAnswers] = useState<Answered[]>([])
  const [combo, setCombo] = useState(0)
  const [confirmExit, setConfirmExit] = useState(false)
  const question = questions[index]
  const ids = useMemo(() => questionItemIds(question), [question])
  const item = getItem(ids[0])!

  const submit = useCallback(
    (r: Response) => {
      const g = gradeQuestion(question, r, getItem)
      const wrongIds = g.correct ? [] : r.kind === 'match' ? r.wrongItemIds : ids
      setResponse(r)
      setGrade(g)
      setAnswers((a) => [...a, { correct: g.correct, wrongIds, rightIds: ids.filter((id) => !wrongIds.includes(id)) }])
      setCombo((c) => (g.correct ? c + 1 : 0))
      sfx(g.correct ? 'correct' : 'wrong')
      if (autoplay && question.type !== 'match') say(item.en)
    },
    [question, ids, item, autoplay, say, sfx],
  )

  const check = useCallback(() => {
    if (!grade && canCheck(response)) submit(response!)
  }, [grade, response, submit])

  const next = useCallback(() => {
    if (index + 1 >= questions.length) {
      const wrong = new Set(answers.flatMap((a) => a.wrongIds))
      onFinish({
        correct: answers.filter((a) => a.correct).length,
        total: questions.length,
        wrongItemIds: [...wrong],
        // An item missed anywhere in this quiz doesn't earn its mistake back.
        rightItemIds: [...new Set(answers.flatMap((a) => a.rightIds))].filter((id) => !wrong.has(id)),
      })
      return
    }
    setIndex((i) => i + 1)
    setResponse(null)
    setGrade(null)
  }, [index, questions.length, answers, onFinish])

  useEffect(() => {
    if (confirmExit) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || isButtonTarget(e)) return
      e.preventDefault()
      if (grade) next()
      else check()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [grade, next, check, confirmExit])

  const skippable = question.type === 'type' || question.type === 'build'
  const matchWrong = grade && !grade.correct && response?.kind === 'match' ? items(response.wrongItemIds) : []

  return (
    <>
      <PlayerHeader
        progress={(index + (grade ? 1 : 0)) / questions.length}
        onClose={() => setConfirmExit(true)}
        right={
          combo >= 3 ? (
            <motion.span
              key={combo}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="flex shrink-0 items-center gap-1 font-extrabold text-orange-500"
              aria-label={`${combo} respuestas correctas seguidas`}
            >
              <Flame className="h-5 w-5 fill-orange-400" /> {combo}
            </motion.span>
          ) : (
            <span className="shrink-0 text-sm font-extrabold text-muted">
              {index + 1}/{questions.length}
            </span>
          )
        }
      />
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-2 pb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
          >
            {(question.type === 'choice-en-es' || question.type === 'choice-es-en' || question.type === 'listen') && (
              <ChoiceQuestion
                type={question.type}
                item={item}
                options={question.options}
                answer={question.answer}
                value={response?.kind === 'choice' ? response.value : null}
                grade={grade}
                onSelect={(value) => setResponse({ kind: 'choice', value })}
              />
            )}
            {question.type === 'type' && (
              <TypeQuestion
                item={item}
                value={response?.kind === 'text' ? response.value : ''}
                grade={grade}
                onChange={(value) => setResponse({ kind: 'text', value })}
              />
            )}
            {question.type === 'build' && (
              <BuildQuestion
                item={item}
                tiles={question.tiles}
                selected={response?.kind === 'tiles' ? tileIndexes(question.tiles, response.value) : []}
                grade={grade}
                onChange={(sel) => setResponse({ kind: 'tiles', value: sel.map((i) => question.tiles[i]) })}
              />
            )}
            {question.type === 'match' && (
              <MatchQuestion items={items(question.itemIds)} disabled={!!grade} onComplete={(r) => submit({ kind: 'match', ...r })} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 z-10">
        {grade ? (
          <FeedbackSheet
            grade={grade}
            reveal={question.type === 'match' ? matchWrong : [item]}
            answerText={'answer' in question ? question.answer : undefined}
            praiseIndex={index}
            onContinue={next}
          />
        ) : (
          question.type !== 'match' && (
            <div className="border-t border-line bg-bg/90 backdrop-blur-md">
              <div className="mx-auto flex w-full max-w-2xl gap-3 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                {skippable && (
                  <Button variant="outline" size="lg" onClick={() => submit({ kind: 'text', value: '' })}>
                    No lo sé
                  </Button>
                )}
                <Button variant="accent" size="lg" block disabled={!canCheck(response)} onClick={check}>
                  Comprobar
                </Button>
              </div>
            </div>
          )
        )}
      </div>

      <ConfirmDialog
        open={confirmExit}
        title="¿Salir del quiz?"
        message="Tu resultado no se guardará."
        confirmLabel="Salir del quiz"
        cancelLabel="Seguir respondiendo"
        danger
        onConfirm={onExit}
        onCancel={() => setConfirmExit(false)}
      />
    </>
  )
}

/** Maps chosen tile texts back to tile indexes, honouring duplicates. */
function tileIndexes(tiles: string[], chosen: string[]): number[] {
  const used = new Set<number>()
  return chosen.map((word) => {
    const i = tiles.findIndex((t, idx) => t === word && !used.has(idx))
    used.add(i)
    return i
  })
}
