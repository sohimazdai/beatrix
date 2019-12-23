import React from 'react'
import Svg, { G, Circle, Rect, Defs } from 'react-native-svg'

export const AddNoteIcon = props => (
  <Svg width={40} height={40} viewBox="0 0 49 45" fill="none" {...props}>
    <G>
      <Rect
        x={19.5357}
        width={9.11429}
        height={40.1857}
        rx={4.55714}
        fill="#2E3858"
      />
      <Rect
        x={4}
        y={24.65}
        width={9.11428}
        height={40.1857}
        rx={4.55714}
        transform="rotate(-90 4 24.65)"
        fill="#2E3858"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
