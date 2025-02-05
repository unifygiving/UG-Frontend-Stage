import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import BackButtonSvg from '../components/svgComponents/BackButtonSvg';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <BackButtonSvg />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 20,
    top: 20,

    width: 32,
    height: 32,
  },
});
export default BackButton;
