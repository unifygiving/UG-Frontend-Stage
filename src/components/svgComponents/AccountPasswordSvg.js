import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
const AccountPasswordSvg = (props) => (
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
      d="M4 10.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-10Z"
    />
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M6.664 8.878V4.5a2 2 0 0 1 2-2h6.437a2 2 0 0 1 2 2v4.378"
    />
    <Circle cx={12} cy={14.5} r={1.5} stroke="#6200EE" strokeLinejoin="round" />
    <Path stroke="#6200EE" strokeLinejoin="round" d="M12 15.5V19" />
  </Svg>
);
export default AccountPasswordSvg;
