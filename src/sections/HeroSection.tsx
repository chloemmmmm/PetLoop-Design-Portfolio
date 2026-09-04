import { Link } from 'react-router-dom'
import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function HeroSection() {
  const { identity, media } = projectContent
  return (
    <section className="hero section" id="top">
      <div className="site-shell hero__grid">
        <div className="hero__copy">
          <div className="hero__meta"><span>01 / PetLoop</span><span>互联宠物体验</span></div>
          <p className="hero__wordmark">PETLOOP</p>
          <h1>{identity.titleZh}</h1>
          <p className="hero__zh">{identity.titleZh}</p>
          <p className="hero__positioning">{identity.positioning}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#overview">探索项目 ↓</a>
            <Link className="button button--ghost" to="/demo">打开交互式演示 ↗</Link>
          </div>
        </div>
        <figure className="hero__media">
          <img src={assetUrl(media.hero.src)} alt={media.hero.alt} loading="eager" decoding="async" />
          <figcaption>PetLoop / 人宠情感闭环</figcaption>
        </figure>
      </div>
    </section>
  )
}
