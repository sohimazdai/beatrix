import React from 'react'
import Svg, { G, Circle, Rect, Defs, Path } from 'react-native-svg'
import { Color } from '../../constant/Color'

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

export const AddNoteIconV2 = props => (
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

export const AddNoteIcon_WHITE = props => (
  <Svg width={25} height={25} viewBox="0 0 26 26" fill="none" {...props}>
    <Circle cx={13} cy={13} r={12} stroke={Color.WHITE} strokeWidth={2} />
    <Path
      d="M13 19.5V6.5M6 13h14"
      stroke={Color.WHITE}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
