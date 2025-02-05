import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
const RecurryInCircleSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    fill="none"
    {...props}
  >
    <Circle cx={19} cy={19} r={19} fill="#E8E3EF" />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M20 13a6 6 0 0 0-6 6h-2a8 8 0 1 1 1.143 4.124l1.713-1.032A6 6 0 1 0 20 13Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="m13.277 17.613-1.445-2.168-1.664 1.11 2 3a1 1 0 0 0 1.387.277l3-2-1.11-1.664-2.168 1.445Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RecurryInCircleSvg;
