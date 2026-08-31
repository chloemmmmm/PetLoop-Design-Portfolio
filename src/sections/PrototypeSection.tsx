import { projectContent } from '../data/project'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function PrototypeSection() {
  const { media } = projectContent

  return (
    <section className="section prototype" id="prototype">
      <div className="site-shell">
        <div className="prototype__heading editorial-grid">
          <div>
            <p className="eyebrow">08 / PROTOTYPE & MAKING</p>
            <h2>Making the loop tangible.</h2>
          </div>
          <p>实体制作让 PetLoop 从系统设想落到具体的穿戴方式、材料、传感器整合与机器人结构。这里呈现的是原项目已有的制作过程，而非额外包装出的验证结果。</p>
        </div>
        <div className="prototype__media-grid">
          <figure className="source-figure">
            <img src={assetUrl(media.wearable.src)} alt={media.wearable.alt} />
            <figcaption>Wearable / pattern, material and wearing prototype</figcaption>
          </figure>
          <figure className="source-figure">
            <img src={assetUrl(media.robot.src)} alt={media.robot.alt} />
            <figcaption>Desktop Robot / components, assembly and interaction evolution</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
