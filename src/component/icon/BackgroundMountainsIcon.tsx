import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

export const BackgroundMountainsIcon = props => (
    <Svg height="100%" width="100%" fill="none" {...props}>
        <Polygon  
            points="305,200 235,340 365,340"
            fill="#B7B7B7"
        />
        <Polygon  
            points="230,230 60,430 410,430"
            fill="#B0B0B0"
        />
        <Polygon  
            points="165,190 90,330 250,330"
            fill="#C4C4C4"
        />
        <Polygon  
            points="290,214 225,350 355,350"
            fill="#CBCBCB"
        />
    </Svg>
)