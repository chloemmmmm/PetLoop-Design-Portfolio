import { Route, Routes } from 'react-router-dom'
import { CaseStudyPage } from '../pages/CaseStudyPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CaseStudyPage />} />
      <Route path="/demo" element={<main><p>Simulated Data · Concept Demo</p></main>} />
    </Routes>
  )
}
