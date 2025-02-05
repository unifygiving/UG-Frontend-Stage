import React, { useState } from 'react';
import { useWindowDimensions, ScrollView, StyleSheet, View, Linking, } from 'react-native';
import { useTranslation } from 'react-i18next';

import AccountButton from '../../components/AccountButton';

import { COLOURS } from '../../components/Colours';

import AccountSettingsSvg from '../../components/svgComponents/AccountSettingsSvg';
import AccountAboutUGSvg from '../../components/svgComponents/AccountAboutUGSvg';
import AccountTermsCondsSvg from '../../components/svgComponents/AccountTermsCondsSvg';
import AccountHelpSupportSvg from '../../components/svgComponents/AccountHelpSupportSvg';
import AccountContactUsSvg from '../../components/svgComponents/AccountContactUsSvg';
import AccountLogoutSvg from '../../components/svgComponents/AccountLogoutSvg';
import DonorUserContainer from '../../components/DonorUserContainer';
import ModalConfirm from '../../components/ModalConfirm';

import { clearUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

export default AccountIndex = ({ navigation }) => {
    const { t } = useTranslation("accountIndexOptionsPage");
    const { user } = useAuth();

    const dispatch = useDispatch();

    const { height, width } = useWindowDimensions();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleLogout = () => {
        toggleModal();
        dispatch(clearUser());
        navigation.navigate('Home');
    };

    return (
        <ScrollView style={[{ width, height }, { backgroundColor: COLOURS.shades0 }]}>
            <View style={styles.container}>
                <DonorUserContainer
                    user={user}
                />
                <View>
                    {user.role != 'recipient' &&
                        <AccountButton
                            Icon={AccountSettingsSvg}
                            btnName={t("settingsBtnLabel")}
                            onPress={() => navigation.navigate('Settings')}
                            gap={8}
                        />
                    }
                    <AccountButton
                        Icon={AccountAboutUGSvg}
                        btnName={t("aboutUnifyGivingBtnLabel")}
                        onPress={() => navigation.navigate('About')}
                        gap={8}
                    />
                    <AccountButton
                        Icon={AccountTermsCondsSvg}
                        btnName={t("termsAndConditionsBtnLabel")}
                        onPress={() => Linking.openURL("https://unifygiving.com/privacy-policy")}
                        gap={8}
                    />
                    <AccountButton
                        Icon={AccountHelpSupportSvg}
                        btnName={t("helpAndSupportBtnLabel")}
                        onPress={() => Linking.openURL("https://unifygiving.com/contact")}
                        gap={8}
                    />

                    <AccountButton
                        Icon={AccountContactUsSvg}
                        btnName={t("contactUsBtnLabel")}
                        onPress={() => Linking.openURL('mailto:contact@unifygiving.com')}
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
