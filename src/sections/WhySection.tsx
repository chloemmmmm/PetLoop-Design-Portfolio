import { SectionHeading } from '../components/SectionHeading'
import { projectContent } from '../data/project'

export function WhySection() {
  return (
    <section className="section why">
      <div className="site-shell">
        <SectionHeading eyebrow="03 / WHY PETLOOP" title="Pets communicate constantly. Understanding them is harder." subtitle="原项目将机会点聚焦在持续察觉、理解与远程回应三个连续问题。" />
        <div className="problem-grid">
          {projectContent.problems.map((problem, index) => (
            <article className="problem-card" key={problem.zh}>
              <span className="problem-card__index">0{index + 1}</span>
              <p className="eyebrow">{problem.en}</p>
              <h3>{problem.zh}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
