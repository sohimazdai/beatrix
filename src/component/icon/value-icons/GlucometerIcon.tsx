import React from 'react'
import Svg, { Path, G, Defs, Stop, LinearGradient, ClipPath } from 'react-native-svg'

export const GlucometerIcon = props => (
  <Svg viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      d="M25.547 2.93v11.836a8.203 8.203 0 01-8.203 8.203h-4.688a8.203 8.203 0 01-8.203-8.203V2.93A2.344 2.344 0 016.797.586h16.406a2.344 2.344 0 012.344 2.344z"
      fill="#444E71"
    />
    <Path
      d="M6.738 4.93a2 2 0 012-2h12.407a2 2 0 012 2v7.836a2 2 0 01-2 2H8.738a2 2 0 01-2-2V4.93z"
      fill="#fff"
    />
    <Path
      d="M13.83 20.625c-5.743 0-5.919-3.516-5.919-3.516h5.918v3.516z"
      fill="#FF8E8E"
    />
    <Path
      d="M16.17 20.625c5.743 0 5.919-3.516 5.919-3.516H16.17v3.516z"
      fill="#D4EEFF"
    />
    <Path
      d="M16.17 20.625c5.743 0 5.919-3.516 5.919-3.516H16.17v3.516z"
      fill="url(#prefix__paint0_linear)"
    />
    <Path
      d="M23.204 0H6.798a2.933 2.933 0 00-2.93 2.93v11.836c0 4.649 3.63 8.466 8.203 8.769V29c0 .324.606.5.93.5h4c.324 0 .93-.176.93-.5v-5.465c4.574-.303 8.203-4.12 8.203-8.77V2.93A2.933 2.933 0 0023.204 0zM16.76 28.828h-3.516v-1.172h3.516v1.172zm0-2.344h-3.516v-2.93h3.516v2.93zm8.203-11.718c0 4.2-3.417 7.617-7.617 7.617h-4.688c-4.2 0-7.617-3.417-7.617-7.617V2.93c0-.97.789-1.758 1.758-1.758h16.406c.97 0 1.758.788 1.758 1.758v11.836z"
      fill="#444E71"
    />
    <Path d="M12 23h6v4h-6v-4z" fill="#fff" />
    <Path d="M12 23h6v4h-6v-4z" stroke="#444E71" strokeWidth={1.5} />
    <Path
      d="M13.769 13.008a.587.587 0 10-.002-1.174.587.587 0 00.002 1.174zM9.082 13.008h2.344a.587.587 0 000-1.172H9.082a.587.587 0 000 1.172zM18.457 13.008a.587.587 0 10-.002-1.174.587.587 0 00.002 1.174zM16.113 13.008a.587.587 0 10-.001-1.174.587.587 0 00.001 1.174z"
      fill="#2E3858"
    />
    <Path
      d="M12 27h6v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1z"
      fill="#FF8E8E"
      stroke="#444E71"
      strokeWidth={1.5}
    />
    <Path d="M12.75 27h4.5" stroke="#FF8E8E" strokeWidth={1.5} />
    <Defs>
      <LinearGradient
        id="prefix__paint0_linear"
        x1={15.956}
        y1={17}
        x2={19.14}
        y2={20.617}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D4EEFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#D4EEFF" />
      </LinearGradient>
    </Defs>
  </Svg>
)
