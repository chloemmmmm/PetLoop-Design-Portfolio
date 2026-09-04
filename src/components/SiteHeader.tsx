import { Link } from 'react-router-dom'

const items = [
  ['概览', 'overview'],
  ['研究', 'research'],
  ['系统', 'system'],
  ['产品', 'product'],
  ['Prototype', 'prototype'],
] as const

export function SiteHeader({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const go = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return
    event.preventDefault()
    onNavigate(id)
  }
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <a className="wordmark" href="#top">PETLOOP</a>
        <nav className="primary-nav" aria-label="Primary navigation">
          {items.map(([label, id]) => <a key={id} href={`#${id}`} onClick={go(id)}>{label}</a>)}
          <Link className="demo-cta" to="/demo">打开演示 ↗</Link>
        </nav>
      </div>
    </header>
  )
}
