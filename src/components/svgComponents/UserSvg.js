import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const UserSvg = (props) => (
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
      d="M12 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM5.5 7.5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#766889"
      fillRule="evenodd"
      d="M12 14c-4.365 0-7.908 2.742-8.787 6.262a.482.482 0 0 0 .128.47c.14.15.376.268.66.268h16c.282 0 .52-.118.659-.268a.483.483 0 0 0 .127-.47C19.909 16.742 16.365 14 12 14ZM1.273 19.777C2.4 15.261 6.832 12 12 12c5.169 0 9.6 3.26 10.727 7.777C23.195 21.651 21.567 23 20 23H4c-1.567 0-3.195-1.35-2.727-3.223Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default UserSvg;
