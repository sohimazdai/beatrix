import React from 'react'
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg'

export const BackgroundSunIcon = props => (
    <Svg width={375} height={559} viewBox="0 0 375 559" fill="none" {...props}>
        <Circle cx={187} cy={260} r={260} fill="#FF8E8E" />
        <Circle cx={188} cy={288} r={271} fill="url(#paint0_radial)" />
        <Defs>
            <RadialGradient
                id="paint0_radial"
                cx="187"
                cy="260"
                rx="260"
                ry="260"
                fx="187"
                fy="260"
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset="0" stopColor="#FFD28D" stopOpacity="1" />
                <Stop offset="1" stopColor="#FFADAD" stopOpacity="1" />
            </RadialGradient>
        </Defs>
    </Svg>
)