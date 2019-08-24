import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ClocksIcon = props => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      d="M10.492 1.969c-4.709 0-8.523 3.822-8.523 8.531 0 4.709 3.814 8.531 8.523 8.531 4.717 0 8.54-3.822 8.54-8.531 0-4.709-3.823-8.531-8.54-8.531zm.008 15.356a6.825 6.825 0 110-13.65 6.825 6.825 0 010 13.65z"
      fill="#333"
      fillOpacity={0.9}
    />
    <Path
      d="M10.927 6.234h-1.28v5.12l4.479 2.686.64-1.05-3.84-2.277V6.234z"
      fill="#333"
      fillOpacity={0.9}
    />
  </Svg>
)
