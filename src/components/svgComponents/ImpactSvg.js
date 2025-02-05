import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ImpactSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#766889"
      fillRule="evenodd"
      d="M3 21V2H1v20a1 1 0 0 0 1 1h20v-2H3Z"
      clipRule="evenodd"
    />
    <Path
      fill="#766889"
      fillRule="evenodd"
      d="m22.707 6.707-6 6a1 1 0 0 1-1.414 0L14 11.414l-4.293 4.293a1 1 0 0 1-1.414 0L6 13.414l-3.293 3.293-1.414-1.414 4-4a1 1 0 0 1 1.414 0L9 13.586l4.293-4.293a1 1 0 0 1 1.414 0L16 10.586l5.293-5.293 1.414 1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ImpactSvg;
