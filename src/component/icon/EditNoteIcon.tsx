import React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
import { COLOR } from '../../constant/Color'

export function EditNoteIcon(props) {
    return (
        <Svg width={33} height={32} viewBox="0 0 33 32"  {...props} fill="none">
            <Path
                d="M18 30H2"
                stroke="#FF5959"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.444 21.25L25.864.923A1 1 0 0127.17.383l4.619 1.913a1 1 0 01.541 1.307l-8.419 20.325a1 1 0 01-1.306.541l-4.62-1.913a1 1 0 01-.541-1.307zM17.118 30.054l-.704-5.17a.5.5 0 01.686-.53l4.859 2.013a.5.5 0 01.111.86l-4.154 3.158a.5.5 0 01-.798-.33z"
                fill={props.fill || COLOR.PRIMARY}
            />
        </Svg>
    )
}
