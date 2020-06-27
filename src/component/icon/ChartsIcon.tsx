import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export const ChartsIcon = props => (
    <Svg width={26} height={22} viewBox="0 0 26 22" fill="none" {...props}>
        <Path
            d="M3.45 5.898l5.387 7.837 7.347-10.776 6.367 15.674"
            stroke="#2E3858"
            strokeWidth={2}
            strokeLinejoin="round"
        />
        <Circle cx={3.5} cy={6} r={2.5} fill="#FF8E8E" stroke="#2E3858" />
        <Circle cx={22.5} cy={19} r={2.5} fill="#FF8E8E" stroke="#2E3858" />
        <Circle cx={16} cy={3.5} r={2.5} fill="#FF8E8E" stroke="#2E3858" />
        <Circle cx={8.5} cy={14} r={2.5} fill="#FF8E8E" stroke="#2E3858" />
    </Svg>
)
