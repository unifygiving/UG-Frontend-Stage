import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import { COLOURS } from './Colours';

const MainButton = ({
  disabled = false,
  onPress,
  nameBtn,
  whiteButton = false,
}) => {
  return (
    <View style={styles.boxShadow}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        style={
          whiteButton
            ? disabled
              ? styles.whiteDisabledBtn
              : whiteBtn
            : disabled
            ? styles.disabledButton
            : button
        }
        onPress={onPress}
      >
        <Text
          style={
            whiteButton
              ? disabled
                ? whiteDisabledBtnText
                : whiteBtnText
              : styles.buttonText
          }
        >
          {nameBtn}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    width: '100%',

    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    borderTopStartRadius: 9,
    borderTopEndRadius: 7,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 6,

    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  disabledButton: {
    alignItems: 'center',

    width: '100%',
    paddingVertical: 15,
    borderRadius: 5,

      backgroundColor: COLOURS.neutral30,
  },
  button: {
    backgroundColor: COLOURS.primaryMain,
  },

  buttonText: {
    color: COLOURS.shades0,

    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    lineHeight: 20,
  },
  whiteDisabledBtn: {
    alignItems: 'center',

    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,

    backgroundColor: COLOURS.shades0,
      borderColor: COLOURS.neutral30,
  },
  whiteBtn: {
    borderColor: '#CE97FD',
  },
  whiteDisabledBtnText: {
      color: COLOURS.neutral30,
  },
  whiteBtnText: {
    color: COLOURS.primaryMain,
  },
});
const button = StyleSheet.compose(styles.disabledButton, styles.button);
const whiteBtn = StyleSheet.compose(styles.whiteDisabledBtn, styles.whiteBtn);
const whiteDisabledBtnText = StyleSheet.compose(
  styles.buttonText,
  styles.whiteDisabledBtnText
);
const whiteBtnText = StyleSheet.compose(styles.buttonText, styles.whiteBtnText);

export default MainButton;
