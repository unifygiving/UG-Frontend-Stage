import * as React from 'react';
import Svg, { Circle, G, Path, Defs, ClipPath } from 'react-native-svg';
const HeartInCircleSmallSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <Circle cx={13.381} cy={13.381} r={13.381} fill="#E8E3EF" />
    <G fill="#6200EE" fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
      <Path d="M18.686 8.802c-1.325-1.288-3.444-1.35-4.845-.18a.701.701 0 0 1-.46.163.702.702 0 0 1-.459-.164c-1.4-1.17-3.52-1.107-4.845.181a3.353 3.353 0 0 0-.186 4.65.7.7 0 0 1 .049.062l5.442 5.29 5.441-5.29a.7.7 0 0 1 .049-.061 3.352 3.352 0 0 0-.186-4.65Zm1.332 5.48a4.766 4.766 0 0 0-.351-6.493c-1.713-1.665-4.357-1.857-6.285-.582-1.929-1.275-4.573-1.083-6.285.582a4.766 4.766 0 0 0-.352 6.493.705.705 0 0 0 .12.154l6.026 5.859a.703.703 0 0 0 .981 0l6.026-5.86a.703.703 0 0 0 .12-.153Z" />
      <Path d="M17.608 11.317c0-.78-.63-1.411-1.409-1.411V8.494a2.82 2.82 0 0 1 2.817 2.823h-1.408Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M4.93 4.965h16.903v16.94H4.93z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default HeartInCircleSmallSvg;
