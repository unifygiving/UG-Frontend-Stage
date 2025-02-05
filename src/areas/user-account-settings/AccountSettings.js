import React, { useState } from 'react';
import { useWindowDimensions, ScrollView, StyleSheet, View, } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLOURS } from '../../components/Colours';

import AccountEditSvg from '../../components/svgComponents/AccountEditSvg';
import AccountPrivacySvg from '../../components/svgComponents/AccountPrivacySvg';
import AccountPasswordSvg from '../../components/svgComponents/AccountPasswordSvg';
import AccountLogoutSvg from '../../components/svgComponents/AccountLogoutSvg';
import DonorUserContainer from '../../components/DonorUserContainer';
import AccountButton from '../../components/AccountButton';
import BackButton from '../../components/BackButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import ModalConfirm from '../../components/ModalConfirm';

import { useAuth } from '../../hooks/useAuth';

export default AccountSettings = ({ navigation }) =>
{
    const { t } = useTranslation("accountSettingsPage");
    const { user } = useAuth();


    const { height, width } = useWindowDimensions();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () =>
    {
        setModalVisible(!isModalVisible);
    };
    const handleLogout = () =>
    {
        toggleModal();

        setTimeout(() =>
        {
            navigation.navigate('Home');
        }, 1000);
    };

    return (
        <ScrollView style={[{ width, height }, { backgroundColor: COLOURS.shades0 }]}>
            {/* <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={COLOURS.primaryMain}
      /> */}
            <View style={styles.container}>
                <DonorUserContainer 
                    user={user}
                />
                <View>
                    <AccountButton
                        Icon={AccountEditSvg}
                        btnName={t("editAccountBtnLabel")}
                        onPress={() => navigation.navigate('Edit Account')}
                        gap={8}
                    />
                    {/* <AccountButton
                        Icon={AccountPrivacySvg}
                        btnName={t("privacyBtnLabel")}
                        onPress={() => navigation.navigate('Privacy')}
                        gap={8}
                    /> */}
                    <AccountButton
                        Icon={AccountPasswordSvg}
                        btnName={t("changePasswordBtnLabel")}
                        onPress={() => navigation.navigate('Change Password')}
                        gap={8}
                    />

                    <AccountButton
                        Icon={AccountPasswordSvg}
                        btnName={t("deleteAccountBtnLabel")}
                        onPress={() => navigation.navigate('Delete Account')}
                    />
                </View>
                <View style={[styles.lineContainer, { width: width }]}>
                    <View style={styles.line} />
                </View>
                <AccountButton
                    Icon={AccountLogoutSvg}
                    btnName={t("logOutBtnLabel")}
                    onPress={toggleModal}
                />
            </View>
            <ModalConfirm
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                logoutModal={true}
                handleAction={handleLogout}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

        position: 'relative',

        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    lineContainer: {
        flexDirection: 'row',

        marginVertical: 12,
    },
    line: {
        flex: 1,

        height: 1,

        backgroundColor: COLOURS.neutral30,
    },
});