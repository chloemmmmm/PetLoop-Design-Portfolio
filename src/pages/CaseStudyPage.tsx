import { SiteHeader } from '../components/SiteHeader'
import { HeroSection } from '../sections/HeroSection'
import { OverviewSection } from '../sections/OverviewSection'
import { ResearchSection } from '../sections/ResearchSection'
import { WhySection } from '../sections/WhySection'
import '../styles/case-study.css'

export function CaseStudyPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <OverviewSection />
        <WhySection />
        <ResearchSection />
      </main>
    </>
  )
}
