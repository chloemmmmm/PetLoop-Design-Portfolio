import type { RobotMode, TimelineEvent } from '../demo/types'

export const demoPet = {
  name: 'Mochi',
  species: '猫',
  status: '平静 / 好奇',
  wearable: '已连接',
  battery: 82,
}

export const demoMetrics = [
  { id: 'activity', label: '活动量', value: '适中', note: '运动模式 / 模拟' },
  { id: 'vocal', label: '声音线索', value: '较低', note: '音频特征摘要 / 模拟' },
  { id: 'emotion', label: '情绪线索', value: '平静', note: '解释层 / 模拟' },
]

export const demoTimeline: TimelineEvent[] = [
  {
    id: 'evt-0905',
    time: '09:05',
    kind: 'behavior',
    title: '检测到休息模式',
    detail: '运动强度低，姿态线索稳定。',
    status: 'observed',
  },
  {
    id: 'evt-1042',
    time: '10:42',
    kind: 'emotion',
    title: '好奇状态线索',
    detail: '运动和声音特征以模拟解释的形式呈现。',
    status: 'interpreted',
  },
]

export const robotModes: Array<{ id: RobotMode; label: string; description: string }> = [
  { id: 'companion', label: '陪伴', description: '以温和的屏幕和语音反馈保持陪伴。' },
  { id: 'comfort', label: '安抚', description: '触发平静安抚序列。' },
  { id: 'call', label: '呼叫', description: '开启主人到宠物的语音连接概念。' },
  { id: 'play', label: '玩耍', description: '开始简短的玩耍互动序列。' },
]

export const demoDisclaimer = 'Concept demo · simulated data · not a clinical or diagnostic system.'
