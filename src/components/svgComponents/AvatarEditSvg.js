import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AvatarEditSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#A497B6"
      fillRule="evenodd"
      d="M14.828 1.494a.833.833 0 0 1 1.178 0l2.5 2.5a.833.833 0 0 1 0 1.179l-7.5 7.5a.834.834 0 0 1-.471.235l-2.917.417a.834.834 0 0 1-.943-.943l.417-2.917a.833.833 0 0 1 .236-.47l7.5-7.5ZM8.703 9.976l-.22 1.542 1.541-.22 6.714-6.715-1.321-1.321-6.714 6.714Z"
      clipRule="evenodd"
    />
    <Path
      fill="#A497B6"
      fillRule="evenodd"
      d="M4.167 5.417c-.69 0-1.25.56-1.25 1.25v9.166c0 .69.56 1.25 1.25 1.25h9.166c.69 0 1.25-.56 1.25-1.25v-6.25h1.667v6.25a2.917 2.917 0 0 1-2.917 2.917H4.167a2.917 2.917 0 0 1-2.917-2.917V6.667A2.917 2.917 0 0 1 4.167 3.75h6.25v1.667h-6.25Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AvatarEditSvg;
