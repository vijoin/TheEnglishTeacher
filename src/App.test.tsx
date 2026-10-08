import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the app title', () => {
  render(<App />)
  expect(screen.getAllByText(/The English Teacher/i).length).toBeGreaterThan(0)
})
