import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
// import {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';

import { latLonToPixel } from '../helpers/functions/latLonToPixel';
import { COLOURS } from './Colours';

const PointsOnMap = ({ cities, mapSettings, activeMap = false }) => {
  // const opacity = useSharedValue((showMap = 'uk' ? 1 : 0));
  const [activePoint, setActivePoint] = useState(null);
  const [infoPosition, setInfoPosition] = useState({
    top: 0,
    left: 0,
    city: '',
    peopleSuported: 0,
    totalDonated: 0,
  });
  const [infoVisible, setInfoVisible] = useState(false);
  const buttonRefs = useRef([]);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const handlePress = (id, city, peopleSuported, totalDonated) => {
    const button = buttonRefs.current[id];
    if (button) {
      button.measure((x, y, width, height, pageX, pageY) => {
        setInfoPosition({
          top: pageY - 285,
          left: pageX - 135,
          city,
          peopleSuported,
          totalDonated,
        });

        setActivePoint(id);
        setInfoVisible(true);
      });
    }
  };
  //=========================================
  // useEffect(() => {
  //   opacity.value = withTiming(showMap === 'uk' ? 1 : 0, {
  //     duration: 500,
  //     easing: Easing.inOut(Easing.ease),
  //   });
  // }, [showMap]);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacity.value,
  //   };
  // });
  //===================================
  useEffect(() => {
    if (infoVisible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setActivePoint(null);
          setInfoVisible(false);
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [infoVisible, scaleAnim]);
  return (
    <>
      {cities.map(
        ({ city, id, latitude, longitude, peopleSuported, totalDonated }) => {
          const pixelCoords = latLonToPixel(latitude, longitude, mapSettings);
          return (
            <React.Fragment key={id}>
              {activeMap ? (
                <TouchableOpacity
                  ref={(el) => (buttonRefs.current[id] = el)}
                  disabled={infoVisible}
                  activeOpacity={1}
                  style={{
                    position: 'absolute',
                    left: pixelCoords.x,
                    top: pixelCoords.y,
                    transform: [{ translateX: -8 }, { translateY: -7.8 }],
                    zIndex: 10,
                  }}
                  onPress={() =>
                    handlePress(id, city, peopleSuported, totalDonated)
                  }
                >
                  {activePoint === id ? (
                    <>
                      <Image
                        source={require('../../assets/Impact/ActivePoint.png')}
                        style={{ width: 16, height: 15.65 }}
                      />
                    </>
                  ) : (
                    <Image
                      source={require('../../assets/Impact/Point.png')}
                      style={{ width: 16, height: 15.65 }}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    {
                      position: 'absolute',
                      left: pixelCoords.x,
                      top: pixelCoords.y,
                      transform: [{ translateX: -5.2 }, { translateY: -5.22 }],
                      zIndex: 10,
                    },
                  ]}
                >
                  <Image
                    source={require('../../assets/Impact/SmallPoint.png')}
                    style={{ width: 10.39, height: 10.44 }}
                  />
                </View>
              )}
            </React.Fragment>
          );
        }
      )}
      {infoVisible && (
        <Animated.View
          style={[
            styles.cityView,
            {
              top: infoPosition.top,
              left: infoPosition.left,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.city}>{infoPosition.city}</Text>
          <Text style={styles.donatInfo}>
            {infoPosition.peopleSuported} peopleSuported
          </Text>
          <Text style={styles.donatInfo}>
            £{infoPosition.totalDonated} donated
          </Text>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cityView: {
    position: 'absolute',

    width: 135,

    backgroundColor: COLOURS.neutral10,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLOURS.neutral20,
    zIndex: 1000,
  },
  city: {
    color: COLOURS.neutral60,
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    lineHeight: 17,
    flexShrink: 1,
  },
  donatInfo: {
    color: COLOURS.neutral60,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default PointsOnMap;
