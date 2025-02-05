import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const WarningSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={63}
    height={60}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF6030"
      fillRule="evenodd"
      d="M34.84 12.96c-1.498-2.465-5.181-2.465-6.68 0L11.36 40.6c-1.519 2.5.344 5.651 3.34 5.651h33.6c2.997 0 4.86-3.151 3.34-5.651l-16.8-27.64Zm-8.906-1.267c2.497-4.108 8.636-4.108 11.133 0l16.8 27.638c2.533 4.167-.572 9.419-5.567 9.419H14.7c-4.994 0-8.099-5.252-5.566-9.419l16.8-27.638Z"
      clipRule="evenodd"
    />
    <Path
      fill="#FF6030"
      fillRule="evenodd"
      d="M30.209 32.5v-15h2.583v15H30.21Zm0 8.75V37.5h2.583v3.75H30.21Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default WarningSvg;
