import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function RobotSection() {
  const { robot, media } = projectContent

  return (
    <section className="section product-story product-story--robot">
      <div className="site-shell product-story__grid product-story__grid--reverse">
        <figure className="source-figure product-story__media">
          <img src={assetUrl(media.robot.src)} alt={media.robot.alt} loading="lazy" decoding="async" />
          <figcaption>Mechanical build and interaction evolution documented in the original course project.</figcaption>
        </figure>
        <div className="product-story__copy">
          <p className="eyebrow">{robot.eyebrow}</p>
          <h2>{robot.title}</h2>
          <p>{robot.text}</p>
          <div className="decision-note">
            <span>INTERACTION EVOLUTION</span>
            <strong>Mechanical structure → voice + screen terminal</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
