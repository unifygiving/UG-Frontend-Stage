import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLOURS } from './Colours';
import { Feather } from '@expo/vector-icons';

const IconSuccessError = ({ isError, isVerified }) => (
  <View style={isError ? styles.icon : isVerified ? styles.icon : hideIcon}>
    <Feather
      name={isError ? 'alert-triangle' : 'check-circle'}
      size={20}
      color={isError ? COLOURS.errorColour : COLOURS.successColour}
    />
  </View>
);
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
export default IconSuccessError;
