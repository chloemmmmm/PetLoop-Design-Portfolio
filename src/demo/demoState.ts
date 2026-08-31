import { demoTimeline } from '../data/demo'
import type { DemoAction, DemoState, RobotPhase, TimelineEvent } from './types'

export const initialDemoState: DemoState = {
  view: 'overview',
  range: 'today',
  selectedMetric: null,
  selectedEventId: null,
  selectedRobotMode: null,
  robotPhase: 'idle',
  timeline: demoTimeline,
}

const phaseOrder: RobotPhase[] = ['idle', 'selected', 'connecting', 'active', 'complete']

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'setView':
      return { ...state, view: action.view }
    case 'setRange':
      return { ...state, range: action.range }
    case 'selectMetric':
      return { ...state, selectedMetric: action.metric }
    case 'selectEvent':
      return { ...state, selectedEventId: action.eventId }
    case 'selectRobotMode':
      return { ...state, selectedRobotMode: action.mode, robotPhase: 'selected' }
    case 'advanceRobotPhase': {
      const currentIndex = phaseOrder.indexOf(state.robotPhase)
      const nextPhase = phaseOrder[Math.min(currentIndex + 1, phaseOrder.length - 1)]
      return { ...state, robotPhase: nextPhase }
    }
    case 'completeInteraction': {
      if (!state.selectedRobotMode) return state
      const event: TimelineEvent = {
        id: `robot-${state.timeline.length + 1}`,
        time: 'Now',
        kind: 'robot',
        mode: state.selectedRobotMode,
        title: `${state.selectedRobotMode[0].toUpperCase()}${state.selectedRobotMode.slice(1)} interaction`,
        detail: 'Concept robot response completed in the simulated PetLoop demo.',
        status: 'complete',
      }
      return {
        ...state,
        robotPhase: 'complete',
        timeline: [...state.timeline, event],
      }
    }
    case 'resetRobot':
      return { ...state, selectedRobotMode: null, robotPhase: 'idle' }
    default:
      return state
  }
}
