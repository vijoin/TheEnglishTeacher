# The English Teacher — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A modern web clone of the interactive course "The English Teacher": 5-item lessons, quizzes every 5 / 20 / 50 items, unlockable levels.

**Architecture:** Static SPA. Pure, seeded, unit-tested engine (`src/engine`) over typed course content (`src/content`); Zustand store persisted to localStorage; React feature screens under `src/features`. Hash routing, no backend.

**Tech Stack:** Vite 7.3, React 19.2, TypeScript 5.9, Tailwind CSS 4.1 (`@tailwindcss/vite`), motion 12, zustand 5, lucide-react, canvas-confetti, Vitest 3.2 + @testing-library/react 16 + jsdom 26, vite-plugin-singlefile 2 (artifact build only).

**Spec:** `docs/superpowers/specs/2026-10-08-english-teacher-clone-design.md`

## Global Constraints

- UI copy in neutral Spanish; course content English ↔ Spanish.
- 6 levels × 10 lessons × 5 items. Level path = 23 nodes: `L Q5 ×4, R20, L Q5 ×4, R20, L Q5 ×2, E50`.
- Pass thresholds: quiz5 0.70, review20 0.75, exam50 0.80. Stars: pass=1, ≥0.90=2, 1.00=3.
- Question counts: quiz5 8, review20 15, exam50 25.
- XP: lesson 10; quiz 2/correct, +5 on pass, +50 extra on exam50 pass.
- Item id `${level}-${lesson2digits}-${item1based}` (e.g. `1-03-2`); node id `${level}:${index0based}` (e.g. `1:7`).
- localStorage key `tet-progress`, persisted `version: 1`; every storage access wrapped in try/catch.
- No "Opus" branding anywhere in the UI.
- `npm test` (vitest run), `npm run build` (tsc -b && vite build) and `npm run lint` (tsc --noEmit) must pass before every commit.

## Review Focus

1. Speech synthesis missing (Firefox Linux, jsdom) → no audio buttons, no `listen` questions, no crash. Test in Task 4 (`audio:false`) and Task 6 (`isSpeechSupported` false in jsdom).
2. Corrupt/blocked localStorage → app still renders with defaults. Test in Task 5 (`safeStorage` with throwing storage).
3. Typed answers with smart quotes, accents, trailing "?" or contractions (`I’m` vs `I am`) → accepted. Test in Task 3.
4. Duplicate Spanish meanings inside a level → ambiguous multiple choice. Test in Task 2 (unique `es` per level; unique `en` per course).
5. Leaving a quiz midway or refreshing → no partial result saved, node stays available. Test in Task 9 (close → confirm → store unchanged).

---

### Task 1: Scaffold

**Files:** Create `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/test/setup.ts`, `src/App.test.tsx`, `.gitignore`.

- [ ] Install exact deps from Tech Stack; scripts `dev`, `build`, `build:single` (`vite build --mode single`), `preview`, `test` (`vitest run`), `lint` (`tsc -b --noEmit` equivalent).
- [ ] `vite.config.ts`: `base: './'`, react + tailwind plugins, singlefile plugin only when `mode === 'single'` (outDir `dist-single`), vitest `environment: 'jsdom'`, `setupFiles: ['src/test/setup.ts']`.
- [ ] `index.css`: `@import "tailwindcss"`, `@custom-variant dark (&:where(.dark, .dark *))`, theme tokens (`--font-sans: "Nunito"…`), level accent palettes.
- [ ] Smoke test `App.test.tsx`: renders without crashing. Run `npm test` → PASS. Commit.

### Task 2: Content model + course

**Files:** Create `src/content/types.ts`, `src/content/levels/level1.ts … level6.ts`, `src/content/index.ts`, `src/content/content.test.ts`.

**Interfaces — Produces:**
```ts
type ItemKind = 'word' | 'phrase'
type LevelColor = 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'indigo'
interface ItemInput { en: string; es: string; kind: ItemKind; example: { en: string; es: string }; alt?: string[]; note?: string }
interface LessonInput { title: string; emoji: string; items: ItemInput[] }
interface LevelInput { id: number; title: string; subtitle: string; cefr: string; emoji: string; color: LevelColor; lessons: LessonInput[] }
interface Item extends ItemInput { id: string; levelId: number; lessonIndex: number }
interface Lesson { index: number; title: string; emoji: string; items: Item[] }
interface Level extends Omit<LevelInput,'lessons'> { lessons: Lesson[]; items: Item[] }
buildCourse(inputs: LevelInput[]): Level[]
COURSE: Level[]; ALL_ITEMS: Item[]; getItem(id: string): Item | undefined; getLevel(id: number): Level | undefined
```

