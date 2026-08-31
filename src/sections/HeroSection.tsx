import { Link } from 'react-router-dom'
import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function HeroSection() {
  const { identity, media } = projectContent
  return (
    <section className="hero section" id="top">
      <div className="site-shell hero__grid">
        <div className="hero__copy">
          <div className="hero__meta"><span>01 / PETLOOP</span><span>CONNECTED PET EXPERIENCE</span></div>
          <p className="hero__wordmark">PETLOOP</p>
          <h1>{identity.titleEn}</h1>
          <p className="hero__zh">{identity.titleZh}</p>
          <p className="hero__positioning">{identity.positioning}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#overview">Explore Project ↓</a>
            <Link className="button button--ghost" to="/demo">Open Interactive Demo ↗</Link>
          </div>
        </div>
        <figure className="hero__media">
          <img src={assetUrl(media.hero.src)} alt={media.hero.alt} />
          <figcaption>PetLoop / Human–Pet Emotional Loop</figcaption>
        </figure>
      </div>
    </section>
  )
}
