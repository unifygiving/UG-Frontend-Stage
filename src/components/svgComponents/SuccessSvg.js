import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
const SuccessSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={138}
    height={140}
    fill="none"
    {...props}
  >
    <Circle cx={70} cy={74} r={60} fill="#559B09" />
    <Circle cx={70} cy={74} r={25} fill="#fff" />
    <Path
      fill="#219653"
      fillRule="evenodd"
      d="M79.707 68.707 67.06 81.354l-6.793-7.323 1.466-1.36 5.38 5.8 11.18-11.178 1.414 1.414Z"
      clipRule="evenodd"
    />
    <Circle cx={132.5} cy={43.5} r={2.5} fill="#559B09" />
    <Circle cx={101.5} cy={131.5} r={2.5} fill="#559B09" />
    <Circle cx={18} cy={22} r={5} fill="#559B09" />
    <Circle cx={5} cy={99} r={5} fill="#559B09" />
    <Circle cx={128} cy={110} r={5} fill="#559B09" />
    <Circle cx={56.5} cy={138.5} r={1.5} fill="#559B09" />
    <Circle cx={136.5} cy={88.5} r={1.5} fill="#559B09" />
    <Circle cx={93.5} cy={8.5} r={1.5} fill="#559B09" />
    <Circle cx={1.5} cy={86.5} r={1.5} fill="#559B09" />
    <Circle cx={76} cy={5} r={5} fill="#559B09" />
  </Svg>
);
export default SuccessSvg;
