import React from 'react'
import Svg, { Path, Rect, Defs, Pattern, Use, G, ClipPath } from 'react-native-svg'

export const BloodDropIcon = props => (
  <Svg width={25} height={25} viewBox="0 0 20 20" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M10.3644 0.198036C10.2342 -0.00301757 9.96575 -0.0604839 9.76469 0.0696949C9.71333 0.102963 9.66962 0.146669 9.63635 0.198036C9.39531 0.62919 3.74512 10.7887 3.74512 13.7452C3.74512 17.1996 6.54549 20 9.99995 20C13.4544 20 16.2548 17.1996 16.2548 13.7452C16.2548 10.7887 10.6046 0.62919 10.3644 0.198036Z"
        fill="#D32F2F"
      />
      <Path
        d="M9.99997 17.498C7.92732 17.498 6.24707 15.8178 6.24707 13.7451C6.24707 13.5148 6.43378 13.3281 6.66407 13.3281C6.89437 13.3281 7.08107 13.5148 7.08107 13.7451C7.08107 15.3572 8.38791 16.6641 10 16.6641C10.2303 16.6641 10.417 16.8508 10.417 17.0811C10.417 17.3114 10.2303 17.498 9.99997 17.498Z"
        fill="#E57373"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)