import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Share, Alert } from "react-native";
import { COLOURS } from "../../../components/Colours";
import { Card, IconButton } from "react-native-paper";
import { View, Text } from "react-native";
import VariantSofaDonateSvg from '../../../components/svgComponents/VariantSofaDonate';
import { useTranslation } from "react-i18next";
import MainButton from '../../../components/MainButton';

export const DonationComplete = ({ route }) => {
    const {params} = route;
    const navigation = useNavigation();

    React.useEffect(()=>{
        console.log("PARAMS", params);
    }, [params])

    const { t } = useTranslation("donationCompletePage");

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
            <Card>
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
                                navigation.navigate("Home");
                            }}
                            nameBtn={t("homeBtnLabel")}
                            style={{ elevation: 0 }}
                        />
                    </View>
                </Card.Actions>
            </Card>
        </View>
    )
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