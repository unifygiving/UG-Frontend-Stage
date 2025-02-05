import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Image, ImageBackground, Share, StyleSheet, ScrollView, TouchableOpacity, View, Platform } from "react-native";
import { Avatar, Button, Card, Divider, IconButton, List, Text, TextInput, Surface } from "react-native-paper";
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useSafeAreaInsets } from "react-native-safe-area-context";

//Components for styling
import { COLOURS } from "../../../components/Colours.js";
import MainButton from '../../../components/MainButton.js';
import MoneyAmountButtons from '../../../components/MoneyAmountButtons.js';
import CheckoutScreen from '../stripePayment/Checkout.js';
import VariantSofaDonateSvg from '../../../components/svgComponents/VariantSofaDonate';
import { WebCheckout } from "../stripePayment/WebCheckout.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DonationReviewSchema = Yup.object().shape({
    customTip: Yup.number().typeError("Amount must be a number").positive("Amount must be greater than zero")
})

export default function DonationReview({ route, navigation }) {
    const { t } = useTranslation("donationReviewPage");
    const insets = useSafeAreaInsets();
    const currency = 'GBP';

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [supportTipAmount, setSupportTipAmount] = React.useState(0.00);
    const [text, setText] = useState("");
    const { key, name, location, dob, avatar, story, amount, occurance, anonymous, charityId } = route.params;
    const [hasDefaultPaymentMethod, setHasDefaultPaymentMethod] = React.useState(true);
    const [isAnonymous, setIsAnonymous] = React.useState(anonymous);
    const [isCheckoutReady, setIsCheckoutReady] = React.useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(DonationReviewSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const LeftContent = () => (
        <Avatar.Image
            size={64}
            source={{ uri: avatar }}
        />
    );

    const ShareOptions = [
        {
            iconName: 'facebook',
        },
        {
            iconName: 'instagram',
        },
        {
            iconName: 'whatsapp',
        },
        {
            iconName: 'share-variant-outline',
        },

    ];

    const formatCurrency = (amount, currency) => {
        //Use the Intl.NumberFormat API for currency formatting
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol',
        }).format(amount);
    };

    const calcTotalDonationForCharge = () => {
        const donationWithFees = parseFloat(amount) + parseFloat(amount * 0.07);
        const totalWithStripeFee = parseFloat(donationWithFees) + parseFloat(0.23);

        const val = (totalWithStripeFee + supportTipAmount).toFixed(2);
        console.log('Total Donation for Charge', val);
        return val;
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: t("shareLabel"),
                message: t("shareMessage"),

            });
            console.log('shareResult', result);
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type: ' + result.activityType);
                } else {
                    console.log('Share completed without activity type.');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed.');
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView key={key}>
                <Card mode="outlined" style={styles.summaryCard}>
                    <Card.Title
                        title={t("recipientLabel")}
                        titleStyle={styles.summaryCard.summaryHeaders}
                    />
                    <Card.Title
                        title={name}
                        left={LeftContent}
                        titleStyle={styles.recipientInfo}
                        leftStyle={styles.recipientInfo.rImg}
                    />

                    <Divider bold="true" style={styles.divider} />

                    <Card.Title
                        title={t("transferFeesLabel")}
                        titleStyle={styles.summaryCard.summaryHeaders}
                    />

                    <Card.Content style={styles.feesContainer}>

                        <List.Section>
                            <List.Item
                                title={t("fees1Label")}
                                right={() => <Text style={styles.feesContainer.feeItems.itemAmount}>{formatCurrency(amount, currency)}</Text>}
                                titleStyle={styles.feesContainer.feeItems.itemText}
                                style={styles.feesContainer.feeItems}
                            />

                            <List.Item
                                title={t("fees2Label")}
                                right={() => <Text style={styles.feesContainer.feeItems.itemAmount}>{formatCurrency((amount * .07), currency)}</Text>}
                                titleStyle={styles.feesContainer.feeItems.itemText}
                                style={styles.feesContainer.feeItems}
                            />

                            <List.Item
                                title={t("fees3Label")}
                                right={() => <Text style={styles.feesContainer.feeItems.itemAmount}>{formatCurrency(0.23, currency)}</Text>}
                                titleStyle={styles.feesContainer.feeItems.itemText}
                                style={styles.feesContainer.feeItems}
                            />
                        </List.Section>
                        <Divider bold="true" style={styles.divider} />
                        <View style={styles.summaryTotalCostContainer}>
                            <Text style={styles.summaryTotalCostContainer.totalHeader}>{t("totalCostLabel")}</Text>
                            <Text style={styles.summaryTotalCostContainer.totalAmount}>{formatCurrency(calcTotalDonationForCharge(), currency)}</Text>
                        </View>
                    </Card.Content>
                </Card>

                <Card mode="flat">
                    <Card.Title
                        title={t("writeMessageLabel")}
                        titleStyle={styles.customMsgHeader}
                    />

                    <Card.Content>
                        <TextInput
                            editable
                            mode="outlined"
                            label={t("writeMessage_ToolTip")}
                            value={text}
                            onChangeText={(text) => setText(text)}
                            multiline={true}
                            numberOfLines={3}
                            rows={3}
                            textColor="#766889"
                            style={styles.messageAndPaymentCard.msgInputText}
                        />
                    </Card.Content>
                </Card>

                <Card mode="flat">
                    <Card.Title
                        title={t("supportHeaderLabel")}
                        titleStyle={styles.customMsgHeader}
                    />

                    <Card.Content>
                        <Text style={styles.supportText}>{t("supportText")}</Text>
                    </Card.Content>
                </Card>

                <Card mode='flat'>
                    <Card.Title
                        title={t("addSupportLabel")}
                        titleStyle={styles.customMsgHeader}
                    />

                    <Card.Content>
                        <MoneyAmountButtons
                            pageSource="donation summary"
                            onPress={(amt) => {
                                setSupportTipAmount(amt);
                                setIsCheckoutReady(true);
                            }}
                            selected={supportTipAmount}
                        />

                        <Controller
                            control={control}
                            name='customTip'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    editable
                                    mode='outlined'
                                    placeholder={t("customAmount_ToolTip")}
                                    numberOfLines={1}
                                    maxLength={10}
                                    inputMode='decimal'
                                    keyboardType='numeric'
                                    value={value}
                                    onChangeText={(value) => {
                                        onChange(value);
                                        setSupportTipAmount(value);
                                        setIsCheckoutReady(true);
                                    }}
                                    style={styles.inputText}
                                    outlineColor={COLOURS.neutral40}
                                />
                            )}

                        />
                        <Text>
                            {errors.customTip && errors.customTip.message}
                        </Text>
                    </Card.Content>
                </Card>

                {/*Might need Post-MVP if we want to send payment methods to stripe.*/}
                {/*<Card mode="flat">*/}
                {/*    <Card.Title title={t("selectCardHeader")} titleStyle={styles.customMsgHeader} />*/}

                {/*    <Card.Content>*/}
                {/*        <Button*/}
                {/*            mode='outlined'*/}
                {/*            icon="credit-card"*/}
                {/*            onPress={() =>*/}
                {/*            {*/}
                {/*                hasDefaultPaymentMethod ? Alert.alert('Need to show the premade payment modal from Stripe if default payment method already set') :*/}
                {/*                    navigation.navigate('PaymentMethod', {*/}
                {/*                        key: key,*/}
                {/*                        name: name,*/}
                {/*                        location: location,*/}
                {/*                        dob: dob,*/}
                {/*                        avatar: avatar,*/}
                {/*                        story: story,*/}
                {/*                        amount: amount,*/}
                {/*                        occurance: occurance*/}
                {/*                    });*/}
                {/*            }}*/}
                {/*            style={styles.paymentButton}*/}
                {/*            theme={{ roundness: 0 }}*/}
                {/*        >*/}
                {/*            <Text>Debit --- 7025 expiring 04/2028</Text>*/}
                {/*        </Button>*/}
                {/*    </Card.Content>*/}
                {/*</Card>*/}

                <Surface>
                    <Modal
                        isVisible={isModalVisible}
                        //onDismiss={toggleModal}
                        contentContainerStyle={styles.successModal}
                    >
                        <Card>
                            {/*<IconButton*/}
                            {/*    icon="close"*/}
                            {/*    iconColor="#766889"*/}
                            {/*    size={24}*/}
                            {/*    onPress={toggleModal}*/}
                            {/*    style={styles.successModal.btnClose}*/}
                            {/*/>*/}

                            <Text style={styles.successModal.modalImg} >
                                {VariantSofaDonateSvg()}
                            </Text>

                            <Card.Title
                                title={t("donationSuccessfulHeader")}
                                titleStyle={styles.successModal.txtTitle}
                            />

                            <Card.Content>
                                <Text style={styles.successModal.txtMessage}>
                                    {t("donationSuccessMessage")}
                                </Text>
                            </Card.Content>

                            <Card.Actions style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", padding: 10 }}>
                                    {ShareOptions.map((option, index) => (
                                        <IconButton
                                            key={index.toString()}
                                            icon={option.iconName}
                                            iconColor="#000000"
                                            size={24}
                                            onPress={() => onShare()}
                                        />
                                    ))}
                                </View>

                                <View style={styles.successModal.btnShare}>
                                    <MainButton
                                        disabled={false}
                                        onPress={() => {
                                            toggleModal();
                                            navigation.navigate("Home");
                                        }}
                                        nameBtn={t("homeBtnLabel")}
                                        style={{ elevation: 0 }}
                                    />
                                </View>
                            </Card.Actions>
                        </Card>
                    </Modal>
                </Surface>
            </ScrollView>

            <View style={[styles.modalToggler, { paddingBottom: insets.bottom }]} >
                <Card.Content>
                    {Platform.OS === 'ios' ?
                        <WebCheckout
                            recipientId={key}
                            checkoutAmount={calcTotalDonationForCharge()}
                            nameBtn={t("donateBtnLabel")}
                            toggleModal={toggleModal}
                            message={text}
                            charityId={charityId}
                        />
                        :
                        <CheckoutScreen
                            recipientId={key}
                            checkoutAmount={calcTotalDonationForCharge()}
                            nameBtn={t("donateBtnLabel")}
                            toggleModal={toggleModal}
                            message={text}
                            charityId={charityId}
                        />
                    }
                </Card.Content>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 100,
        backgroundColor: COLOURS.shades0,
    },
    divider: {
        color: COLOURS.neutral30,
        width: "90%",
        alignSelf: "center",
    },
    pageScroll: {
        backgroundColor: COLOURS.shades0,
        height: height,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    summaryCard: {
        fontFamily: "Inter_400Regular",
        summaryHeaders: {
            color: COLOURS.neutral90,
            fontFamily: "Inter_700Bold",
            fontSize: 14,
            paddingTop: 10,
            alignSelf: 'flex-start',
        },
    },
    recipientInfo: {
        paddingLeft: 12,
        color: COLOURS.neutral90,
        fontSize: 14,
        fontStyle: "normal",
        rImg: {
            marginTop: 8,
            alignSelf: 'baseline',
        },
    },
    feesContainer: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        fontFamily: "Inter_400Regular",
        marginTop: -12,
        feeItems: {
            paddingVertical: 0,
            flexDirection: 'row',
            itemText: {
                paddingVertical: 0,
                fontSize: 12,
            },
            itemAmount: {
                textAlign: 'right',
                fontSize: 12,
            },
        },
    },
    summaryTotalCostContainer: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingTop: 10,
        alignContent: 'flex-start',
        height: 30,
        totalHeader: {
            flex: 0.5,
            fontFamily: "Inter_700Bold",
            fontSize: 14,
        },
        totalAmount: {
            flex: 0.5,
            left: 5,
            paddingRight: 10,
            textAlign: 'right',
            fontFamily: "Inter_700Bold",
            fontSize: 14,
        },
    },
    messageAndPaymentCard: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        flexShrink: 1,
        msgInputText: {
            fontFamily: "Inter_400Regular",
            fonstSize: 14,
            marginTop: -10,
        },
    },
    paymentButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
    },
    customMsgHeader: {
        fontFamily: "Inter_700Bold",
        color: COLOURS.neutral90,
        fontSize: 16,
    },
    supportText: {
        fontFamily: "Inter_400Regular",
        fonstSize: 12,
        marginTop: -10,
    },
    tipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        backgroundColor: COLOURS.shades0,
    },
    supportTipsButtons: {
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        width: 60,

        txt: {
            textAlign: 'center'
        },
        selected: {
            borderColor: COLOURS.primaryMain,
            backgroundColor: COLOURS.primaryMain,
            txt: {
                color: COLOURS.shades0,
            },
        },
        notSelected: {
            borderColor: COLOURS.primaryBorder,
            backgroundColor: COLOURS.shades0,
            txt: {
                color: COLOURS.primaryMain,
            }
        },
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        height: 44,
    },
    modalToggler: {
        position: 'absolute',
        bottom: 0,
        width: '106%',
        paddingHorizontal: 5,
        paddingBottom: 5,
        backgroundColor: COLOURS.shades0,
    },
    successModal: {
        justifyContent: "center",
        alignItems: "center",
        btnClose: {
            alignSelf: "flex-end",
        },
        modalImg: {
            alignSelf: 'center',
            width: 240,
            height: 240,
        },
        cover: {
            width: 148,
            height: 148,
            alignSelf: "center",

            borderRadius: 70,
            backgroundColor: COLOURS.shades0,
            circles: {
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                width: 148,
                height: 148,
            },
            recipImg: {
                left: 3.5,
            }
        },
        btnShare: {
            width: "90%",
            elevation: 0,
            paddingBottom: 15
        },
        txtTitle: {
            textAlign: 'center',
            fontSize: 24,
            fontWeight: "bold",
            color: COLOURS.primaryMain,
        },
        txtMessage: {
            textAlign: "center",
            fontSize: 16
        },
    },
});
