import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLOURS } from './Colours';

import MainButton from './MainButton';
import ModalComponent from './ModalComponent';
import SuccessSvg from '../components/svgComponents/SuccessSvg';

const ModalSuccess = ({
  handleAction,
  isModalVisible,
  changePasswordSuccessModal = false,
  editSuccessModal = false,
  changePrivacySuccessModal = false,
}) => (
  <ModalComponent isModalVisible={isModalVisible}>
    <View style={{ marginTop: 24 }}>
      <SuccessSvg />
    </View>
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.title}>Success</Text>
    </View>
    <View style={{ paddingVertical: 12, width: 190 }}>
      {changePasswordSuccessModal && (
        <Text style={styles.text}>
          You have successfully changed your password.
        </Text>
      )}
      {editSuccessModal && (
        <Text style={styles.text}>
          You have successfully changed your account.
        </Text>
      )}
      {changePrivacySuccessModal && (
        <Text style={styles.text}>
          You have successfully changed your privacy.
        </Text>
      )}
    </View>
    <View style={styles.btnContainer}>
      <MainButton nameBtn="Back to Home" onPress={handleAction} />
    </View>
  </ModalComponent>
);

const styles = StyleSheet.create({
  title: {
    color: COLOURS.primaryMain,

    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    lineHeight: 30,
    textTransform: 'uppercase',
  },
  text: {
    color: COLOURS.neutral80,

    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  btnContainer: {
    alignItems: 'center',

    width: 160,
    paddingTop: 12,
  },
});

export default ModalSuccess;
