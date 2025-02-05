import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AccountEditSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M9.5 12 9 15.5l3.5-.5 9-9-3-3-9 9Z"
    />
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M12.5 6H5a2.5 2.5 0 0 0-2.5 2.5v11A2.5 2.5 0 0 0 5 22h11a2.5 2.5 0 0 0 2.5-2.5V12"
    />
  </Svg>
);
export default AccountEditSvg;
