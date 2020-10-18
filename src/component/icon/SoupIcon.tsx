import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SoupIcon(props) {
  return (
    <Svg width={30} height={31} viewBox="0 0 30 31" fill="none" {...props}>
      <Path
        d="M23.892 29.329c-5.367 2.207-13.232 2.248-18.973 0v-3.855h18.973v3.855z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M27.406 24.29s2.109-1.58 2.109-8.29C26 14.42 3.514 14.42 0 16c0 6.71 2.108 8.29 2.108 8.29 1.757 1.973 9.136 3.947 12.65 3.947 3.513 0 10.892-1.974 12.648-3.948z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M24.763 11.438c-.79 1.664-1.122 9.4-1.19 13.06l.002.346h-2.883c-.022-5.894.778-12.52 2.45-15.293 1.338-2.22 4.003-3.878 5.168-4.43.685-.325 1.202.053 1.478.577.276.524.14 1.011-.27 1.272-1.256.796-3.965 2.804-4.755 4.468z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M27.406 24.29s2.109-1.58 2.109-8.29C26 17.579 3.514 17.579 0 16c0 6.71 2.108 8.29 2.108 8.29 1.757 1.973 9.136 3.947 12.65 3.947 3.513 0 10.892-1.974 12.648-3.947z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        d="M10.541 11c0-.588 1.405-1.1 1.405-2.353 0-1.176-1.405-1.47-1.405-2.647 0-.882 1.405-1.765 1.405-2.647 0-.882-1.405-2.059-1.405-2.353M14.055 11c0-.588 1.405-1.1 1.405-2.353 0-1.176-1.405-1.47-1.405-2.647 0-.882 1.405-1.765 1.405-2.647 0-.882-1.405-2.059-1.405-2.353M17.568 11c0-.588 1.406-1.1 1.406-2.353 0-1.176-1.406-1.47-1.406-2.647 0-.882 1.406-1.765 1.406-2.647 0-.882-1.406-2.059-1.406-2.353"
        stroke="#2E3858"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={5.067}
          y1={26.263}
          x2={24.081}
          y2={30.054}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2E3858" />
          <Stop offset={0} stopColor="#2E3858" />
          <Stop offset={1} stopColor="#1C2540" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={0}
          y1={16}
          x2={23.559}
          y2={24.71}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#111A34" />
          <Stop offset={1} stopColor="#212C54" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={25.274}
          y1={5}
          x2={25.274}
          y2={24.844}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#979797" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={0}
          y1={16}
          x2={23.559}
          y2={24.711}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#444E71" />
          <Stop offset={1} stopColor="#2E3858" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SoupIcon
