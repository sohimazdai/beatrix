import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export const NotesIcon = props => (
  <Svg width={24} height={23} viewBox="0 0 24 23" fill="none" {...props}>
    <Rect
      x={7.636}
      y={6.545}
      width={16.364}
      height={16.364}
      rx={2}
      fill="#2E3858"
    />
    <Rect
      x={4.364}
      y={3.273}
      width={17.454}
      height={17.454}
      rx={2}
      fill="#8076EB"
    />
    <Rect width={18.546} height={18.546} rx={2} fill="#FF8E8E" />
    <Path
      d="M12 5.455H3.273M15.273 12H8.727"
      stroke="#2E3858"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M15.273 8.727h-12"
      stroke="#2E3858"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeDasharray="3 3"
    />
  </Svg>
)
