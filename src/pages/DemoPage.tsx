import { useEffect, useReducer, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { demoDisclaimer, demoMetrics, demoPet } from '../data/demo'
import { demoReducer, initialDemoState } from '../demo/demoState'
import { RobotView } from '../demo/RobotView'
import { PetMonitor } from '../demo/PetMonitor'
import type { DemoView, RobotMode, TimeRange } from '../demo/types'
import '../styles/demo.css'
import '../styles/demo-evidence.css'
import '../styles/demo-robot.css'


const catAvatars: Record<string, string> = {
  companion: 'https://aka.doubaocdn.com/s/oNFlKMalBU',
  comfort: 'https://aka.doubaocdn.com/s/cImBw4eady',
  call: 'https://aka.doubaocdn.com/s/qt8gfXKBxw',
  play: 'https://aka.doubaocdn.com/s/aA4BEJSlZ3',
}

const ranges: Array<{ id: TimeRange; label: string; ariaLabel: string }> = [
  { id: 'today', label: '今天', ariaLabel: '今天' },
  { id: '7d', label: '7天', ariaLabel: '7 days' },
  { id: '30d', label: '30天', ariaLabel: '30 days' },
]

const views: Array<{ id: DemoView; label: string }> = [
  { id: 'overview', label: '概览' },
  { id: 'robot', label: '机器人' },
]

const rangeMessage: Record<TimeRange, string> = {
  today: "Showing today's simulated view",
  '7d': 'Showing 7-day simulated view',
  '30d': 'Showing 30-day simulated view',
}

export function DemoPage() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState)
  const [lastRobotAction, setLastRobotAction] = useState<RobotMode | null>(null)
  const timersRef = useRef<number[]>([])
  const selectedMetric = demoMetrics.find((metric) => metric.id === state.selectedMetric) ?? null
  const selectedEvent = state.timeline.find((event) => event.id === state.selectedEventId) ?? null

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const selectRobotMode = (mode: RobotMode) => {
    dispatch({ type: 'selectRobotMode', mode })
  }

  const sendRobotInteraction = () => {
    if (!state.selectedRobotMode || state.robotPhase !== 'selected') return
    setLastRobotAction(state.selectedRobotMode)
    dispatch({ type: 'advanceRobotPhase' })

    const activeTimer = window.setTimeout(() => {
      dispatch({ type: 'advanceRobotPhase' })
    }, 700)
    const completeTimer = window.setTimeout(() => {
      dispatch({ type: 'completeInteraction' })
    }, 1600)

    timersRef.current.push(activeTimer, completeTimer)
  }

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
            <p className="demo-kicker">互联宠物体验 / 概念原型</p>
            <h1 id="demo-title">PetLoop 控制台</h1>
            <p className="demo-intro__text">一个可点击的概念界面，用于从宠物信号到人类理解和回应。</p>
          </div>
          {state.view === 'overview' && (
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
          )}
        </section>

        <nav className="demo-view-nav" aria-label="Demo views">
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              aria-pressed={state.view === view.id}
              onClick={() => dispatch({ type: 'setView', view: view.id })}
            >
              {view.label}
            </button>
          ))}
        </nav>

        {state.view === 'overview' ? (
          <>
            <p className="range-status" aria-live="polite">{rangeMessage[state.range]}</p>

            <section className="pet-status-card" aria-labelledby="pet-name">
              <div className="pet-status-card__identity">
                <span className="status-dot" aria-hidden="true" />
                <div>
                  <p>当前宠物</p>
                  <h2 id="pet-name">{demoPet.name}</h2>
                  <span>{demoPet.species}</span>
                </div>
              </div>
              <dl className="pet-status-card__stats">
                <div><dt>当前状态</dt><dd>{demoPet.status}</dd></div>
                <div><dt>可穿戴设备</dt><dd>{demoPet.wearable}</dd></div>
                <div><dt>电量</dt><dd>{demoPet.battery}%</dd></div>
              </dl>
            </section>

            <PetMonitor lastRobotAction={lastRobotAction} />

            <div className="demo-evidence-grid">
              <section className="metric-panel" aria-labelledby="metric-heading">
                <div className="panel-heading">
                  <div><p>01 / SIGNAL SUMMARY</p><h2 id="metric-heading">What PetLoop is noticing</h2></div>
                  <span>点击指标查看证据</span>
                </div>
                <div className="metric-grid">
                  {demoMetrics.map((metric) => (
                    <button
                      key={metric.id}
                      type="button"
                      className="metric-card"
                      aria-label={`${metric.label} metric`}
                      aria-pressed={state.selectedMetric === metric.id}
                      onClick={() => dispatch({ type: 'selectMetric', metric: metric.id })}
                    >
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <em>View evidence ↗</em>
                    </button>
                  ))}
                </div>
                {selectedMetric && (
                  <aside className="evidence-detail" aria-live="polite">
                    <p>指标证据 / 模拟数据</p>
                    <h3>{selectedMetric.label} evidence</h3>
                    <strong>{selectedMetric.value}</strong>
                    <span>{selectedMetric.note}</span>
                  </aside>
                )}
              </section>

              <section className="timeline-panel" aria-labelledby="timeline-heading">
                <div className="panel-heading">
                  <div><p>02 / EVENT TIMELINE</p><h2 id="timeline-heading">From signal to interpretation</h2></div>
                  <span>证据可随时查看</span>
                </div>
                <ol className="event-timeline">
                  {state.timeline.map((event) => (
                    <li key={event.id}>
                      <button
                        type="button"
                        aria-label={event.title}
                        aria-pressed={state.selectedEventId === event.id}
                        onClick={() => dispatch({ type: 'selectEvent', eventId: event.id })}
                      >
                        <time>{event.time}</time>
                        <span>{event.kind === 'behavior' ? '行为' : event.kind === 'emotion' ? '情绪' : event.kind === 'robot' ? '机器人' : event.kind}</span>
                        <strong>{event.title}</strong>
                        <em>{event.status === 'observed' ? '已观察' : event.status === 'interpreted' ? '已解释' : event.status === 'complete' ? '已完成' : event.status}</em>
                      </button>
                    </li>
                  ))}
                </ol>
                {selectedEvent && (
                  <aside className="evidence-detail evidence-detail--event" aria-live="polite">
                    <p>事件证据 / 模拟数据</p>
                    <h3>事件证据</h3>
                    <strong>{selectedEvent.title}</strong>
                    <span>{selectedEvent.detail}</span>
                  </aside>
                )}
              </section>
            </div>
          </>
        ) : (
          <>
            <PetMonitor lastRobotAction={lastRobotAction} />
            <RobotView
            mode={state.selectedRobotMode}
            phase={state.robotPhase}
            onSelectMode={selectRobotMode}
            onSend={sendRobotInteraction}
            onReset={() => dispatch({ type: 'resetRobot' })}
            />
          </>
        )}
      </div>
    </main>
  )
}
