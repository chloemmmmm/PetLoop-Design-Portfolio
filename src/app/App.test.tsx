import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppRoutes } from './routes'

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true } as const

it('renders the case study route', () => {
  render(
    <MemoryRouter initialEntries={['/']} future={routerFuture}>
      <AppRoutes />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { level: 1, name: /human–pet emotional loop/i })).toBeInTheDocument()
})

it('renders the demo route', () => {
  render(
    <MemoryRouter initialEntries={['/demo']} future={routerFuture}>
      <AppRoutes />
    </MemoryRouter>,
  )
  expect(screen.getByText(/simulated data/i)).toBeInTheDocument()
})
