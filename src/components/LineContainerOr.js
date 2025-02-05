import { View, StyleSheet, Text } from 'react-native';

import { COLOURS } from './Colours';

const LineContainerOr = () => (
  <View style={styles.orContainer}>
    <View style={styles.orLine} />
    <Text style={styles.orText}>Or</Text>
    <View style={styles.orLine} />
  </View>
);
const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLOURS.customBorderColour,
  },
  orText: {
    marginHorizontal: 4,
    fontSize: 16,
    lineHeight: 22,
    color: COLOURS.customBorderColour,
  },
});
export default LineContainerOr;
