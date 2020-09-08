import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { COLOR } from '../../constant/Color'

export enum ArrowDirection {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left',
}

interface Props {
  direction: ArrowDirection
  iconColor?: string
  isSmall?: boolean
}

export function ArrowTaillessIcon(props: Props) {
  const { direction, iconColor, isSmall } = props;

  const arrow = getArrow(direction, iconColor)
  const size = isSmall
    ? {
      width: 10,
      height: 10,
    } : {
      width: 20,
      height: 20,
    };
  return (
    <Svg
      {...size}
      viewBox="0 0 100 100"
    >
      {arrow}
    </Svg>
  )
}

function getArrow(direction, fill): JSX.Element {
  switch (direction) {
    case ArrowDirection.RIGHT:
      return <Path
        d="M67.647 49.976L24.191 93.43a3.848 3.848 0 005.441 5.442l46.176-46.177a3.848 3.848 0 000-5.44L29.632 1.078a3.848 3.848 0 00-5.44 5.441l43.455 43.456z"
        fill={fill || COLOR.PRIMARY}
      />
    case ArrowDirection.DOWN:
      return <Path
        d="M50.926 67.647L7.5 24.191a3.844 3.844 0 00-5.438 0 3.85 3.85 0 000 5.441l46.147 46.176a3.844 3.844 0 005.437 0l46.146-46.176a3.85 3.85 0 00-.094-5.44 3.844 3.844 0 00-5.343 0L50.926 67.646z"
        fill={fill || COLOR.PRIMARY}
      />;
    case ArrowDirection.LEFT:
      return <Path
        d="M32.288 50.023L75.744 6.568a3.848 3.848 0 00-5.441-5.441L24.127 47.303a3.848 3.848 0 000 5.44L70.303 98.92a3.848 3.848 0 005.44-5.441L32.289 50.023z"
        fill={fill || COLOR.PRIMARY}
      />;
    case ArrowDirection.UP:
      return <Path
        d="M50.88 32.353l43.428 43.456a3.844 3.844 0 005.437 0 3.85 3.85 0 000-5.441L53.6 24.192a3.844 3.844 0 00-5.438 0L2.015 70.368a3.85 3.85 0 00.094 5.44 3.844 3.844 0 005.343 0L50.88 32.354z"
        fill={fill || COLOR.PRIMARY}
      />
  }
}
