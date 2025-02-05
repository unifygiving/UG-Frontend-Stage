import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
const RecurryInCircleSmallSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <Circle cx={13.381} cy={13.381} r={13.381} fill="#E8E3EF" />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M14.155 9.226a4.226 4.226 0 0 0-4.226 4.225H8.521a5.634 5.634 0 1 1 .805 2.904l1.206-.726a4.226 4.226 0 1 0 3.622-6.403Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="m9.42 12.475-1.018-1.527-1.172.781 1.409 2.113a.704.704 0 0 0 .977.195l2.113-1.408-.782-1.172-1.527 1.018Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RecurryInCircleSmallSvg;
