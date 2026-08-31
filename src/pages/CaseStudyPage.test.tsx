import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { CaseStudyPage } from './CaseStudyPage'

function renderPage() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CaseStudyPage />
    </MemoryRouter>,
  )
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
  expect(screen.getByText('MFCC', { selector: 'span' })).toBeInTheDocument()
  expect(screen.queryByText(/97%|100\+ users|clinical/i)).not.toBeInTheDocument()
})

it('shows the complete PetLoop feedback loop and demo entry', () => {
  renderPage()
  const loop = screen.getByRole('list', { name: /petloop feedback loop/i })
  expect(within(loop).getAllByText('Pet')).toHaveLength(2)
  for (const label of ['Wearable', 'PetLoop Console', 'Owner', 'Desktop Robot']) {
    expect(within(loop).getByText(label)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /launch interactive demo/i })).toHaveAttribute('href', expect.stringContaining('/demo'))
})

it('prioritizes the hero image and lazy-loads later case-study evidence', () => {
  renderPage()
  const images = screen.getAllByRole('img')
  expect(images[0]).toHaveAttribute('loading', 'eager')
  expect(images[0]).toHaveAttribute('decoding', 'async')
  for (const image of images.slice(1)) {
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  }
})
