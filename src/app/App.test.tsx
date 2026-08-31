import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppRoutes } from './routes'

it('renders the case study route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { level: 1, name: /human–pet emotional loop/i })).toBeInTheDocument()
})

it('renders the demo route', () => {
  render(
    <MemoryRouter initialEntries={['/demo']}>
      <AppRoutes />
    </MemoryRouter>,
  )
  expect(screen.getByText(/simulated data/i)).toBeInTheDocument()
})
