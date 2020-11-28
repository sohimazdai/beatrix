import * as React from "react"
import Svg, {
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={25}
      viewBox="0 0 30 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse
        cx={14}
        cy={14.224}
        rx={14}
        ry={10.776}
        fill="url(#prefix__paint0_linear)"
      />
      <Path d="M30 11V9l-16 3v2l16-3z" fill="#C62F2F" />
      <Path d="M28 12.5v1.724H0V12.5h28z" fill="#141E3C" />
      <Ellipse
        cx={14}
        cy={12.5}
        rx={14}
        ry={10.776}
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M20.518 0l-6.565 11.367L30 8.12C28.54 3.79 25.623 1.624 20.518 0z"
        fill="#FF5959"
      />
      <Path
        d="M13.953 12.45v-1.083L30 8.12v1.082L13.953 12.45z"
        fill="#C62F2F"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0.35}
          y1={4.795}
          x2={23.497}
          y2={26.8}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#131C37" />
          <Stop offset={1} stopColor="#131E40" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={0}
          y1={1.824}
          x2={20.265}
          y2={28.109}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#444E71" />
          <Stop offset={1} stopColor="#2E3859" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
