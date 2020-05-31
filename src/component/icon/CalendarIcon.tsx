import React from 'react'
import Svg, { Path, Defs, ClipPath } from 'react-native-svg'

export const CalendarIcon = props => (
  <Svg width={20} height={20} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      d="M18.687 26h5.626c.931 0 1.687-.756 1.687-1.688v-5.625c0-.931-.756-1.687-1.687-1.687h-5.626c-.931 0-1.687.756-1.687 1.688v5.625c0 .931.756 1.687 1.687 1.687z"
      fill="#2E3858"
    />
    <Path
      d="M26.25 3.75H25v-2.5C25 .56 24.44 0 23.75 0H22.5c-.69 0-1.25.56-1.25 1.25v2.5H8.75v-2.5C8.75.56 8.19 0 7.5 0H6.25C5.56 0 5 .56 5 1.25v2.5H3.75A3.755 3.755 0 000 7.5v18.75A3.755 3.755 0 003.75 30h22.5A3.755 3.755 0 0030 26.25V7.5a3.755 3.755 0 00-3.75-3.75zm1.25 22.5c0 .689-.561 1.25-1.25 1.25H3.75c-.689 0-1.25-.561-1.25-1.25v-13.7h25v13.7z"
      fill="#444E71"
    />
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
