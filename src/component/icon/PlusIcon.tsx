import React from 'react'
import Svg, { G, Circle, Rect, Defs, Path } from 'react-native-svg'

export const PlusIcon = props => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Circle cx={12.5} cy={12.5} r={11} stroke="#2E3858" strokeWidth={3} />
    <Path
      d="M12.5 19V6M6 12.5h13"
      stroke="#2E3858"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
