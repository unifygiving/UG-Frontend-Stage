import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const HomeFocusedSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#1E1729"
      fillRule="evenodd"
      d="M13.664 2.908a3 3 0 0 0-3.328 0l-7 4.666A3 3 0 0 0 2 10.07V19a3 3 0 0 0 3 3h4a1 1 0 0 0 1-1v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 0 1 1h4a3 3 0 0 0 3-3v-8.93a3 3 0 0 0-1.336-2.496l-7-4.666Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HomeFocusedSvg;
