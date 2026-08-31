import { Route, Routes } from 'react-router-dom'
import { CaseStudyPage } from '../pages/CaseStudyPage'
import { DemoPage } from '../pages/DemoPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CaseStudyPage />} />
      <Route path="/demo" element={<DemoPage />} />
    </Routes>
  )
}
