import { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { demoDisclaimer, demoPet } from '../data/demo'
import { demoReducer, initialDemoState } from '../demo/demoState'
import type { TimeRange } from '../demo/types'
import '../styles/demo.css'

const ranges: Array<{ id: TimeRange; label: string; ariaLabel: string }> = [
  { id: 'today', label: 'Today', ariaLabel: 'Today' },
  { id: '7d', label: '7D', ariaLabel: '7 days' },
  { id: '30d', label: '30D', ariaLabel: '30 days' },
]

const rangeMessage: Record<TimeRange, string> = {
  today: "Showing today's simulated view",
  '7d': 'Showing 7-day simulated view',
  '30d': 'Showing 30-day simulated view',
}

export function DemoPage() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState)

  return (
    <main className="demo-page">
      <header className="demo-topbar">
        <Link className="demo-wordmark" to="/">PETLOOP</Link>
        <p className="demo-disclaimer">{demoDisclaimer}</p>
        <Link className="demo-back" to="/">← Case Study</Link>
      </header>

      <div className="demo-shell">
        <section className="demo-intro" aria-labelledby="demo-title">
          <div>
            <p className="demo-kicker">CONNECTED PET EXPERIENCE / CONCEPT PROTOTYPE</p>
            <h1 id="demo-title">PetLoop Console</h1>
            <p className="demo-intro__text">A clickable concept interface for moving from pet signals to human understanding and response.</p>
          </div>
          <div className="range-control" aria-label="Dashboard time range">
            {ranges.map((range) => (
              <button
                key={range.id}
                type="button"
                aria-label={range.ariaLabel}
                aria-pressed={state.range === range.id}
                onClick={() => dispatch({ type: 'setRange', range: range.id })}
              >
                {range.label}
              </button>
            ))}
          </div>
        </section>

        <p className="range-status" aria-live="polite">{rangeMessage[state.range]}</p>

        <section className="pet-status-card" aria-labelledby="pet-name">
          <div className="pet-status-card__identity">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <p>ACTIVE PET</p>
              <h2 id="pet-name">{demoPet.name}</h2>
              <span>{demoPet.species}</span>
            </div>
          </div>
          <dl className="pet-status-card__stats">
            <div><dt>Current cue</dt><dd>{demoPet.status}</dd></div>
            <div><dt>Wearable</dt><dd>{demoPet.wearable}</dd></div>
            <div><dt>Battery</dt><dd>{demoPet.battery}%</dd></div>
          </dl>
        </section>
      </div>
    </main>
  )
}
