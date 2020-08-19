import * as React from "react"
import Svg, { Circle, Path, COLOR } from "react-native-svg"

interface Props {
  roundFill?: string
  textColor?: string
}

export function InfoIcon(props: Props) {
  const { roundFill, textColor } = props;

  return (
    <Svg width={29} height={29} viewBox="0 0 29 29">
      <Circle cx={14.5} cy={10.5} r={10.5} fill={roundFill ? roundFill : "#fff"} />
      <Path
        d="M14.75 16h-2.219L14 7.547h2.219L14.75 16zm-.492-10.602a1.1 1.1 0 01.344-.867c.24-.229.528-.343.867-.343.333-.01.622.09.867.304s.372.49.383.828c.01.323-.1.604-.328.844-.224.24-.519.365-.883.375a1.25 1.25 0 01-.867-.297c-.245-.208-.373-.49-.383-.844z"
        fill={textColor ? textColor : "#2E3858"}
      />
    </Svg>
  )
}
