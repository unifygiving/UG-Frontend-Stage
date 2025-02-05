import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const RightArrowSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      fill="#564A67"
      fillRule="evenodd"
      d="m17.39 16.5-4.195-4.195.943-.943 4.667 4.667c.26.26.26.682 0 .942l-4.667 4.667-.943-.943 4.196-4.195Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RightArrowSvg;
