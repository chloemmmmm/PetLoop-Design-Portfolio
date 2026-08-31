import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { CaseStudyPage } from './CaseStudyPage'

function renderPage() {
  return render(<MemoryRouter><CaseStudyPage /></MemoryRouter>)
}

it('exposes semantic case-study navigation and demo CTA', () => {
  renderPage()
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /open demo/i })).toHaveAttribute('href', expect.stringContaining('/demo'))
})

it('introduces PetLoop with the approved bilingual hero and project CTA', () => {
  renderPage()
  expect(screen.getByRole('heading', { level: 1, name: /human–pet emotional loop/i })).toBeInTheDocument()
  expect(screen.getByText('人宠情感闭环系统')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /explore project/i })).toHaveAttribute('href', '#overview')
  expect(screen.getByRole('link', { name: /open interactive demo/i })).toHaveAttribute('href', expect.stringContaining('/demo'))
})

it('frames the design opportunity through the three source-supported problems', () => {
  renderPage()
  expect(screen.getByText('看不见')).toBeInTheDocument()
  expect(screen.getByText('读不懂')).toBeInTheDocument()
  expect(screen.getByText('无法回应')).toBeInTheDocument()
})

it('surfaces research insights and the Luna persona without invented validation claims', () => {
  renderPage()
  expect(document.querySelector('#research')).toBeInTheDocument()
  expect(screen.getByText('Luna')).toBeInTheDocument()
  expect(screen.getByText(/MFCC/)).toBeInTheDocument()
  expect(screen.queryByText(/97%|100\+ users|clinical/i)).not.toBeInTheDocument()
})
