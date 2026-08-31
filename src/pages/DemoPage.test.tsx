import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import { AppRoutes } from '../app/routes'

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true } as const

function renderDemo() {
  return render(
    <MemoryRouter initialEntries={['/demo']} future={routerFuture}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

it('renders the PetLoop console with transparent simulated data', () => {
  renderDemo()
  expect(screen.getByRole('heading', { name: /petloop console/i })).toBeInTheDocument()
  expect(screen.getByText('Mochi')).toBeInTheDocument()
  expect(screen.getByText(/concept demo · simulated data/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /today/i })).toHaveAttribute('aria-pressed', 'true')
})

it('changes the dashboard time range through the shared demo state', () => {
  renderDemo()
  const sevenDays = screen.getByRole('button', { name: /7 days/i })
  fireEvent.click(sevenDays)
  expect(sevenDays).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText(/showing 7-day simulated view/i)).toBeInTheDocument()
})

it('opens metric evidence from the dashboard cards', () => {
  renderDemo()
  fireEvent.click(screen.getByRole('button', { name: /activity metric/i }))
  expect(screen.getByRole('heading', { name: /activity evidence/i })).toBeInTheDocument()
  expect(screen.getByText(/movement pattern \/ simulated/i)).toBeInTheDocument()
})

it('opens event evidence from the timeline', () => {
  renderDemo()
  fireEvent.click(screen.getByRole('button', { name: /resting pattern detected/i }))
  expect(screen.getByRole('heading', { name: /event evidence/i })).toBeInTheDocument()
  expect(screen.getByText(/low movement intensity with stable posture cues/i)).toBeInTheDocument()
})

it('runs Comfort through the robot states and records the interaction', () => {
  vi.useFakeTimers()
  renderDemo()

  fireEvent.click(screen.getByRole('button', { name: /^robot$/i }))
  fireEvent.click(screen.getByRole('button', { name: /^comfort$/i }))
  fireEvent.click(screen.getByRole('button', { name: /send comfort/i }))

  expect(screen.getByText(/connecting/i)).toBeInTheDocument()

  act(() => {
    vi.advanceTimersByTime(700)
  })
  expect(screen.getByText(/comfort mode activated/i)).toBeInTheDocument()

  act(() => {
    vi.advanceTimersByTime(900)
  })
  expect(screen.getByText(/interaction recorded/i)).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /^overview$/i }))
  expect(screen.getByRole('button', { name: /comfort interaction/i })).toBeInTheDocument()
  vi.useRealTimers()
})