- [ ] Tests: 6 levels with ids 1..6; each 10 lessons × 5 items; ids match `/^\d-\d{2}-[1-5]$/`; `en` unique across course (normalized); `es` unique per level (normalized); every level has ≥15 words and ≥15 phrases; all strings trimmed and non-empty; example present.
- [ ] Level content (parallel, independent files) — topics in Appendix A.
- [ ] Run → PASS. Commit.

### Task 3: Random + answer checking

**Files:** `src/engine/random.ts`, `src/engine/answer.ts`, tests alongside.

**Produces:** `createRng(seed: number): () => number` (mulberry32); `shuffle<T>(a: readonly T[], rng): T[]`; `sample<T>(a, n, rng): T[]`; `normalizeAnswer(s: string): string`; `levenshtein(a: string, b: string): number`; `type TypedResult = 'correct' | 'typo' | 'wrong'`; `checkTyped(input: string, item: { en: string; alt?: string[] }): TypedResult`; `tokenize(s: string): string[]`.

- [ ] Tests: same seed ⇒ same sequence; `normalizeAnswer("I’m  HERE!")` === `"i am here"`; `"What's your name?"` vs `"what is your name"` → correct; `"hous"` vs `house` → typo; `"car"` vs `house` → wrong; alt accepted; `tokenize("How are you?")` → `["How","are","you"]`; `"don't"` keeps apostrophe as one token.
- [ ] Typo threshold: distance ≤1 if answer length ≤8, ≤2 otherwise; empty input is wrong.
- [ ] Contractions expanded: `'m→am, n't→not (can't→can not, won't→will not), 're→are, 's→is, 'll→will, 've→have, 'd→would`; accents stripped via NFD.
- [ ] PASS. Commit.

### Task 4: Path, scoring, streak, quiz generator

**Files:** `src/engine/path.ts`, `scoring.ts`, `streak.ts`, `quiz.ts`, tests alongside.

**Produces:**
```ts
type NodeKind = 'lesson' | 'quiz5' | 'review20' | 'exam50'
type QuizKind = 'quiz5' | 'review20' | 'exam50' | 'practice'
interface PathNode { id: string; levelId: number; index: number; kind: NodeKind; lessonIndex: number /* lesson it follows/belongs to */; itemIds: string[]; title: string }
buildLevelPath(level: Level): PathNode[]; buildCoursePath(course: Level[]): PathNode[]
type NodeStatus = 'locked' | 'available' | 'completed'
getNodeStatuses(path: PathNode[], completed: Record<string, unknown>): Record<string, NodeStatus>
isLevelUnlocked(levelId: number, path: PathNode[], completed): boolean
learnedItemIds(path: PathNode[], completed): string[]
PASS_THRESHOLD: Record<QuizKind, number>  // practice 0
isPassing(score: number, kind: QuizKind): boolean; scoreToStars(score, kind): 0|1|2|3
quizXp(correct: number, passed: boolean, kind: QuizKind): number; LESSON_XP = 10
interface Streak { count: number; lastDate: string | null }
toDateKey(d: Date): string /* local YYYY-MM-DD */; registerActivity(s: Streak, today: string): Streak; currentStreak(s: Streak, today: string): number
type Question =
  | { id: string; type: 'choice-en-es' | 'choice-es-en' | 'listen'; itemId: string; options: string[]; answer: string }
  | { id: string; type: 'type'; itemId: string }
  | { id: string; type: 'build'; itemId: string; tiles: string[] }
  | { id: string; type: 'match'; itemIds: string[] }
interface QuizOptions { rng: () => number; audio: boolean; pool: Item[]; mistakes?: Record<string, number> }
generateQuiz(kind: QuizKind, items: Item[], opts: QuizOptions): Question[]
questionItemIds(q: Question): string[]
```

