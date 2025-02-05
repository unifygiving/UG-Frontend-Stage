import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
const AccountPrivacySvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Circle cx={12} cy={12.5} r={2.5} stroke="#6200EE" strokeLinejoin="round" />
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M21 12.5S15.866 18 12 18c-3.866 0-9-5.5-9-5.5S8.134 7 12 7c3.866 0 9 5.5 9 5.5Z"
    />
  </Svg>
);
export default AccountPrivacySvg;
