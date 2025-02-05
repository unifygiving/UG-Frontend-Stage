import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AccountDonationsSvg = (props) => (
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
      d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M9.277 9.556a2.5 2.5 0 0 1 2.5-2.5h.445a2.5 2.5 0 0 1 2.5 2.5v.222h-1v-.222a1.5 1.5 0 0 0-1.5-1.5h-.445a1.5 1.5 0 0 0-1.5 1.5v.097a1.5 1.5 0 0 0 .83 1.341l2.233 1.117a2.5 2.5 0 0 1 1.382 2.236v.097a2.5 2.5 0 0 1-2.5 2.5h-.445a2.5 2.5 0 0 1-2.5-2.5v-.222h1v.222a1.5 1.5 0 0 0 1.5 1.5h.445a1.5 1.5 0 0 0 1.5-1.5v-.097a1.5 1.5 0 0 0-.83-1.341l-2.233-1.117a2.5 2.5 0 0 1-1.382-2.236v-.097Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M12.5 5.333v2.223h-1V5.333h1Zm0 11.112v2.222h-1v-2.223h1Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AccountDonationsSvg;
