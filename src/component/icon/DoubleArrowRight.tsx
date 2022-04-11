import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DoubleArrowRight = ({ color }) => (
    <Svg
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 100 100"
    >
        <Path
            d="M44.583 49.977 1.127 93.432a3.848 3.848 0 0 0 5.441 5.441l46.176-46.176a3.848 3.848 0 0 0 0-5.44L6.568 1.08a3.848 3.848 0 0 0-5.441 5.441l43.456 43.456Z"
            fill={color}
        />
        <Path
            d="M90.582 49.977 47.127 93.432a3.848 3.848 0 0 0 5.44 5.441l46.177-46.176a3.848 3.848 0 0 0 0-5.44L52.568 1.08a3.848 3.848 0 0 0-5.441 5.441l43.455 43.456Z"
            fill={color}
        />
    </Svg>
)

export default DoubleArrowRight
