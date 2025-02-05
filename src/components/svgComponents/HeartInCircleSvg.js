import * as React from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';
const HeartInCircleSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={36}
    fill="none"
    {...props}
  >
    <Ellipse cx={19} cy={18} fill="#E8E3EF" rx={19} ry={18} />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M26.532 12.21c-1.882-1.749-4.89-1.833-6.88-.246-.19.152-.421.225-.652.222-.23.003-.463-.07-.652-.222-1.99-1.587-4.998-1.503-6.88.246-1.867 1.735-1.952 4.486-.264 6.314a.96.96 0 0 1 .07.083L19 25.79l7.727-7.183a.96.96 0 0 1 .069-.083c1.688-1.828 1.602-4.579-.264-6.314Zm1.891 7.44c2.259-2.592 2.09-6.41-.499-8.816-2.431-2.26-6.186-2.521-8.924-.79-2.738-1.731-6.492-1.47-8.924.79-2.589 2.407-2.758 6.224-.5 8.815a.965.965 0 0 0 .17.21l8.558 7.954c.388.36 1.004.36 1.392 0l8.557-7.955a.963.963 0 0 0 .17-.209Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6200EE"
      fillRule="evenodd"
      d="M25 15.625c0-1.059-.895-1.917-2-1.917v-1.917c2.21 0 4 1.717 4 3.834h-2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HeartInCircleSvg;
