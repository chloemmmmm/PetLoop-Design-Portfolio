import { SectionHeading } from '../components/SectionHeading'
import { projectContent } from '../data/project'

export function ResearchSection() {
  return (
    <section className="section research" id="research">
      <div className="site-shell">
        <div className="research__intro editorial-grid">
          <div className="research__heading"><SectionHeading eyebrow="04 / 用户研究" title="从信号到上下文" subtitle="项目从行为、声音与运动等线索出发，探索如何把难以直接理解的宠物表达转为具有上下文的信息。" /></div>
          <div className="method-tags" aria-label="Research methods"><span>Behavior</span><span>Sound</span><span>Motion</span><span>MFCC</span></div>
        </div>
        <div className="insight-list">
          {projectContent.insights.map((insight) => (
            <article className="insight" key={insight.index}>
              <span>{insight.index}</span><h3>{insight.title}</h3><p>{insight.text}</p>
            </article>
          ))}
        </div>
        <article className="persona-card">
          <div><p className="eyebrow">{projectContent.persona.label}</p><h3>{projectContent.persona.name}</h3></div>
          <p>{projectContent.persona.text}</p>
        </article>
      </div>
    </section>
  )
}
