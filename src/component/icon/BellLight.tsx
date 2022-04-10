import * as React from "react"
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg"
import { COLOR } from "../../constant/Color"

const SvgComponent = ({ isActive }) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    viewBox='0 0 25 28'
  >
    <Path
      d="M3.5 12.842C3.5 18.073 0 25.895 0 25.895S7.213 28 12 28s12-2.116 12-2.116-3.5-7.822-3.5-13.053c0-3.228-.593-4.631-2.5-6.315C16.093 4.832 13.5 4 12 4s-4.093.842-6 2.526c-1.907 1.685-2.5 3.087-2.5 6.316Z"
      fill="url(#a)"
    />
    <Circle cx={12} cy={3} r={3} fill="url(#b)" />
    <Circle cx={21.5} cy={24.5} r={3.5} fill={isActive ? COLOR.RED : 'transparent'} />
    <Defs>
      <LinearGradient
        id="a"
        x1={7.5}
        y1={8.5}
        x2={15.802}
        y2={24.631}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#A2AED6" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={10}
        y1={1}
        x2={12.5}
        y2={4.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E8EBF5" />
        <Stop offset={1} stopColor="#818EBB" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
