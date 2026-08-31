import type { RobotMode, TimelineEvent } from '../demo/types'

export const demoPet = {
  name: 'Mochi',
  species: 'Cat',
  status: 'Calm / Curious',
  wearable: 'Connected',
  battery: 82,
}

export const demoMetrics = [
  { id: 'activity', label: 'Activity', value: 'Moderate', note: 'Movement pattern / simulated' },
  { id: 'vocal', label: 'Vocal cues', value: 'Low', note: 'Audio feature summary / simulated' },
  { id: 'emotion', label: 'Emotion cue', value: 'Calm', note: 'Interpretation layer / simulated' },
]

export const demoTimeline: TimelineEvent[] = [
  {
    id: 'evt-0905',
    time: '09:05',
    kind: 'behavior',
    title: 'Resting pattern detected',
    detail: 'Low movement intensity with stable posture cues.',
    status: 'observed',
  },
  {
    id: 'evt-1042',
    time: '10:42',
    kind: 'emotion',
    title: 'Curious state cue',
    detail: 'Motion and vocal features are presented as a simulated interpretation.',
    status: 'interpreted',
  },
]

export const robotModes: Array<{ id: RobotMode; label: string; description: string }> = [
  { id: 'companion', label: 'Companion', description: 'Stay present with gentle screen and voice feedback.' },
  { id: 'comfort', label: 'Comfort', description: 'Trigger a calm reassurance sequence.' },
  { id: 'call', label: 'Call', description: 'Open an owner-to-pet voice connection concept.' },
  { id: 'play', label: 'Play', description: 'Start a short playful interaction sequence.' },
]

export const demoDisclaimer = 'Concept demo · simulated data · not a clinical or diagnostic system.'
