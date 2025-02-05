import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const BackButtonSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path stroke="#564A67" d="M22.667 16H10" />
    <Path
      stroke="#564A67"
      strokeLinejoin="round"
      d="M14 20.667 9.333 16 14 11.333"
    />
  </Svg>
);
export default BackButtonSvg;
