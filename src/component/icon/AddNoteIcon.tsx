import React from 'react'
import Svg, { G, Circle, Rect, Defs } from 'react-native-svg'

export const AddNoteIcon = props => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Rect
      x={15.4639}
      width={9.07217}
      height={40}
      rx={4.53608}
      fill="#2E3858"
    />
    <Rect
      y={24.5361}
      width={9.07216}
      height={40}
      rx={4.53608}
      transform="rotate(-90 0 24.5361)"
      fill="#2E3858"
    />
  </Svg>
)
