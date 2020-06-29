import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

export function NotesIcon(props) {
  return (
    <Svg width={24} height={23} viewBox="0 0 24 23" fill="none" {...props}>
      <Path
        d="M7.636 8.545a2 2 0 012-2H22a2 2 0 012 2V20.91a2 2 0 01-2 2H9.636a2 2 0 01-2-2V8.545z"
        fill="#2E3858"
      />
      <Path
        d="M4.364 5.273a2 2 0 012-2h13.454a2 2 0 012 2v13.454a2 2 0 01-2 2H6.364a2 2 0 01-2-2V5.273z"
        fill="#8076EB"
      />
      <Path
        d="M0 2a2 2 0 012-2h14.546a2 2 0 012 2v14.546a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
        fill="#FF8E8E"
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
