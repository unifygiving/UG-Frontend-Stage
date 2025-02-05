import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLOURS } from './Colours';

import MainButton from './MainButton';
import ModalComponent from './ModalComponent';
import SuccessSvg from './svgComponents/SuccessSvg';
import WarningSvg from './svgComponents/WarningSvg';

export const ModalResultsGeneric = ({
  success = true,
  title = "success",
  handleAction,
  isModalVisible,
  message,
  buttonText = "Back to Home",
}) => (
  <ModalComponent isModalVisible={isModalVisible}>
    <View style={{ marginTop: 24 }}>
      {success? <SuccessSvg /> : <WarningSvg/> }
    </View>
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={{ paddingVertical: 12, width: 190 }}>
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
    <View style={styles.btnContainer}>
      <MainButton nameBtn={buttonText} onPress={handleAction} />
    </View>
  </ModalComponent>
);

export const EasyModalResultsDefaultData = () => ({
  success: true,
  title: "",
  handleAction: () => {},
  isModalVisible: false,
  message: "",
  buttonText: "",
});

export const EasyModalResultsGeneric = ({data}) => {
  return (
    <ModalResultsGeneric
      success={data.success}
      title={data.title}
      handleAction={data.handleAction}
      isModalVisible={data.isModalVisible}
      message={data.message}
      buttonText={data.buttonText}
    />
  );
};

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
