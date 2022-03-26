import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface Props extends SvgProps {
    crossColor: string,
    badgeColor: string,
}

const Backspace = (props: Props) => (
    <Svg
        width={props.width || 40}
        height={28}
        viewBox='0 0 20 14'
        fill="none"
    >
        <Path
            d="M7.828 0H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.828a2 2 0 0 1-1.414-.586l-5-5a2 2 0 0 1 0-2.828l5-5A2 2 0 0 1 7.828 0Z"
            fill={props.badgeColor}
        />
        <Path
            d="m10 10 6-6M16 10l-6-6"
            stroke={props.crossColor}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </Svg>
)

export default Backspace;
