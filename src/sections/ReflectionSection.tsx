import { Link } from 'react-router-dom'
import { projectContent } from '../data/project'

export function ReflectionSection() {
  const { reflection } = projectContent

  return (
    <section className="section reflection">
      <div className="site-shell reflection__grid">
        <p className="eyebrow">09 / 反思总结</p>
        <div>
          <h2>{reflection.title}</h2>
          <p>{reflection.text}</p>
        </div>
        <div className="reflection__cta">
          <span>案例研究结束</span>
          <Link className="button button--ghost" to="/demo">Experience the concept demo ↗</Link>
        </div>
      </div>
    </section>
  )
}
