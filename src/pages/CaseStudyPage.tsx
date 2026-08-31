import { SiteHeader } from '../components/SiteHeader'
import { HeroSection } from '../sections/HeroSection'
import { OverviewSection } from '../sections/OverviewSection'
import { ProductExperienceSection } from '../sections/ProductExperienceSection'
import { PrototypeSection } from '../sections/PrototypeSection'
import { ReflectionSection } from '../sections/ReflectionSection'
import { ResearchSection } from '../sections/ResearchSection'
import { RobotSection } from '../sections/RobotSection'
import { SystemLoopSection } from '../sections/SystemLoopSection'
import { WearableSection } from '../sections/WearableSection'
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
        <SystemLoopSection />
        <WearableSection />
        <RobotSection />
        <ProductExperienceSection />
        <PrototypeSection />
        <ReflectionSection />
      </main>
    </>
  )
}
