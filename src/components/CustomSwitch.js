import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { COLOURS } from './Colours';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CustomSwitch = ({
  buttonWidth = 13,
  buttonPadding,
  buttonColor = COLOURS.shades0,
  buttonBorderWidth,
  buttonBorderColor,
  buttonText,
  buttonTextStyle,
  switchWidth = 32,
  switchBackgroundColor = COLOURS.neutral60,
  switchBorderWidth = 2,
  switchBorderColor = COLOURS.neutral60,
  switchLeftText,
  switchLeftTextStyle,
  switchRightText,
  switchRightTextStyle,
  onSwitch,
  onSwitchReverse,
  onSwitchButtonText,
  onSwitchButtonTextStyle,
  onSwitchBackgroundColor = COLOURS.primaryMain,
  animationSpeed = 300,

  toggleRight,
  changeToggle,
}) => {
  const colorAnim = useRef(new Animated.Value(0)).current;
  const colorAnimInterpolation =
    onSwitchBackgroundColor &&
    useRef(
      colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [switchBackgroundColor, onSwitchBackgroundColor],
      })
    ).current;

  const layoutAnim = {
    Opacity: () =>
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          animationSpeed ? animationSpeed : defaultValues.animationSpeed,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )
        //   {
        //   duration: 1000,
        //   create: { type: 'easeInEaseOut', property: 'opacity' },
        //   update: { type: 'easeInEaseOut', springDamping: 0.4 },
        //   delete: { type: 'easeInEaseOut', property: 'opacity' },
        // }
      ),
  };

  const changeColor = () => {
    if (toggleRight) {
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: animationSpeed
          ? animationSpeed
          : defaultValues.animationSpeed,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(colorAnim, {
        toValue: 0,
        duration: animationSpeed
          ? animationSpeed
          : defaultValues.animationSpeed,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (toggleRight && onSwitch) {
      onSwitch();
    } else if (!toggleRight && onSwitchReverse) {
      onSwitchReverse();
    }
    if (onSwitchBackgroundColor) {
      changeColor();
    }
  }, [toggleRight]);

  const defaultValues = {
    button: {
      size: {
        width: 20,
        height: 20,
      },
      padding: 0,
      color: {
        backgroundColor: '#FFFFFF',
      },
    },
    switch: {
      size: {
        width: 50,
      },
      color: {
        backgroundColor: '#D4EDE1',
      },
    },
    animationSpeed: 150,
  };

  const buttonStyle = {
    height: buttonWidth
      ? buttonWidth
      : !buttonWidth && switchWidth
      ? switchWidth / 2
      : defaultValues.button.size.width,
    width: buttonWidth
      ? buttonWidth
      : !buttonWidth && switchWidth
      ? switchWidth / 2
      : defaultValues.button.size.width,
    backgroundColor: buttonColor
      ? toggleRight
        ? buttonColor
        : '#d3d3d3'
      : defaultValues.button.color.backgroundColor,
    borderWidth: buttonBorderWidth ? buttonBorderWidth : 0,
    borderColor: buttonBorderColor ? buttonBorderColor : null,
    borderRadius: buttonWidth
      ? buttonWidth / 2
      : !buttonWidth && switchWidth
      ? switchWidth
      : defaultValues.button.size.width / 2,
  };

  const toggleStyle = {
    flexDirection: switchLeftText || switchRightText ? 'row' : null,
    justifyContent: switchLeftText
      ? 'space-between'
      : switchRightText && !switchLeftText
      ? toggleRight
        ? 'flex-end'
        : 'space-between'
      : null,
    alignItems:
      !switchLeftText && !switchRightText
        ? toggleRight
          ? 'flex-end'
          : 'flex-start'
        : 'center',
    width:
      buttonWidth && !switchWidth
        ? buttonWidth * 2
        : buttonWidth >= switchWidth * 0.75
        ? buttonWidth * 1.1
        : switchWidth
        ? switchWidth
        : defaultValues.switch.size.width,
    backgroundColor: onSwitchBackgroundColor
      ? colorAnimInterpolation
      : switchBackgroundColor && !onSwitchBackgroundColor
      ? switchBackgroundColor
      : defaultValues.switch.color.backgroundColor,
    borderWidth: switchBorderWidth ? switchBorderWidth : 0,
    borderColor: switchBorderColor ? switchBorderColor : null,
    padding: buttonPadding ? buttonPadding : defaultValues.button.padding,
    borderRadius:
      buttonWidth && buttonPadding
        ? (buttonWidth + buttonPadding / 2) * 2
        : buttonWidth && !buttonPadding
        ? (buttonWidth + defaultValues.button.padding / 2) * 2
        : !buttonWidth && buttonPadding
        ? (defaultValues.button.size.width + buttonPadding / 2) * 2
        : switchWidth && !buttonWidth
        ? switchWidth * 2
        : (defaultValues.button.size.width + defaultValues.button.padding / 2) *
          2,
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        changeToggle(), layoutAnim.Opacity();
      }}
    >
      <Animated.View style={toggleStyle}>
        {switchLeftText && toggleRight && (
          <View
            style={{
              width:
                toggleStyle.width - buttonStyle.width - toggleStyle.padding * 2,
            }}
          >
            <Text style={[styles.switchText, switchLeftTextStyle]}>
              {switchLeftText}
            </Text>
          </View>
        )}
        <View style={[styles.button, buttonStyle]}>
          {buttonText && onSwitchButtonText ? (
            toggleRight ? (
              <Text style={onSwitchButtonTextStyle}>{onSwitchButtonText}</Text>
            ) : (
              <Text style={buttonTextStyle}>{buttonText}</Text>
            )
          ) : onSwitchButtonText && !buttonText && toggleRight ? (
            <Text style={onSwitchButtonTextStyle}>{onSwitchButtonText}</Text>
          ) : buttonText ? (
            <Text style={buttonTextStyle}>{buttonText}</Text>
          ) : null}
        </View>
        {switchRightText && !toggleRight && (
          <View
            style={{
              width:
                toggleStyle.width - buttonStyle.width - toggleStyle.padding * 2,
            }}
          >
            <Text style={[styles.switchText, switchRightTextStyle]}>
              {switchRightText}
            </Text>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    textAlign: 'center',
  },
});
export default CustomSwitch;
