import React from 'react'
import Svg, { G, Circle, Rect, Defs, Path } from 'react-native-svg'
import { COLOR } from '../../constant/Color'

export const AddNoteIcon = props => (
  <Svg width={25} height={25} viewBox="0 0 26 26" fill="none" {...props}>
    <Circle cx={13} cy={13} r={12} stroke={COLOR.WHITE} strokeWidth={2} />
    <Path
      d="M13 19.5V6.5M6 13h14"
      stroke={COLOR.WHITE}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
