import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  mainColor?: string
}

export const MinusSignIcon = (props: Props) => (
  <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
    <Path
      d="M14.6098 5.9292H14.6099C14.6873 5.92918 14.75 5.99186 14.75 6.06938V8.9307C14.75 9.00813 14.6873 9.07088 14.6098 9.07088H0.390181C0.312756 9.07088 0.25 9.00809 0.25 8.9307V6.06938C0.25 5.99198 0.312755 5.9292 0.390181 5.9292H14.6098Z"
      fill={props.mainColor ? props.mainColor : "#515151"}
      stroke="#606060"
      strokeWidth={0.5}
    />
  </Svg>
)
