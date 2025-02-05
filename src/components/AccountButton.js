import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { COLOURS } from '../components/Colours';

import RightArrowSvg from '../components/svgComponents/RightArrowSvg';
import CustomSwitch from './CustomSwitch';

const AccountButton = ({
  Icon,
  btnName,
  onPress,
  gap = 0,
  privacySwitch = false,
  onPressOn,
  onPressOff,
}) => {
  const [toggleRight, setToggleRight] = useState(false);
  const changeToggle = () => {
    setToggleRight(!toggleRight);
  };
  return (
    <View style={[{ marginBottom: gap }, styles.boxShadow]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={privacySwitch ? 1 : 0.7}
        onPress={privacySwitch ? changeToggle : onPress}
      >
        <Icon />
        <Text style={styles.btnText}>{btnName}</Text>

        {privacySwitch ? (
          <View style={{ marginLeft: 'auto' }}>
            <CustomSwitch
              onSwitch={onPressOn}
              onSwitchReverse={onPressOff}
              toggleRight={toggleRight}
              changeToggle={changeToggle}
            />
          </View>
        ) : (
          <View style={{ marginLeft: 'auto' }}>
            <RightArrowSvg />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  boxShadow: {
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    borderTopStartRadius: 9,
    borderTopEndRadius: 7,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,

    borderColor: COLOURS.shadowColor,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 60,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 6,

    borderColor: COLOURS.borderBtnAccount,
    backgroundColor: COLOURS.shades0,
  },

  btnText: {
    marginLeft: 12,

    color: COLOURS.customText,

    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
});
export default AccountButton;
