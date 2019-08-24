import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export const ClocksIcon = props => (
  <Svg width={17} height={17} fill="none" {...props}>
    <Circle cx={8.5} cy={8.5} r={8.5} fill="#333" />
    <Circle cx={8.5} cy={8.5} r={6.5} fill="#EEE" />
    <Path d="M9.28 4H8v5.119l4.479 2.686.64-1.05-3.84-2.276V4z" fill="#333" />
  </Svg>
)
