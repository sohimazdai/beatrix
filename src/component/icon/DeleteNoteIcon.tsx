import React from 'react'
import Svg, { Rect } from 'react-native-svg'

export const DeleteNoteIcon = props => (
  <Svg width={35} height={35} fill="none" {...props}>
    <Rect
      x={6.445}
      y={34.86}
      width={9.114}
      height={40.186}
      rx={4.557}
      transform="rotate(-135 6.445 34.86)"
      fill="#EAE8DD"
    />
    <Rect
      y={6.445}
      width={9.114}
      height={40.186}
      rx={4.557}
      transform="rotate(-45 0 6.445)"
      fill="#EAE8DD"
    />
  </Svg>
)
