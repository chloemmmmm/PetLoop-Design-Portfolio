import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function SystemLoopSection() {
  const { systemLoop, dataPipeline, media } = projectContent

  return (
    <section className="section system-loop" id="system">
      <div className="site-shell">
        <div className="system-loop__intro editorial-grid">
          <div className="system-loop__heading">
            <p className="eyebrow">05 / SYSTEM LOOP</p>
            <h2>Sense. Interpret. Respond. Repeat.</h2>
          </div>
          <p className="system-loop__lede">PetLoop 不是单向监测工具，而是从宠物出发、经过可穿戴采集与数据理解，再由主人和桌面机器人完成回应的闭环。</p>
        </div>

        <ol className="loop-track" aria-label="PetLoop feedback loop">
          {systemLoop.map((label, index) => (
            <li key={`${label}-${index}`} className="loop-track__item">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>

        <div className="system-loop__evidence">
          <figure className="source-figure source-figure--system">
            <img src={assetUrl(media.system.src)} alt={media.system.alt} loading="lazy" decoding="async" />
            <figcaption>Original system mapping reorganized for the portfolio narrative.</figcaption>
          </figure>
          <div className="pipeline" aria-label="Data interpretation pipeline">
            {dataPipeline.map((item) => (
              <article key={item.step} className="pipeline__item">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
