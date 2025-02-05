import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const AccountDeleteWarningSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF6030"
      fillRule="evenodd"
      d="M17.723 6.48c-.773-1.232-2.674-1.232-3.447 0L5.605 20.3c-.785 1.25.177 2.825 1.724 2.825H24.67c1.547 0 2.508-1.576 1.724-2.826L17.724 6.48Zm-4.597-.634c1.29-2.054 4.458-2.054 5.747 0l8.67 13.82c1.308 2.083-.294 4.709-2.873 4.709H7.33c-2.578 0-4.18-2.626-2.873-4.71l8.67-13.819Z"
      clipRule="evenodd"
    />
    <Path
      fill="#FF6030"
      fillRule="evenodd"
      d="M15.333 16.25v-7.5h1.333v7.5h-1.333Zm0 4.375V18.75h1.333v1.875h-1.333Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AccountDeleteWarningSvg;
