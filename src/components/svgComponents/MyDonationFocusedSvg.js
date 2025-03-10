import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
const MyDonationFocusedSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#1E1729"
        fillRule="evenodd"
        d="M13.944 24H2.4C1.076 24 0 22.867 0 21.474v-7.58c0-1.393 1.076-2.526 2.4-2.526h6.175a4.599 4.599 0 0 1 2.526.75 4.943 4.943 0 0 1 1.768 2.042l.74 1.56 3.822-3.217a3.567 3.567 0 0 1 1.618-.764 3.478 3.478 0 0 1 1.77.128l2.361.829c.187.066.355.179.491.329.136.15.234.333.286.533.052.2.057.41.014.612a1.29 1.29 0 0 1-.26.547l-6.123 7.518a4.813 4.813 0 0 1-1.638 1.303 4.593 4.593 0 0 1-2.006.462ZM8.575 13.895H2.4v7.579h11.544a2.33 2.33 0 0 0 1-.228c.315-.15.596-.369.824-.641l4.96-6.093-.669-.235a1.167 1.167 0 0 0-1.128.211l-4.975 4.19c-.042.037-.086.07-.132.099l-.002.001h.002l-.006.001-.002.002h-.004l-.002.002h-.002l-.002.001-.004.002-.002.001-.002.001-.004.003s.001.001-.002.001l-.003.001-.003.002h-.003l-.002.002-.004.001-.002.002h-.004s.007.006-.003.002l-.002.001h-.004l-.003.002h-.003l-.005.002-.004.001a1.149 1.149 0 0 1-.53.14H6V16.42h5.258l-.536-1.13c-.41-.862-1.231-1.396-2.147-1.396ZM16.78 0h.022a3.42 3.42 0 0 1 1.378.287c.437.19.833.47 1.166.823A3.872 3.872 0 0 1 20.4 3.79a3.862 3.862 0 0 1-1.055 2.679l-4.075 4.507a1.207 1.207 0 0 1-.397.288 1.155 1.155 0 0 1-.945 0 1.206 1.206 0 0 1-.398-.287l-4.097-4.53A3.855 3.855 0 0 1 8.4 3.79c0-1.013.376-1.964 1.055-2.68A3.485 3.485 0 0 1 11.998 0h.004l.036.001c.233.005 1.22.071 2.362.89C15.572.049 16.584.003 16.78 0Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MyDonationFocusedSvg;
