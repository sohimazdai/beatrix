import React from 'react'
import Svg, { G, Circle, Rect, Defs } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const AddNoteIcon = props => (
  <Svg width={66} height={66} fill="none" {...props}>
    <G>
      <Circle cx={33} cy={29} r={29} fill="#FFC1AD" />
      <Rect
        x={28.443}
        y={9.114}
        width={9.114}
        height={40.186}
        rx={4.557}
        fill="#EAE8DD"
      />
      <Rect
        x={12.907}
        y={33.764}
        width={9.114}
        height={40.186}
        rx={4.557}
        transform="rotate(-90 12.907 33.764)"
        fill="#EAE8DD"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
