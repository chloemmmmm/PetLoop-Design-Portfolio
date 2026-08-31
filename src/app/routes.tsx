import { Route, Routes } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<main><h1>PetLoop</h1></main>} />
      <Route path="/demo" element={<main><p>Simulated Data · Concept Demo</p></main>} />
    </Routes>
  )
}
