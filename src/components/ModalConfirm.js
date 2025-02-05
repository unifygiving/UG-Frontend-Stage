import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLOURS } from './Colours';

import WarningSvg from '../components/svgComponents/WarningSvg';
import ModalComponent from './ModalComponent';

const ModalConfirm = ({
    handleAction,
    isModalVisible,
    toggleModal,
    deleteModal = false,
    logoutModal = false,
}) =>
{
    const { t } = useTranslation("confirmationModal");

    return (
        <ModalComponent isModalVisible={isModalVisible}>
            <WarningSvg />
            <View style={{ marginVertical: 16 }}>
                {deleteModal && (
                    <Text style={styles.textConfirm}>{t("confirmAccountDeletionHeader")}</Text>
                )}
                {logoutModal && <Text style={styles.textConfirm}>{t("logoutConfirmHeader")}</Text>}
            </View>
            <View style={{ marginBottom: 16 }}>
                {deleteModal && (
                    <Text style={styles.text}>
                        {t("confirmAccountDeleteMessage")}
                    </Text>
                )}
                {logoutModal && (
                    <Text style={styles.text}>{t("logoutConfirmMessage")}</Text>
                )}
            </View>
            <View style={styles.btnContainer}>
                <View style={styles.boxShadow}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={toggleModal}
                    >
                        <Text style={styles.btnText}>{t("cancelBtnLabel")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.boxShadow, { marginLeft: 16 }]}>
                    <TouchableOpacity
                        style={btnLogout}
                        activeOpacity={0.7}
                        onPress={handleAction}
                    >
                        {deleteModal && <Text style={btnTextLogout}>{t("deleteBtnLabel")}</Text>}
                        {logoutModal && <Text style={btnTextLogout}>{t("logOutBtnLabel")}</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </ModalComponent>
    )
};

const styles = StyleSheet.create({
    textConfirm: {
        color: COLOURS.customText,

        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        lineHeight: 20,
    },
    text: {
        color: COLOURS.neutral60,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxShadow: {
        borderBottomStartRadius: 6,
        borderBottomEndRadius: 6,
        borderTopStartRadius: 9,
        borderTopEndRadius: 7,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 6,

        borderColor: 'rgba(0, 0, 0, 0.03)',
    },

    button: {
        alignItems: 'center',

        width: 140,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 6,

        borderColor: COLOURS.borderBtnCancel,
        backgroundColor: COLOURS.shades0,
    },
    btnLogout: {
        borderWidth: 0,

        backgroundColor: COLOURS.errorColour,
    },

    btnText: {
        color: COLOURS.errorColour,

        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        lineHeight: 20,
    },
    btnTextLogout: {
        color: COLOURS.shades0,
    },
});
const btnLogout = StyleSheet.compose(styles.button, styles.btnLogout);
const btnTextLogout = StyleSheet.compose(styles.btnText, styles.btnTextLogout);
export default ModalConfirm;
