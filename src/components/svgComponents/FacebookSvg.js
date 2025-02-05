import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
const FacebookSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={40}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#1877F2"
        d="M40.542 20c0-11.046-8.954-20-20-20s-20 8.954-20 20c0 9.983 7.314 18.257 16.875 19.757V25.781h-5.078V20h5.078v-4.406c0-5.013 2.986-7.781 7.554-7.781 2.189 0 4.477.39 4.477.39v4.922h-2.522c-2.484 0-3.259 1.542-3.259 3.123V20h5.547l-.887 5.781h-4.66v13.976c9.561-1.5 16.875-9.774 16.875-19.757Z"
      />
      <Path
        fill="#fff"
        d="M28.327 25.781 29.214 20h-5.547v-3.752c0-1.581.775-3.123 3.26-3.123h2.521V8.203s-2.288-.39-4.477-.39c-4.568 0-7.554 2.768-7.554 7.78V20h-5.078v5.781h5.078v13.976a20.148 20.148 0 0 0 6.25 0V25.781h4.66Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.542 0h40v40h-40z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FacebookSvg;
