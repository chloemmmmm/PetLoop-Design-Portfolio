export type TimeRange = 'today' | '7d' | '30d'
export type DemoView = 'overview' | 'pet' | 'emotion' | 'robot'
export type RobotMode = 'companion' | 'comfort' | 'call' | 'play'
export type RobotPhase = 'idle' | 'selected' | 'connecting' | 'active' | 'complete'

export type TimelineKind = 'behavior' | 'emotion' | 'robot'
export type TimelineStatus = 'observed' | 'interpreted' | 'complete'

export interface TimelineEvent {
  id: string
  time: string
  kind: TimelineKind
  title: string
  detail: string
  status: TimelineStatus
  mode?: RobotMode
}

export interface DemoState {
  view: DemoView
  range: TimeRange
  selectedMetric: string | null
  selectedEventId: string | null
  selectedRobotMode: RobotMode | null
  robotPhase: RobotPhase
  timeline: TimelineEvent[]
}

export type DemoAction =
  | { type: 'setView'; view: DemoView }
  | { type: 'setRange'; range: TimeRange }
  | { type: 'selectMetric'; metric: string | null }
  | { type: 'selectEvent'; eventId: string | null }
  | { type: 'selectRobotMode'; mode: RobotMode }
  | { type: 'advanceRobotPhase' }
  | { type: 'completeInteraction' }
  | { type: 'resetRobot' }
