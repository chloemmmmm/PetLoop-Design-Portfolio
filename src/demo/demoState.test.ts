import { describe, expect, it } from 'vitest'
import { demoReducer, initialDemoState } from './demoState'

describe('demoReducer', () => {
  it('changes the visible time range', () => {
    const next = demoReducer(initialDemoState, { type: 'setRange', range: '7d' })
    expect(next.range).toBe('7d')
  })

  it('appends a completed robot interaction to the timeline', () => {
    const selected = demoReducer(initialDemoState, { type: 'selectRobotMode', mode: 'comfort' })
    const completed = demoReducer(selected, { type: 'completeInteraction' })

    expect(completed.robotPhase).toBe('complete')
    expect(completed.timeline).toHaveLength(initialDemoState.timeline.length + 1)
    expect(completed.timeline.at(-1)).toMatchObject({
      kind: 'robot',
      mode: 'comfort',
      status: 'complete',
    })
  })
})
