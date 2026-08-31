import { Link } from 'react-router-dom'
import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function ProductExperienceSection() {
  const { productExperience, media } = projectContent

  return (
    <section className="section product-experience" id="product">
      <div className="site-shell">
        <div className="product-pivot">
          <p className="eyebrow">{productExperience.eyebrow}</p>
          <h2>{productExperience.title}</h2>
          <p>{productExperience.text}</p>
        </div>
        <figure className="source-figure product-experience__media">
          <img src={assetUrl(media.ui.src)} alt={media.ui.alt} loading="lazy" decoding="async" />
          <figcaption>Existing PetLoop Console and multi-device visual direction.</figcaption>
        </figure>
        <div className="product-experience__footer">
          <p>从状态总览到行为证据，再到远程回应，交互演示把这套闭环转成可操作的产品体验。</p>
          <Link className="button button--primary" to="/demo">Launch Interactive Demo ↗</Link>
        </div>
      </div>
    </section>
  )
}
