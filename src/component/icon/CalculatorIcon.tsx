import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { COLOR } from '../../constant/Color';

function CalculatorIcon(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M0 5a5 5 0 015-5h10v15H0V5z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M3.75 7.5h7.5M7.5 11.25v-7.5"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 0h10a5 5 0 015 5v10H15V0z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M18.75 7.5h7.5"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0 15h15v15H5a5 5 0 01-5-5V15z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M4.848 19.827l5.304 5.303m-5.304 0l5.303-5.303"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 15h15v10a5 5 0 01-5 5H15V15z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        d="M18.964 20.71h7.071m-7.07 3.536h7.07"
        stroke={COLOR.PRIMARY_WHITE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0}
          y1={0}
          x2={15}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#444E71" />
          <Stop offset={1} stopColor="#2E3858" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={15}
          y1={0}
          x2={30}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#444E71" />
          <Stop offset={1} stopColor="#2E3858" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={0}
          y1={15}
          x2={15}
          y2={30}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#444E71" />
          <Stop offset={1} stopColor="#2E3858" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={15}
          y1={15}
          x2={30}
          y2={30}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#444E71" />
          <Stop offset={1} stopColor="#2E3858" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default CalculatorIcon;
