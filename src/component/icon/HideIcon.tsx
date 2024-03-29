import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export const CloseIcon = props => {
  return (
    <Svg width={30} height={18} viewBox="0 0 30 18" fill="none" {...props}>
      <Path
        d="M29.4431 1.11895C29.0723 0.747799 28.6327 0.562378 28.1248 0.562378H1.87514C1.367 0.562378 0.92772 0.747799 0.55657 1.11895C0.185421 1.49051 0 1.92979 0 2.43762C0 2.94535 0.185421 3.38463 0.55657 3.75588L13.6814 16.8807C14.053 17.2519 14.4923 17.4377 15 17.4377C15.5077 17.4377 15.9474 17.2519 16.3183 16.8807L29.4431 3.75578C29.8139 3.38463 30 2.94535 30 2.43752C30 1.92979 29.8139 1.49051 29.4431 1.11895Z"
        fill="black"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

