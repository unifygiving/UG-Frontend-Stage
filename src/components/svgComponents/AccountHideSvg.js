import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AccountHideSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M13.751 10.216a2.5 2.5 0 0 1-3.488 3.583M19 5 5 19"
    />
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M14.5 6.5C14 6 13 6 12 6c-3.866 0-9 6-9 6l3 2.592M7.72 16c1.398 1.021 2.917 2 4.28 2 3.866 0 9-6 9-6s-2.263-2.741-4.916-4.5"
    />
  </Svg>
);
export default AccountHideSvg;
