import React, { useState } from 'react';
import { useWindowDimensions, ScrollView, StyleSheet, View, } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLOURS } from '../../components/Colours';

import DonorUserContainer from '../../components/DonorUserContainer';
import BackButton from '../../components/BackButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import AccountButton from '../../components/AccountButton';
import AccountNotificationsSvg from '../../components/svgComponents/AccountNotificationsSvg';
import AccountDonationsSvg from '../../components/svgComponents/AccountDonationsSvg';
import AccountHideSvg from '../../components/svgComponents/AccountHideSvg';
import MainButton from '../../components/MainButton';
import ModalSuccess from '../../components/ModalSuccess';

export default AccountPrivacy = ({ navigation }) =>
{
    const { t } = useTranslation("privacySettings");

    const { height, width } = useWindowDimensions();
    const [isModalVisible, setModalVisible] = useState(false);

    const handleOnNotifications = () =>
    {
        console.log('ON');
    };
    const handleOffNotifications = () =>
    {
        console.log('OFF');
    };
    const handleOnDonations = () =>
    {
        console.log('ON');
    };
    const handleOffDonations = () =>
    {
        console.log('OFF');
    };

    const onSubmit = () =>
    {
        toggleModal();
    };

    const toggleModal = () =>
    {
        setModalVisible(!isModalVisible);
    };

    const handleSuccess = () =>
    {
        toggleModal();
        setTimeout(() =>
        {
            navigation.navigate('Home');
        }, 1000);
    };

    return (
        <>
            <ScrollView
                style={{
                    width,
                    height,
                    backgroundColor: COLOURS.shades0,
                }}
            >
                {/* <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={COLOURS.primaryMain}
      /> */}
                <View style={[styles.container]}>
                    {/* <BackButton onPress={() => navigation.navigate('Settings')} />*/}
                    <DonorUserContainer />
                    <View style={{ marginBottom: 24 }}>
                        <AccountButton
                            Icon={AccountNotificationsSvg}
                            btnName={t("notificationBtnLabel")}
                            privacySwitch={true}
                            onPressOn={handleOnNotifications}
                            onPressOff={handleOffNotifications}
                            gap={8}
                        />

                        <AccountButton
                            Icon={AccountDonationsSvg}
                            btnName={t("anonymousDonationsBtnLabel")}
                            privacySwitch={true}
                            onPressOn={handleOnDonations}
                            onPressOff={handleOffDonations}
                            gap={8}
                        />
                        <AccountButton
                            Icon={AccountHideSvg}
                            btnName={t("hidePhotoBtnLabel")}
                            privacySwitch={true}
                            onPressOn={handleOnDonations}
                            onPressOff={handleOffDonations}
                            gap={8}
                        />

                        <AccountButton
                            Icon={AccountHideSvg}
                            btnName={t("hideLocationBtnLabel")}
                            privacySwitch={true}
                            onPressOn={handleOnDonations}
                            onPressOff={handleOffDonations}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.mainBtnWrapper}>
                <MainButton nameBtn={t("saveBtnLabel")} onPress={onSubmit} />
            </View>
            <ModalSuccess
                isModalVisible={isModalVisible}
                changePrivacySuccessModal={true}
                handleAction={handleSuccess}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        position: 'relative',

        paddingHorizontal: 20,
    },
    mainBtnWrapper: {
        paddingBottom: 40,
        paddingHorizontal: 20,

        backgroundColor: COLOURS.shades0,
    },
});