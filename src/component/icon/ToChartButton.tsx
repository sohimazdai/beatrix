import React from 'react'
import Svg, { G, Circle, Path, Defs, ClipPath, LinearGradient, Stop } from 'react-native-svg'

/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const ToChartButton = props => (
  <Svg width={66} height={66} fill="none" {...props}>
    <G>
      <Circle
        cx={33}
        cy={29}
        r={28}
        fill="url(#prefix__paint0_linear)"
        stroke="#D6E5ED"
        strokeWidth={2}
      />
      <Path
        stroke="#715D78"
        strokeOpacity={0.73}
        strokeWidth={2}
        d="M19 11v33M18 45h33"
      />
      <Path
        stroke="#D6E5ED"
        strokeWidth={2}
        d="M15.822 22.431l9 13M23.2 35.4l9-12M30.758 24.03l12-3M42.781 20.375l8 10"
      />
      <Circle cx={15.5} cy={22.5} r={2.5} fill="#FF6363" />
      <Circle cx={24.5} cy={35.5} r={2.5} fill="#FF6363" />
      <Circle cx={31.5} cy={24.5} r={2.5} fill="#FF6363" />
      <Circle cx={43.5} cy={21.5} r={2.5} fill="#FF6363" />
      <Circle cx={50.5} cy={30.5} r={2.5} fill="#FF6363" />
    </G>
    <Defs>
      <LinearGradient
        id="prefix__paint0_linear"
        x1={33}
        y1={0}
        x2={33}
        y2={58}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6A70FF" />
        <Stop offset={1} stopColor="#191B5F" />
      </LinearGradient>
    </Defs>
  </Svg>
)
