export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return <header className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{subtitle ? <p>{subtitle}</p> : null}</header>
}
