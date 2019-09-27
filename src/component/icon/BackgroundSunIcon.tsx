import React from 'react'
import Svg, { Circle, Polygon } from 'react-native-svg';

export const BackgroundSunIcon = props => (
    <Svg height="100%" width="100%" fill="none" {...props}>
        <Circle
            cx="177"
            cy="320"
            r="250"
            fill="#FFB4B4"
        />
        <Circle
            cx="177"
            cy="343"
            r="250"
            fill="#FFC1AD"
        />
    </Svg>
)