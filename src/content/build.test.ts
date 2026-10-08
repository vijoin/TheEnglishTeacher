import { buildCourse } from './build'
import { makeLevelInput } from '../test/fixtures'

test('buildCourse derives stable ids and flattens items', () => {
  const [level] = buildCourse([makeLevelInput(1)])
  expect(level.lessons).toHaveLength(10)
  expect(level.items).toHaveLength(50)
  expect(level.lessons[2].items[1].id).toBe('1-03-2')
  expect(level.lessons[2].items[1].lessonIndex).toBe(2)
  expect(level.lessons[2].items[1].levelId).toBe(1)
  expect(level.items[49].id).toBe('1-10-5')
})
