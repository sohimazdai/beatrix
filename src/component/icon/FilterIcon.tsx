import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { COLOR } from '../../constant/Color'

export function FilterIcon(props) {
  return (
    <Svg viewBox="0 0 477.875 477.875" {...props}>
      <Path
        d="M460.804 0H17.071C7.645 0 .004 7.641.004 17.067V102.4a17.067 17.067 0 005.649 12.698l165.018 148.514V460.8c-.004 9.426 7.633 17.07 17.059 17.075a17.068 17.068 0 007.637-1.8l102.4-51.2a17.067 17.067 0 009.438-15.275V263.612l165.018-148.48a17.068 17.068 0 005.649-12.732V17.067C477.871 7.641 470.23 0 460.804 0z"
        fill={COLOR.PRIMARY_WHITE}
      />
    </Svg>
  )
}
