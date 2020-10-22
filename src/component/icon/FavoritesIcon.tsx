import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { COLOR } from '../../constant/Color'

interface Props extends SvgProps {
  fill?: string
}
export function FavoritesIcon(props: Props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M21.983 1.293A8.01 8.01 0 0015 5.38a8.01 8.01 0 00-6.983-4.086C3.59 1.293 0 5.4 0 9.828c0 11.12 15 18.879 15 18.879s15-7.759 15-18.88c0-4.427-3.59-8.534-8.017-8.534z"
        fill={props.fill || COLOR.PRIMARY_WHITE}
      />
      <Path
        d="M2.069 9.828c0-4.097 3.074-7.912 7.04-8.46a7.98 7.98 0 00-1.092-.075C3.59 1.293 0 5.4 0 9.828c0 11.12 15 18.879 15 18.879s.388-.201 1.035-.582c-3.39-1.992-13.966-8.958-13.966-18.297z"
        fill={COLOR.BLACK || COLOR.PRIMARY_WHITE}
        fillOpacity={props.fill ? 0.2 : 0}
      />
    </Svg>
  )
}
