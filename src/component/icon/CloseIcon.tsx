import React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export function CloseIcon(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Circle cx={15} cy={15} r={15} fill="#555555" />
      <Path
        d="M21.9231 8.07692L8.0769 21.9231"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.9231 21.9231L8.0769 8.07692"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
