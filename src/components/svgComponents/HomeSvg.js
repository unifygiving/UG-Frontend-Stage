import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const HomeSvg = (props) => (
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
      d="M12.555 4.572a1 1 0 0 0-1.11 0l-7 4.666A1 1 0 0 0 4 10.07V19a1 1 0 0 0 1 1h3v-4a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v4h3a1 1 0 0 0 1-1v-8.93a1 1 0 0 0-.445-.832l-7-4.666Zm-2.22-1.664a3 3 0 0 1 3.33 0l7 4.666A3 3 0 0 1 22 10.07V19a3 3 0 0 1-3 3h-4a1 1 0 0 1-1-1v-5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3v-8.93a3 3 0 0 1 1.336-2.496l7-4.666Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HomeSvg;
