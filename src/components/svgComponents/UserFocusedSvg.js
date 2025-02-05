import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const UserFocusedSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#1E1729"
      fillRule="evenodd"
      d="M12.6 1a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z"
      clipRule="evenodd"
    />
    <Path
      fill="#1E1729"
      fillRule="evenodd"
      d="M12.6 12C7.433 12 3 15.26 1.875 19.777 1.406 21.651 3.034 23 4.6 23h16c1.567 0 3.195-1.35 2.727-3.223C22.201 15.261 17.77 12 12.601 12Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default UserFocusedSvg;
