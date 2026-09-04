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
  const label = robotModes.find((item) => item.id === mode)?.label ?? '回应'
  switch (phase) {
    case 'idle':
      return '选择回应模式'
    case 'selected':
      return `已选择 ${label}`
    case 'connecting':
      return '连接中'
    case 'active':
      return `${label} 模式已激活`
    case 'complete':
      return '互动已记录'
  }
}

export function RobotActionPanel({ mode, phase, onSelectMode, onSend, onReset }: Props) {
  const selected = robotModes.find((item) => item.id === mode) ?? null
  const canSend = Boolean(mode) && phase === 'selected'

  return (
    <section className="robot-action-panel" aria-labelledby="robot-action-title">
      <div className="robot-action-panel__heading">
        <div>
          <p>回应模式</p>
          <h2 id="robot-action-title">选择PetLoop如何回应</h2>
        </div>
        <span>Concept interaction · simulated response</span>
      </div>

      <div className="robot-mode-grid">
        {robotModes.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            aria-pressed={mode === item.id}
            onClick={() => onSelectMode(item.id)}
            disabled={phase === 'connecting' || phase === 'active'}
          >
            <span>{item.label}</span>
            <small>{item.description}</small>
            <em>{mode === item.id ? '已选择 ✓' : '选择模式'}</em>
          </button>
        ))}
      </div>

      <div className="robot-status-card">
        <div>
          <p>机器人状态</p>
          <strong aria-live="polite">{phaseCopy(mode, phase)}</strong>
          {selected && <span>{selected.description}</span>}
        </div>
        <div className="robot-status-card__actions">
          <button type="button" className="robot-send" onClick={onSend} disabled={!canSend}>
            {selected ? `Send ${selected.label}` : '请先选择一个模式'}
          </button>
          {(phase === 'complete' || phase === 'selected') && (
            <button type="button" className="robot-reset" onClick={onReset}>Reset</button>
          )}
        </div>
      </div>
    </section>
  )
}
