import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function WearableSection() {
  const { wearable, media } = projectContent

  return (
    <section className="section product-story product-story--wearable">
      <div className="site-shell product-story__grid">
        <div className="product-story__copy">
          <p className="eyebrow">{wearable.eyebrow}</p>
          <h2>{wearable.title}</h2>
          <p>{wearable.text}</p>
          <div className="decision-note">
            <span>DESIGN FOCUS</span>
            <strong>Wearability · sensing · everyday use</strong>
          </div>
        </div>
        <figure className="source-figure product-story__media">
          <img src={assetUrl(media.wearable.src)} alt={media.wearable.alt} loading="lazy" decoding="async" />
          <figcaption>Sketches, material tests and physical wearing prototype from the original project.</figcaption>
        </figure>
      </div>
    </section>
  )
}