- [ ] Path tests: 23 nodes; kinds sequence exactly per Global Constraints; R20 at index 8 has items 1–20, index 17 has 21–40; E50 has 50; Q5 items = previous lesson's items; titles `Quiz rápido`, `Repaso`, `Examen del nivel`.
- [ ] Status tests: only `1:0` available initially; completing `1:0` makes `1:1` available; level 2 locked until `1:22` completed.
- [ ] Scoring tests: thresholds; stars at 0.69/0.7/0.9/1.0 for quiz5; xp `quizXp(8,true,'quiz5') === 21`, `quizXp(20,true,'exam50') === 95`.
- [ ] Streak tests: same day unchanged; yesterday +1; gap resets to 1; `currentStreak` is 0 after a gap.
- [ ] Quiz tests (seeded): counts 8/15/25; practice with n items → n singles + match if n ≥ 4; every quiz5 item appears; choice options length 4, unique, include answer; no `listen` with `audio:false`; `build` only for phrases with ≥3 tokens, tiles ⊇ tokens with exactly 2 extra; `type` only when `en.length ≤ 24`; match items have unique en/es; review20 prioritises items with mistakes.
- [ ] Type weights: base each candidate 1; exam50 gives `type`/`build` weight 2.
- [ ] PASS. Commit.

### Task 5: Progress store

**Files:** `src/store/progress.ts`, `src/store/progress.test.ts`.

**Produces:**
```ts
interface NodeResult { bestScore: number; stars: number; attempts: number; completedAt: string }
interface Settings { theme: 'system'|'light'|'dark'; sfx: boolean; voiceURI: string | null; rate: number; dailyGoal: number; autoplay: boolean }
interface QuizRecord { nodeId: string | null; kind: QuizKind; correct: number; total: number; wrongItemIds: string[]; rightItemIds: string[] }
interface QuizOutcome { score: number; passed: boolean; stars: number; xp: number; isNewBest: boolean }
useProgress: zustand store with { version: 1; completed: Record<string, NodeResult>; xp: number; streak: Streak; daily: { date: string; xp: number }; mistakes: Record<string, number>; settings: Settings;
  completeLesson(nodeId: string, today?: string): number; recordQuiz(r: QuizRecord, today?: string): QuizOutcome; updateSettings(p: Partial<Settings>): void; reset(): void }
safeStorage(getStorage: () => Storage): StateStorage
```
Defaults: settings `{ theme:'system', sfx:true, voiceURI:null, rate:0.95, dailyGoal:20, autoplay:true }`.

- [ ] Tests: completeLesson adds result & 10 XP & streak; recordQuiz pass stores best score, failing does not create `completed` entry but counts mistakes; better retry increments attempts, keeps best; wrong items +1 mistakes, right items −1 (deleted at 0); daily XP resets on new date; `safeStorage` with throwing storage returns null / swallows.
- [ ] PASS. Commit.

### Task 6: Platform libs

**Files:** `src/lib/speech.ts`, `src/lib/sfx.ts`, `src/lib/router.ts`, `src/lib/cn.ts`, `src/lib/router.test.ts`.

**Produces:** `isSpeechSupported(): boolean`; `speak(text: string, opts?: { rate?: number; voiceURI?: string | null }): void`; `useEnglishVoices(): SpeechSynthesisVoice[]`; `playSfx(name: 'correct'|'wrong'|'complete'|'tap'): void` (WebAudio, no-op without AudioContext); `type Route = { name:'home' } | { name:'play'; nodeId: string } | { name:'practice' } | { name:'vocab' } | { name:'profile' }`; `parseRoute(hash: string): Route`; `navigate(path: string): void`; `useRoute(): Route`; `cn(...classes): string`.

- [ ] Tests: `parseRoute('#/play/1:7')`, unknown → home; `isSpeechSupported()` false in jsdom.
- [ ] PASS. Commit.

### Task 7: App shell, theme, shared components, path screen

**Files:** `src/features/layout/AppShell.tsx`, `src/features/layout/useTheme.ts`, `src/components/{Button,ProgressBar,ProgressRing,Stars,AudioButton,ConfirmDialog}.tsx`, `src/features/path/{PathScreen,LevelSection,PathNodeButton,StatsBar}.tsx`, `src/features/path/PathScreen.test.tsx`.

