import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Button, Checkbox, Icon, Divider } from 'react-native-paper';

import { COLOURS } from './Colours';

export default MoneyAmountButtons = ({
    pageSource,
    disabled = false,
    onPress,
    selected
}) =>
{
    const currency = 'GBP';

    const formatCurrency = (amount, currency) =>
    {
        var FractionDigits = pageSource === "donations" ? 0 : 2;

        //Use the Intl.NumberFormat API for currency formatting
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol',
            minimumFractionDigits: FractionDigits,
            maximumFractionDigits: FractionDigits,
        }).format(amount);

    };

    const RenderDonationBtns = () =>
    {
        const donationAmounts = [
            { value: 5, text: "Five" },
            { value: 10, text: "Ten" },
            { value: 15, text: "Fifteen" },
            { value: 20, text: "Twenty" },
            { value: 25, text: "Twenty-Five" },
            { value: 30, text: "Thirty" }
        ];

        return (
            <View flexDirection="column" style={{ width: '100%' }}>
                <View flexDirection="row" style={styles.donationContainer}>
                    {donationAmounts?.slice(0, 3).map((option) =>
                    (
                        <View key={option.value} flex={1} style={styles.donationBtns}>
                            <Button
                                mode="outlined"
                                onPress={() => onPress(option.value, option.text)}
                                style={selected === option.text ? styles.selectedBtn : styles.unSelectedBtns}
                                theme={{ roundness: 2 }}
                                labelStyle={selected === option.text ? styles.selectedBtn.text : styles.unSelectedBtns.text}
                            >
                                {formatCurrency(option.value, currency)}
                            </Button>
                        </View>
                    )
                    )}
                </View>

                <View flexDirection="row" style={styles.donationContainer}>
                    {donationAmounts?.slice(3, 6).map((option) =>
                    (
                        <View key={option.value} flex={1} style={styles.donationBtns}>
                            <Button
                                key={option.value}
                                mode="outlined"
                                onPress={() => onPress(option.value, option.text)}
                                style={selected === option.text ? styles.selectedBtn : styles.unSelectedBtns}
                                theme={{ roundness: 2 }}
                                labelStyle={selected === option.text ? styles.selectedBtn.text : styles.unSelectedBtns.text}
                            >
                                {formatCurrency(option.value, currency)}
                            </Button>
                        </View>
                    )
                    )}
                </View>

            </View>
        )
    };

    const RenderSupportBtns = () =>
    {
        const supportTipsAmounts = [
            { value: 0.00, percentage: 0 },
            { value: 0.50, percentage: 5 },
            { value: 1.00, percentage: 10 },
            { value: 2.00, percentage: 20 },
        ];
        console.log("supportVal = ", selected);
       
        return (
            <View flexDirection="column" style={{ width: '100%' }}>
                <View flexDirection="row" style={styles.supportContainer}>
                    {supportTipsAmounts?.map((option) =>
                    (
                        <View key={option.value} flex={1} style={styles.supportBtns}>
                            <TouchableOpacity
                                accessibilityRole='button'
                                onPress={() => onPress(option.value)}
                                style={selected === option.value ? styles.selectedSupportBtn : styles.unSelectedSupportBtns}
                            >
                                <Text style={selected === option.value ? styles.selectedSupportBtn.text : styles.unSelectedSupportBtns.text}>
                                    {option.percentage} %
                                    {'\n'}
                                    {formatCurrency(option.value, currency)}
                                </Text>

                            </TouchableOpacity>
                        </View>
                    )
                    )}
                </View>
            </View>
        )
    };

    return (
        <View>
            {pageSource === "donations" ?
                <RenderDonationBtns />
                : <RenderSupportBtns />
            }
        </View>
    );
};

const styles = StyleSheet.create({

    donationContainer: {
        // width: '100%',
    },

    donationBtns: {
        alignItems: "flex-start",
        padding: 5,
    },

    selectedBtn: {
        borderColor: COLOURS.primaryMain,
        backgroundColor: COLOURS.neutral20,
        width: '100%',
        text: {
            fontSize: 14,
            color: COLOURS.primaryMain
        },
    },

    unSelectedBtns: {
        borderColor: COLOURS.neutral40,
        width: '100%',
        text: {
            fontSize: 14,
            color: COLOURS.neutral60
        }
    },

    selectedSupportBtn: {
        backgroundColor: COLOURS.primaryMain,
        height: 52,
        alignItems: "center",
        justifyContent: "center",

        text: {
            fontSize: 14,
            color: COLOURS.shades0,
            textAlign: "center",
            fontWeight: "bold"
        },
    },

    unSelectedSupportBtns: {
        backgroundColor: COLOURS.shades0,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        text: {
            fontSize: 14,
            color: COLOURS.primaryMain,
            textAlign: "center",
            fontWeight: "bold"
        }
    },

    supportContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
    },

    supportBtns: {
        height: 52,
        width: 70,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLOURS.primaryBorder,
        overflow: 'hidden',
        marginRight: 5
    },

});