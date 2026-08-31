import type { RobotMode, RobotPhase } from './types'
import { RobotActionPanel } from './RobotActionPanel'

type Props = {
  mode: RobotMode | null
  phase: RobotPhase
  onSelectMode: (mode: RobotMode) => void
  onSend: () => void
  onReset: () => void
}

export function RobotView(props: Props) {
  return (
    <section className="robot-view" aria-labelledby="robot-view-title">
      <div className="robot-view__intro">
        <div>
          <p className="demo-kicker">03 / DESKTOP ROBOT RESPONSE</p>
          <h2 id="robot-view-title">Respond through the desktop robot.</h2>
        </div>
        <p>The robot is presented as the response end of the PetLoop concept: a voice-and-screen terminal that turns interpreted pet cues into an owner-directed interaction.</p>
      </div>
      <div className="robot-device" aria-hidden="true">
        <div className="robot-device__face"><span /><span /></div>
        <div className="robot-device__pulse" data-phase={props.phase} />
        <p>{props.phase.toUpperCase()}</p>
      </div>
      <RobotActionPanel {...props} />
    </section>
  )
}
