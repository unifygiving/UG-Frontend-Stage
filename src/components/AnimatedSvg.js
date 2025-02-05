import React, { useEffect, useState } from 'react';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const AnimatedSvg = ({ showMap, SvgComponent1, SvgComponent2 }) => {
  const [visible, setVisible] = useState(showMap);

  const opacity1 = useSharedValue(showMap === 'uk' ? 1 : 0);
  const opacity2 = useSharedValue(showMap === 'uk' ? 0 : 1);

  useEffect(() => {
    if (showMap === 'uk') {
      opacity2.value = withTiming(
        0,
        { duration: 500, easing: Easing.inOut(Easing.ease) },
        () => {
          runOnJS(setVisible)('uk');
          opacity1.value = withTiming(1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          });
        }
      );
    } else {
      opacity1.value = withTiming(
        0,
        { duration: 500, easing: Easing.inOut(Easing.ease) },
        () => {
          runOnJS(setVisible)('portugal');
          opacity2.value = withTiming(1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          });
        }
      );
    }
  }, [showMap]);

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      opacity: opacity1.value,
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value,
    };
  });

  return (
    <>
      {visible === 'uk' && (
        <Animated.View style={animatedStyle1}>{SvgComponent1}</Animated.View>
      )}
      {visible === 'portugal' && (
        <Animated.View style={animatedStyle2}>{SvgComponent2}</Animated.View>
      )}
    </>
  );
};
export default AnimatedSvg;
