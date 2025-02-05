import React, { useState, useEffect, useReducer, } from "react";
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Card, Divider, Text, List } from "react-native-paper";

//Components for styling
import { COLOURS } from "../../components/Colours.js";
import { getValidDate, convertDateToLocaleString } from '../../helpers/functions/util';

//API Hooks
import { selectUser } from "../../store/slices/userSlice";
import { useGetDonationByRecipientIdRTKQuery } from "../../store/slices/donationSlice.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RecipientSupporter({ navigation })
{
    const { t } = useTranslation("recipientSupportersPage");
    const { user } = useSelector(selectUser);
    console.log(user);

    const selectDateReducer = (state, newDate) =>
    {
        if (isValidDate(newDate))
            return new Date(newDate);
        return null;
    }

    const aMonthAgo = () =>
    {
        var today = new Date();
        today.setMonth(today.getMonth() - 1);
        today.setDate(1);
        return today;
    }
    //selected date
    const [selectStartDate, setSelectStartDate] = useReducer(selectDateReducer, aMonthAgo());
    const [selectEndDate, setSelectEndDate] = useReducer(selectDateReducer, new Date());

    const { data: donationsReceived, error, isFetching: donationsIsLoading } = useGetDonationByRecipientIdRTKQuery({
        id: user.id,
        startDate: selectStartDate.toString(),
        endDate: selectEndDate?.toString(),
    });

    console.log("donations", donationsReceived);

    const currency = 'GBP';
    const formatCurrency = (amount, currency) =>
    {
        var FractionDigits = 2;

        //Use the Intl.NumberFormat API for currency formatting
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol',
            minimumFractionDigits: FractionDigits,
            maximumFractionDigits: FractionDigits,
        }).format(amount);

    };

    const renderItem = ({ item, index }) =>
    {
        return (
            // Render your list item here
            <View>
                {renderSubheader(item, index)}
                <View key={index.toString()}>
                    <Card.Title
                        title={`${user.first_name} ${user.last_name}`}
                        subtitle={item.message}
                        left={() => (<Avatar.Image
                            size={50}
                            source={require("../../../assets/DonorHome_images/Frame4041.png")} />)
                        }
                        right={() =>
                            <Text style={{ alignSelf: 'center', paddingHorizontal: 8, fontSize: 14, color: COLOURS.neutral50 }}>{formatCurrency(item.donationAmount, currency)}</Text>
                        }
                        subtitleNumberOfLines={2}
                        titleVariant='titleMedium'
                        subtitleVariant='labelMedium'
                        titleStyle={{ fontFamily: 'Inter_700Bold', color: COLOURS.neutral90 }}
                        subtitleStyle={{ fontFamily: 'Inter_400Regular', color: COLOURS.neutral50 }}
                    />
                </View>
            </View>
        )
    };
    const renderSubheader = (item, index) =>
    {
        // Check if the date has changed from the previous item
        const prevItemDate = index > 0 ? donationsReceived.donations_received[index - 1].created_at : null;

        // Compare with the current item's date
        if (prevItemDate !== item.created_at)
        {
            return <Card.Title
                title={convertDateToLocaleString(item.created_at)}
            />
        }

        // If dates are the same, don't render a new subheader
        return null;
    };
    return (
        <SafeAreaView style={styles.phoneContainer} >
            <Card>
                <FlatList
                    data={donationsReceived?.donations_received}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={() => <View style={{ paddingVertical: 10 }} />}
                />
            </Card>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    phoneContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
});