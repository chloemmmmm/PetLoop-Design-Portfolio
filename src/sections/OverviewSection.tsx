import { SectionHeading } from '../components/SectionHeading'
import { projectContent } from '../data/project'

export function OverviewSection() {
  return (
    <section className="section overview" id="overview">
      <div className="site-shell editorial-grid">
        <div className="overview__heading">
          <SectionHeading eyebrow="02 / OVERVIEW" title="A connected loop, not a single object." subtitle="PetLoop 把宠物可穿戴设备、状态理解、主人侧界面与桌面机器人组织成一套连续体验。" />
        </div>
        <p className="overview__summary">{projectContent.identity.summary}</p>
        <div className="project-facts" aria-label="Project focus">
          <div><span>物理层</span><strong>可穿戴设备 Device</strong></div>
          <div><span>数字层</span><strong>PetLoop 控制台</strong></div>
          <div><span>交互层</span><strong>桌面机器人</strong></div>
        </div>
      </div>
    </section>
  )
}
