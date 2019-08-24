import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const CalendarIcon = props => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      d="M15.094 11.156h-3.938v3.938h3.938v-3.938zm-1.313-8.531v1.313H7.22V2.625H5.25v1.313h-.985c-.902 0-1.64.738-1.64 1.64v11.156c0 .903.738 1.641 1.64 1.641h12.47c.902 0 1.64-.738 1.64-1.64V5.577c0-.902-.738-1.64-1.64-1.64h-.985V2.625h-1.969zm2.954 14.11H4.265V8.038h12.47v8.695z"
      fill="#333"
    />
  </Svg>
)
