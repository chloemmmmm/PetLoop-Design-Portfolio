import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { CaseStudyPage } from './CaseStudyPage'

it('exposes semantic case-study navigation and demo CTA', () => {
  render(<MemoryRouter><CaseStudyPage /></MemoryRouter>)
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /open demo/i })).toHaveAttribute('href', expect.stringContaining('/demo'))
})
