import React from 'react'
import Svg, { G, Circle, Rect, Defs, Path } from 'react-native-svg'
import { COLOR } from '../../constant/Color'

interface Props {
  color: COLOR
}

export const PlusRoundedIcon = (props: Props) => (
  <Svg width={25} height={25} viewBox="0 0 26 26" fill="none">
    <Circle cx={13} cy={13} r={12} stroke={props.color} strokeWidth={2} />
    <Path
      d="M13 19.5V6.5M6 13h14"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
