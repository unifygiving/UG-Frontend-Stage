import React, { useState } from "react";
import { Dimensions, StyleSheet, Platform, View, ScrollView } from "react-native";
import { Text, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

import GPayLogo from '../../../../assets/google-pay-mark_800';
import ApplePayLogo from '../../../../assets/Apple_Pay_Mark_RGB_041619'; //Need to add this for IOS Apple Pay
import MainButton from '../../../components/MainButton.js';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function DonationPayment({ route, navigation })
{
    const { t } = useTranslation("donationPaymentMethod");

    const { key, name, location, dob, avatar, story, amount, occurance } = route.params;
    const [phoneOsType, setPhoneOsType] = useState(Platform.OS);

    const ApplePay = () =>
    {
        return (
            <Card
                style={[
                    styles.paymentContainers,
                    { borderColor: "#6305dc", backgroundColor: "#FFF" },
                ]}
                onPress={() =>
                {
                    // Handle Apple Pay
                }}
            >
                <Card.Content style={styles.paymentOption}>
                    <ApplePayLogo buttonStyle="white" type="plain" cornerRadius={8}
                        width={200}
                        height={45} />
                </Card.Content>
            </Card>
        )
    };

    const GooglePay = () =>
    {
        return (
            <Card
                style={
                    styles.paymentContainers
                }
                onPress={() =>
                {
                    /* Handle GPay */
                }}
            >
                <Card.Content style={styles.paymentOption}>
                    <GPayLogo environment="TEST"
                        buttonColor="white"
                        buttonType="plain"
                        buttonRadius="7"
                        buttonSizeMode="fill"
                        style={{ width: 323, height: 71 }} />
                </Card.Content>
            </Card>
        );
    };

    return (
        <ScrollView style={styles.container} key={key}>
            <Text style={styles.pageTitle}>{t("paymentMethodHeader")}</Text>

            <Card
                style={styles.paymentContainers}
                onPress={() => navigation.navigate("PaymentMethodForm")}
            >
                <Card.Content style={styles.paymentOption}>
                    <Text style={styles.paymentText}>{t("addNewCardHeader")}</Text>
                </Card.Content>
            </Card>

            <Card
                style={styles.paymentContainers}
                onPress={() => navigation.navigate("CardPayment")}
            >
                <Card.Content style={styles.paymentOption}>
                    <Ionicons name="card-outline" size={30} />
                    <Text style={styles.paymentText}>Card ...1234</Text>
                </Card.Content>
            </Card>
            {phoneOsType === 'ios' ? <ApplePay /> : <GooglePay />}

            <View>
                <Text style={styles.agreement}>
                    {t("termsAndConditionsText")}{"\u00A0"}
                    <Text
                        style={styles.link}
                        onPress={() =>
                        {
                            /* Handle terms and conditions link */
                        }}
                    >
                        {t("termsAndConditionsLink")}
                    </Text>
                </Text>
            </View>

            <View>
                <MainButton
                    disabled={false}
                    onPress={() => navigation.navigate('Donation Summary', {
                        key: key,
                        name: name,
                        location: location,
                        dob: dob,
                        avatar: avatar,
                        story: story,
                        amount: amount,
                        occurance: occurance
                    })}
                    nameBtn={t("continueBtnLabel")}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter_700Bold',
    },
    paymentContainers: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#6305dc",
        backgroundColor: "#FFF",
        padding: 3,
        marginVertical: 8,
        alignItems: "center",
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 65
    },
    paymentText: {
        fontFamily: 'Inter_700Bold',
    },
    agreement: {
        marginVertical: 10,
        fontFamily: 'Inter_700Bold',
    },
    link: {
        color: "#6305dc",
    },
});
