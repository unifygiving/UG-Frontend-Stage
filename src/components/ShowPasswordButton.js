import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { COLOURS } from './Colours';
import { Feather } from '@expo/vector-icons';

const ShowPasswordButton = ({ isFerified, toggle, isVisibility }) => {
  return (
    <TouchableOpacity
      style={isFerified ? styles.icon : hideIcon}
      onPress={toggle}
    >
      <Feather
        name={isVisibility ? 'eye' : 'eye-off'}
        size={20}
        color={COLOURS.customText}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 10,
    right: 12,
    opacity: 1,
  },

  hideIcon: {
    opacity: 0,
  },
});
const hideIcon = StyleSheet.compose(styles.icon, styles.hideIcon);
export default ShowPasswordButton;