- [ ] Bottom nav (mobile) / sidebar (≥ md): Aprender, Vocabulario, Perfil.
- [ ] Path: zigzag offsets `[0, 1, 0, -1]` × 56px; node sizes lesson 64, quiz5 52, review20 72, exam50 84; available node pulses and shows "¡Empieza!"; locked levels collapsed with "Aprueba el examen del Nivel N"; scroll current node into view.
- [ ] Test: fresh store → first node button enabled with label containing "Lección 1", second disabled.
- [ ] PASS. Commit.

### Task 8: Lesson player

**Files:** `src/features/lesson/{LessonPlayer,ItemCard,LessonSummary}.tsx`, `LessonPlayer.test.tsx`.

- [ ] One card per item with motion slide; "Siguiente" / → key; autoplay audio if enabled; summary lists 5 items; finishing calls `completeLesson` and shows "Empezar quiz" navigating to next node.
- [ ] Test: step through 5 cards + finish → `completed['1:0']` exists and `1:1` is available.
- [ ] PASS. Commit.

### Task 9: Quiz player + results

**Files:** `src/features/quiz/{QuizPlayer,FeedbackSheet,ChoiceQuestion,TypeQuestion,BuildQuestion,MatchQuestion,ResultsScreen}.tsx`, `src/features/play/{PlayRoute,PracticeRoute}.tsx`, `QuizPlayer.test.tsx`.

- [ ] Question generated once per attempt with `createRng(Date.now())`; check → feedback sheet → continue; keys 1–4 and Enter; results show %, stars, XP, pass/fail, review list; Continue → next node or home; Retry regenerates.
- [ ] Confetti + `complete` sfx on pass (skipped when `prefers-reduced-motion`).
- [ ] Tests: answering all choice questions correctly in a seeded quiz reaches results with "¡Aprobado!"; closing mid-quiz with confirm leaves store unchanged.
- [ ] PASS. Commit.

### Task 10: Vocabulary + profile

**Files:** `src/features/vocab/VocabScreen.tsx`, `src/features/profile/ProfileScreen.tsx`, tests.

- [ ] Vocab: learned items, search (normalized, en/es), level + kind filters, audio, "Para repasar" badge, "Practicar errores" → `#/practice` (disabled when no mistakes).
- [ ] Profile: stats (XP, streak, words learned, stars), theme, sfx, autoplay, voice, rate, daily goal, reset with ConfirmDialog.
- [ ] Tests: search filters; reset clears progress.
- [ ] PASS. Commit.

### Task 11: Delivery

**Files:** `README.md`, `.github/workflows/ci.yml`.

- [ ] README in Spanish: features, structure, scripts. CI: node 22, `npm ci`, lint, test, build.
- [ ] `npm run build:single` → single `dist-single/index.html`; publish as an Artifact for immediate play.
- [ ] Final whole-branch review, push to `claude/english-course-interactive-clone-589gb4`.

## Appendix A — Lesson topics

1. **Primeros pasos** (A1, 👋, emerald): Saludos, Cortesía, Presentarse, Números, Colores, La familia, Personas y pronombres, Objetos cotidianos, Preguntas básicas, Comunicación básica.
2. **Mi día a día** (A1, ☀️, sky): Rutina de la mañana, En casa, Comida, Bebidas, Días y meses, La hora, El clima, Ropa, Emociones, Tiempo libre.
3. **En la ciudad** (A2, 🏙️, violet): Lugares, Direcciones, Transporte, De compras, En el supermercado, En el restaurante, En el banco, En la farmacia, Correo y trámites, Vecinos y comunidad.
4. **De viaje** (A2, ✈️, amber): En el aeropuerto, En el avión, Migración y aduana, En el hotel, Reservas, Turismo, Alquilar un auto, Emergencias, En la playa, Problemas de viaje.
5. **Trabajo y estudios** (B1, 💼, rose): Profesiones, En la oficina, Reuniones, Correos electrónicos, Llamadas, Entrevista de trabajo, En clase, Tecnología, Proyectos y plazos, Opiniones en el trabajo.
6. **Conversación fluida** (B1–B2, 🗣️, indigo): Conectores, Phrasal verbs I, Phrasal verbs II, Dar opiniones, Acuerdo y desacuerdo, Sentimientos, Modismos, Charla casual, Consejos, Ganar tiempo al hablar.
