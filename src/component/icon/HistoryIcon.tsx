import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { COLOR } from '../../constant/Color';

interface Props extends SvgProps {
  fill?: string
}

export function HistoryIcon(props: Props) {
  const { fill } = props;

  return (
    <Svg viewBox="0 0 448 448" {...props}>
      <Path
        d="M234.667 138.667v106.666l91.306 54.187 15.36-25.92-74.666-44.267v-90.666z"
        fill={fill || COLOR.PRIMARY}
      />
      <Path d="M255.893 32C149.76 32 64 117.973 64 224H0l83.093 83.093 1.493 3.093L170.667 224h-64c0-82.453 66.88-149.333 149.333-149.333S405.333 141.547 405.333 224 338.453 373.333 256 373.333c-41.28 0-78.507-16.853-105.493-43.84L120.32 359.68C154.987 394.453 202.88 416 255.893 416 362.027 416 448 330.027 448 224S362.027 32 255.893 32z" />
    </Svg>
  )
}