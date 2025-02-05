import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const DownArrowSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#D5CDE0"
      strokeLinejoin="round"
      strokeWidth={1.22}
      d="m8.5 10.25 3.5 3.5 3.5-3.5"
    />
  </Svg>
);
export default DownArrowSvg;
