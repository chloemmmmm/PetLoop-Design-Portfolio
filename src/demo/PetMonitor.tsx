import { useEffect, useState } from 'react'
import type { RobotMode } from '../demo/types'

const monitorImages: Record<RobotMode, string> = {
  companion: 'https://aka.doubaocdn.com/s/TWdsFh8msO',
  comfort: 'https://aka.doubaocdn.com/s/6UikYDUU0X',
  call: 'https://aka.doubaocdn.com/s/iUQ08GvV6p',
  play: 'https://aka.doubaocdn.com/s/dUrIUvCO3q',
}

const modeLabels: Record<RobotMode, string> = {
  companion: '陪伴',
  comfort: '安抚',
  call: '呼叫',
  play: '玩耍',
}

const activityStates: Record<RobotMode, { activity: string; mood: string; action: string; emoji: string }> = {
  companion: { activity: '靠近机器人', mood: '开心', action: '蹭机器人', emoji: '😻' },
  comfort: { activity: '安静休息', mood: '平静', action: '蜷缩睡觉', emoji: '😴' },
  call: { activity: '抬头倾听', mood: '好奇', action: '竖起耳朵', emoji: '👂' },
  play: { activity: '活跃玩耍', mood: '兴奋', action: '扑向玩具', emoji: '🎉' },
}

// AI检测框位置（准确框住小猫脸和上半身）
const detectionPositions: Record<RobotMode, { top: string; left: string; width: string; height: string }> = {
  companion: { top: '28%', left: '48%', width: '32%', height: '52%' },
  comfort: { top: '42%', left: '22%', width: '38%', height: '40%' },
  call: { top: '12%', left: '38%', width: '28%', height: '48%' },
  play: { top: '32%', left: '52%', width: '30%', height: '48%' },
}

const modeFilters: Record<RobotMode, string> = {
  companion: 'saturate(1.2) brightness(1.05)',
  comfort: 'saturate(0.9) brightness(0.95) sepia(0.1)',
  call: 'saturate(1.1) contrast(1.1)',
  play: 'saturate(1.3) brightness(1.1) contrast(1.1)',
}

export function PetMonitor({ lastRobotAction }: { lastRobotAction: RobotMode | null }) {
  const [time, setTime] = useState(new Date())
  const [showChangeTip, setShowChangeTip] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (lastRobotAction) {
      setShowChangeTip(true)
      setImageLoaded(false)
      const t = setTimeout(() => setShowChangeTip(false), 4000)
      return () => clearTimeout(t)
    }
  }, [lastRobotAction])

  const imageUrl = lastRobotAction ? monitorImages[lastRobotAction] : 'https://aka.doubaocdn.com/s/byE2kbbvvF'
  const currentState = lastRobotAction ? activityStates[lastRobotAction] : { activity: '正常活动', mood: '平静', action: '自由活动', emoji: '🐱' }
  const detectionPos = lastRobotAction ? detectionPositions[lastRobotAction] : { top: '25%', left: '35%', width: '30%', height: '50%' }
  const filterStyle = lastRobotAction ? modeFilters[lastRobotAction] : 'none'

  const formatTime = (d: Date) => d.toLocaleTimeString('zh-CN', { hour12: false })
  const formatDate = (d: Date) => d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })

  return (
    <div className="pet-monitor">
      <div className="pet-monitor__header">
        <div className="pet-monitor__title">
          <span className="rec-dot"></span>
          <span>实时宠物监控</span>
          {lastRobotAction && (
            <span className="pet-monitor__mode-badge">
              {currentState.emoji} {modeLabels[lastRobotAction]}模式
            </span>
          )}
        </div>
        <div className="pet-monitor__info">
          <span>客厅摄像头</span>
          <span>1080P · 30fps</span>
        </div>
      </div>

      <div className="pet-monitor__video">
        <img 
          src={imageUrl} 
          alt="宠物监控画面" 
          className={`pet-monitor__image ${imageLoaded ? 'pet-monitor__image--loaded' : ''}`}
          style={{ filter: filterStyle }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="pet-monitor__scanline"></div>
        <div className="pet-monitor__timestamp">
          <div>{formatDate(time)}</div>
          <div className="pet-monitor__time">{formatTime(time)}</div>
        </div>
        <div className="pet-monitor__rec">
          <span className="rec-dot rec-dot--blink"></span>
          <span>REC</span>
        </div>
        <div 
          className="pet-monitor__detection"
          style={{ top: detectionPos.top, left: detectionPos.left, width: detectionPos.width, height: detectionPos.height }}
        >
          <div className="detection-box"></div>
          <div className="detection-label">🐱 {currentState.action} · 置信度 98.7%</div>
        </div>
        <div className="pet-monitor__env">
          <span>🌡️ 温度 24.5°C</span>
          <span>💧 湿度 55%</span>
          <span>🔊 噪音 32dB</span>
        </div>
        <div className="pet-monitor__status">
          <div className="status-item">
            <span className="status-label">活动状态</span>
            <span className="status-value status-value--animate">{currentState.activity}</span>
          </div>
          <div className="status-item">
            <span className="status-label">心情</span>
            <span className="status-value status-value--animate">{currentState.emoji} {currentState.mood}</span>
          </div>
          {lastRobotAction && (
            <div className="status-item">
              <span className="status-label">当前模式</span>
              <span className="status-value status-value--active">{modeLabels[lastRobotAction]}</span>
            </div>
          )}
        </div>
        {showChangeTip && lastRobotAction && (
          <div className="pet-monitor__change-tip pet-monitor__change-tip--animate">
            <div className="change-tip__icon">🎯</div>
            <div className="change-tip__content">
              <div className="change-tip__title">已切换到{modeLabels[lastRobotAction]}模式</div>
              <div className="change-tip__desc">小猫状态：{currentState.action} · 心情：{currentState.mood}</div>
            </div>
          </div>
        )}
      </div>

      <div className="pet-monitor__controls">
        <button className="monitor-btn">📷 截图</button>
        <button className="monitor-btn">🔄 刷新</button>
        <button className="monitor-btn">🎤 对讲</button>
        <button className="monitor-btn monitor-btn--active">📹 录制中</button>
      </div>
      
      {lastRobotAction && (
        <div className="pet-monitor__sync-tip">✅ 监控画面已随机器人指令实时更新</div>
      )}
    </div>
  )
}
