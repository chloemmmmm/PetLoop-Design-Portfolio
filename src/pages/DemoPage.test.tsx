import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppRoutes } from '../app/routes'

function renderDemo() {
  return render(
    <MemoryRouter initialEntries={['/demo']}>
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
