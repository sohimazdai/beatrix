import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { COLOR } from '../../constant/Color'

interface Props extends SvgProps {
  fill?: string
}

export function ScanBarcodeIcon(props: Props) {
  return (
    <Svg viewBox="0 0 480 480" {...props}>
      <Path
        d="M80 48H16C7.168 48 0 55.168 0 64v64c0 8.832 7.168 16 16 16s16-7.168 16-16V80h48c8.832 0 16-7.168 16-16s-7.168-16-16-16zM464 336c-8.832 0-16 7.168-16 16v48h-48c-8.832 0-16 7.168-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16v-64c0-8.832-7.168-16-16-16zM464 48h-64c-8.832 0-16 7.168-16 16s7.168 16 16 16h48v48c0 8.832 7.168 16 16 16s16-7.168 16-16V64c0-8.832-7.168-16-16-16zM80 400H32v-48c0-8.832-7.168-16-16-16s-16 7.168-16 16v64c0 8.832 7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM64 112h32v256H64zM128 112h32v192h-32zM192 112h32v192h-32zM256 112h32v256h-32zM320 112h32v192h-32zM384 112h32v256h-32zM128 336h32v32h-32zM192 336h32v32h-32zM320 336h32v32h-32z"
        fill={props.fill || COLOR.PRIMARY}
      />
    </Svg>
  )
}