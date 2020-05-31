import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export function MinusIcon(props) {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Circle cx={12.5} cy={12.5} r={11} stroke="#2E3858" strokeWidth={3} />
      <Path
        d="M6 12.5h13"
        stroke="#2E3858"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
