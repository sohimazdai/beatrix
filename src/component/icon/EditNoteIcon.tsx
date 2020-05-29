import React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"

export function EditNoteIcon(props) {
    return (
        <Svg width={35} height={35} viewBox="0 0 25 25" fill="none" {...props}>
            <Path
                d="M0 5a5 5 0 015-5h15a5 5 0 015 5v15a5 5 0 01-5 5H5a5 5 0 01-5-5V5z"
                fill="#fff"
            />
            <Path
                d="M10.328 20.103l-4.306-3.376L17.37 2l4.334 3.34-11.376 14.763z"
                fill="#2E3858"
                stroke="#fff"
                strokeLinejoin="round"
            />
            <Path
                d="M10.328 20.103l-5.16 2.215.826-5.555 4.334 3.34z"
                fill="#2E3858"
                stroke="#fff"
                strokeWidth={0.5}
                strokeLinejoin="round"
            />
        </Svg>
    )
}
