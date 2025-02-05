import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
const AccountHelpSupportSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Circle cx={12} cy={12.5} r={10} stroke="#6200EE" />
    <Path
      stroke="#6200EE"
      strokeLinejoin="round"
      d="M9.223 9.722V8.39a2 2 0 0 1 2-2h1.555a2 2 0 0 1 2 2v1.616a2 2 0 0 1-.586 1.414l-1.606 1.606A2 2 0 0 0 12 14.44v1.949m0 1.111v2.222"
    />
  </Svg>
);
export default AccountHelpSupportSvg;
