import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';
import { COLOURS } from './Colours';

const ModalComponent = ({ children, isModalVisible }) =>
{
    return (
        <Modal
            isVisible={isModalVisible}
            animationIn="zoomIn"
            animationInTiming={1000}
            animationOut="zoomOut"
            animationOutTiming={1000}
            backdropOpacity={0.5}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
        >
            <View style={styles.modal}>{children}</View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 6,

        backgroundColor: COLOURS.shades0,
    },
});
export default ModalComponent;
