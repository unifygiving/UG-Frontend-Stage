import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AccountLogoutSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={24}
    height={25}
    {...props}
  >
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M15 12.5H3M6.5 9 3 12.5 6.5 16M9 17.5v3h12v-16H9v3"
    />
  </Svg>
);
export default AccountLogoutSvg;
