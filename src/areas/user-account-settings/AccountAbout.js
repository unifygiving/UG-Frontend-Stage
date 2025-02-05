import React from 'react';
import { Image, useWindowDimensions, ScrollView, StyleSheet, View, Text, } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLOURS } from '../../components/Colours';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import VariantTapSvg from '../../components/svgComponents/VariantTap';

export default AccountAbout = ({ navigation }) =>
{
    const { t } = useTranslation("aboutUnifyPage");

    const { height, width } = useWindowDimensions();
    return (
        <ScrollView style={[{ width, height }, styles.container]}>
            {/* <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLOURS.shades0}
      /> */}
            <View style={{ alignItems: 'center' }}>
                <View flex={1} style={{ width: 130, height: 60, padding: 5, alignItems: "center" }} >
                    <Image source={require('../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')}
                        style={{ width: 130, height: 60 }}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.text}>
                    {t("aboutText1")}
                </Text>
                <Text style={styles.text}>
                    {t("aboutText2")}
                </Text>
                <Text style={styles.text}>
                    {t("aboutText3")}
                </Text>
                <Text style={styles.title}>{t("transparancyText")}</Text>
                <VariantTapSvg />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
        paddingHorizontal: 10,
        backgroundColor: COLOURS.shades0,
    },
    text: {
        marginVertical: 16,
        color: COLOURS.neutral90,
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        lineHeight: 25,
        textAlign: "left"
    },
    title: {
        marginBottom: 16,
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
        fontSize: 26,
        lineHeight: 31,
        textAlign: 'center',
    },
});