import { SiteHeader } from '../components/SiteHeader'
import { HeroSection } from '../sections/HeroSection'
import { OverviewSection } from '../sections/OverviewSection'
import { ProductExperienceSection } from '../sections/ProductExperienceSection'
import { PrototypeSection } from '../sections/PrototypeSection'
import { ReflectionSection } from '../sections/ReflectionSection'
import { ResearchSection } from '../sections/ResearchSection'
import { RobotSection } from '../sections/RobotSection'
import { SystemLoopSection } from '../sections/SystemLoopSection'
import { 可穿戴设备Section } from '../sections/可穿戴设备Section'
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
        <可穿戴设备Section />
        <RobotSection />
        <ProductExperienceSection />
        <PrototypeSection />
        <ReflectionSection />
      </main>
    </>
  )
}
