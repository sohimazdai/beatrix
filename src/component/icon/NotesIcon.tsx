import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { COLOR } from '../../constant/Color';

export function NotesIcon(props) {
  const { fill, ...restProps } = props;

  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...restProps}>
      <Path
        d="M8 9.078C8 7.93 8.93 7 10.078 7h12.844C24.07 7 25 7.93 25 9.078v12.844C25 23.07 24.07 24 22.922 24H10.078A2.078 2.078 0 018 21.922V9.078z"
        fill={fill ? fill : COLOR.PRIMARY}
      />
      <Path
        d="M4 5.063C4 3.923 4.923 3 6.063 3h13.875C21.076 3 22 3.923 22 5.063v13.875C22 20.076 21.077 21 19.937 21H6.063A2.062 2.062 0 014 18.937V5.063z"
        fill="#8075FF"
      />
      <Path
        d="M0 2a2 2 0 012-2h14.546a2 2 0 012 2v14.546a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
        fill="#FF8383"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.523 5.455a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.273a.75.75 0 01-.75-.75zM7.977 12a.75.75 0 01.75-.75h6.546a.75.75 0 110 1.5H8.727a.75.75 0 01-.75-.75zM2.523 8.727a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.5 0a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm6 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"
        fill="#2E3858"
      />
    </Svg>
  )
}
