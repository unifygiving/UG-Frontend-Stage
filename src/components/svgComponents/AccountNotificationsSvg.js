import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AccountNotificationsSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M5.885 8.65A4.5 4.5 0 0 1 10.305 5h3.39a4.5 4.5 0 0 1 4.42 3.65l1.876 9.756A.5.5 0 0 1 19.5 19h-15a.5.5 0 0 1-.491-.594L5.885 8.65ZM10.305 6a3.5 3.5 0 0 0-3.438 2.839L5.105 18h13.79l-1.762-9.161A3.5 3.5 0 0 0 13.696 6h-3.392Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M22 19H2v-1h20v1Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M8.5 18.5A.5.5 0 0 1 9 18h6a.5.5 0 0 1 .5.5v1A2.5 2.5 0 0 1 13 22h-2a2.5 2.5 0 0 1-2.5-2.5v-1Zm1 .5v.5A1.5 1.5 0 0 0 11 21h2a1.5 1.5 0 0 0 1.5-1.5V19h-5Zm0-13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1a2.5 2.5 0 0 0-5 0v1Zm1-.5v-.5a1.5 1.5 0 0 1 3 0V5h-3Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AccountNotificationsSvg;
