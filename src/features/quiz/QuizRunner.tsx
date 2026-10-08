import { useMemo, useState } from 'react'
import type { Item, LevelColor } from '../../content/types'
import { nextNodeId, type PathNode } from '../../engine/path'
import { generateQuiz } from '../../engine/quiz'
import { createRng } from '../../engine/random'
import type { QuizKind } from '../../engine/scoring'
import { navigate } from '../../lib/router'
import { isSpeechSupported } from '../../lib/speech'
import { useProgress, type QuizOutcome } from '../../store/progress'
import { ALL_ITEMS, COURSE_PATH, getNode } from '../course'
import { PlayerFrame, PlayerHeader } from '../player/PlayerHeader'
import { QuizIntro, quizQuestionCount } from './QuizIntro'
import { QuizPlayer, type QuizResult } from './QuizPlayer'
import { ResultsScreen } from './ResultsScreen'

interface QuizRunnerProps {
  kind: QuizKind
  items: Item[]
  accent: LevelColor
  description: string
  node?: PathNode
}

type Phase = { name: 'intro' } | { name: 'quiz' } | { name: 'results'; result: QuizResult; outcome: QuizOutcome }

export function QuizRunner({ kind, items, accent, description, node }: QuizRunnerProps) {
  const recordQuiz = useProgress((s) => s.recordQuiz)
  const best = useProgress((s) => (node ? s.completed[node.id] : undefined))
  const [phase, setPhase] = useState<Phase>({ name: 'intro' })
  const [seed, setSeed] = useState(() => Date.now())

  const questions = useMemo(
    () =>
      generateQuiz(kind, items, {
        rng: createRng(seed),
        audio: isSpeechSupported(),
        pool: ALL_ITEMS,
        mistakes: useProgress.getState().mistakes,
      }),
    [kind, items, seed],
  )

  const nextId = node ? nextNodeId(COURSE_PATH, node.id) : null
  const next = nextId ? getNode(nextId) : undefined
  const home = () => navigate('/', { replace: true })

  return (
    <PlayerFrame accent={accent}>
      {phase.name === 'intro' && (
        <>
          <PlayerHeader progress={0} onClose={home} />
          <QuizIntro
            kind={kind}
            description={description}
            questionCount={quizQuestionCount(kind, items.length)}
            best={best && best.stars > 0 ? { score: best.bestScore, stars: best.stars } : undefined}
            onStart={() => setPhase({ name: 'quiz' })}
          />
        </>
      )}
      {phase.name === 'quiz' && (
        <QuizPlayer
          key={seed}
          questions={questions}
          onExit={home}
          onFinish={(result) => {
            const outcome = recordQuiz({ nodeId: node?.id ?? null, kind, ...result })
            setPhase({ name: 'results', result, outcome })
          }}
        />
      )}
      {phase.name === 'results' && (
        <>
          <PlayerHeader progress={1} onClose={home} />
          <ResultsScreen
            kind={kind}
            result={phase.result}
            outcome={phase.outcome}
            node={node}
            next={next}
            onRetry={() => {
              setSeed((s) => s + 1)
              setPhase({ name: 'quiz' })
            }}
            onContinue={() => (phase.outcome.passed && next ? navigate(`/play/${next.id}`, { replace: true }) : home())}
            onReviewLesson={
              node?.kind === 'quiz5' ? () => navigate(`/play/${node.levelId}:${node.index - 1}`, { replace: true }) : undefined
            }
          />
        </>
      )}
    </PlayerFrame>
  )
}
