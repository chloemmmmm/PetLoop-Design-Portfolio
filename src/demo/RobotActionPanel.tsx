import { robotModes } from '../data/demo'
import type { RobotMode, RobotPhase } from './types'

type Props = {
  mode: RobotMode | null
  phase: RobotPhase
  onSelectMode: (mode: RobotMode) => void
  onSend: () => void
  onReset: () => void
}

const phaseCopy = (mode: RobotMode | null, phase: RobotPhase) => {
  const label = robotModes.find((item) => item.id === mode)?.label ?? 'Response'
  switch (phase) {
    case 'idle':
      return 'Select a response mode'
    case 'selected':
      return `${label} selected`
    case 'connecting':
      return 'Connecting'
    case 'active':
      return `${label} mode activated`
    case 'complete':
      return 'Interaction recorded'
  }
}

export function RobotActionPanel({ mode, phase, onSelectMode, onSend, onReset }: Props) {
  const selected = robotModes.find((item) => item.id === mode) ?? null
  const canSend = Boolean(mode) && phase === 'selected'

  return (
    <section className="robot-action-panel" aria-labelledby="robot-action-title">
      <div className="robot-action-panel__heading">
        <div>
          <p>RESPONSE MODES</p>
          <h2 id="robot-action-title">Choose how PetLoop responds</h2>
        </div>
        <span>Concept interaction · simulated response</span>
      </div>

      <div className="robot-mode-grid">
        {robotModes.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            onClick={() => onSelectMode(item.id)}
            disabled={phase === 'connecting' || phase === 'active'}
          >
            <span>{item.label}</span>
            <small>{item.description}</small>
            <em>{mode === item.id ? 'Selected ✓' : 'Select mode'}</em>
          </button>
        ))}
      </div>

      <div className="robot-status-card">
        <div>
          <p>ROBOT STATUS</p>
          <strong aria-live="polite">{phaseCopy(mode, phase)}</strong>
          {selected && <span>{selected.description}</span>}
        </div>
        <div className="robot-status-card__actions">
          <button type="button" className="robot-send" onClick={onSend} disabled={!canSend}>
            {selected ? `Send ${selected.label}` : 'Select a mode first'}
          </button>
          {(phase === 'complete' || phase === 'selected') && (
            <button type="button" className="robot-reset" onClick={onReset}>Reset</button>
          )}
        </div>
      </div>
    </section>
  )
}
