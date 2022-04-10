import * as React from "react"
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg"

const SvgComponent = ({ isActive }) => (
    <Svg
        width={25}
        height={25}
        fill="none"
        viewBox='0 0 25 28'
        >
        <Path
            d="M4.5 12.842C4.5 18.073.545 24.89 1 25.895 1.5 27 8.213 28 13 28s11.198-.884 12-2c.636-.884-3.5-7.938-3.5-13.169 0-3.228-.593-4.631-2.5-6.315C17.093 4.832 14.5 4 13 4s-4.093.842-6 2.526c-1.907 1.685-2.5 3.087-2.5 6.316Z"
            fill="url(#a)"
        />
        <Circle cx={13} cy={3} r={3} fill="url(#b)" />
        <Circle cx={22.5} cy={24.5} r={3.5} fill={isActive ? "#FF5959" : "transparent"} />
        <Defs>
            <LinearGradient
                id="a"
                x1={8.5}
                y1={8.5}
                x2={16.802}
                y2={24.631}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#424C6F" />
                <Stop offset={1} stopColor="#1E2641" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={11}
                y1={1}
                x2={13.5}
                y2={4.5}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#6776AA" />
                <Stop offset={1} stopColor="#1D2747" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export default SvgComponent
