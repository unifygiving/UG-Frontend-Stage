import React, { useState, useEffect, useReducer, } from "react";
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';
import { Avatar, Card, Text, Button } from "react-native-paper";
import { useSelector, useDispatch } from 'react-redux';
import { set } from 'lodash';
import { useAuth } from "../../hooks/useAuth.js";

//Custom Resources
import { COLOURS } from "../../components/Colours.js";
import { getValidDate, convertDateToLocaleAbbreviatedDate } from '../../helpers/functions/util';

//API
import { selectUser } from "../../store/slices/userSlice";
import { useGetCombinedDonationsAndTransactionsByRecipientIdRTKQuery } from "../../store/slices/recipientSlice.js";
import { ClickableQRCode } from "./ClickableQRCode.js";

import { DonationReceivedItem, PaymentItem } from "./TransactionItem.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const tasksReducer = (selectedFilter, action) => {
    switch (action.type) {
        case 'changed': {
            return action.filter;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const formatCurrency = (amount, currency) => {
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

const currency = 'GBP';
const localeDateFormatLang = 'en-UK';

export default function RecipientHome({ navigation }) {
    const { t } = useTranslation("recipientHomePage");
    const { user } = useAuth();

    console.log(user);

    const selectDateReducer = (state, newDate) => {
        if (isValidDate(newDate))
            return new Date(newDate);
        return null;
    }

    const aMonthAgo = () => {
        var today = new Date();
        today.setMonth(today.getMonth() - 1);
        today.setDate(1);
        return today;
    }
    //selected date
    const [selectStartDate, setSelectStartDate] = useReducer(selectDateReducer, aMonthAgo());
    const [selectEndDate, setSelectEndDate] = useReducer(selectDateReducer, new Date());
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [filters, setFilters] = useState([{ date: "All", year: "All" }]);
    const [selectedFilter, dispatch] = React.useReducer(
        tasksReducer,
        'All'
    );

    //API Data Request
    const {
        data: transactions,
        refetch,
        isLoading,
        isFetching,
    } = useGetCombinedDonationsAndTransactionsByRecipientIdRTKQuery({
        id: user.id,
        startDate: selectStartDate.toString(),
        endDate: selectEndDate?.toString(),
    });

    useEffect(() => {
        if (!isLoading && !isFetching && transactions?.length > 0) {
            //Get dates for the filters
            transactions?.map(tran => {
                const date = getValidDate(tran.created_at);
                const AddFilter = () => {
                    setFilters([...filters, {
                        date: convertDateToLocaleAbbreviatedDate(localeDateFormatLang, date, true),
                        year: date.getFullYear(),
                    }])
                }
                //Check if filters has only the default All
                if (filters.length === 1) {
                    AddFilter();
                }
                else {
                    //Filter has more options check if the transaction data already exists in the filters.
                    const isDuplicateDate = filters
                        .find(t => t.date === convertDateToLocaleAbbreviatedDate(localeDateFormatLang, date, true) && t.year === date.getFullYear());

                    //If date exist in filters do nothing, otherwise add the date to the filters array
                    if (!isDuplicateDate) AddFilter();
                }
            });
        } else { setFilters([{ date: "All", year: "All" }]); }
    }, [isLoading, isFetching, transactions]);

    console.log("selectedFilter", selectedFilter);

    const handleChangeTask = (filter) => {
        dispatch(
            // "action" object:
            {
                type: 'changed',
                filter: filter
            });
    };

    //Function to refresh the page and populate the Transaction list
    const handleRefresh = () => {
        //setFilters([{ date: "All", year: "All" }]);
        //setFilters([...filters, { date: "JAn", year: "2024" }]);
        refetch();
    };

    return (
        <ScrollView
            style={styles.phoneContainer}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={() => handleRefresh()}
                />
            }
            nestedScrollEnabled
        >
            <View flexDirection="column" flex={1} >
                <View flex={0.9}>
                    {/*Image with Logo and Balance*/}
                    <Card mode="contained" style={styles.creditCardContainer} >
                        <Card.Cover
                            source={require("../../../assets/RecipientHome_images/Card1.png")}
                            resizeMode='cover'
                            style={styles.creditCardContainer.creditCardImage}
                        />
                        <View style={styles.creditCardContainer.logoOverlay}>
                            <Image
                                source={require('../../../assets/logo/New_Logo/Main_Logo_Horizontal.png')}
                                style={{ width: 130, height: 60 }}
                            />
                        </View>
                        <Card.Content>
                            <View style={styles.creditCardContainer.numberOverlay} flex={0.1}>
                                <Card.Title
                                    title={t("balanceLabel")}
                                    subtitle={formatCurrency(user.balance, currency)}
                                    right={() =>
                                        <Text style={styles.creditCardContainer.numberOverlay.header}>**** 1234</Text>
                                    }
                                    rightStyle={styles.creditCardContainer.numberOverlay.cardDigits}
                                    titleStyle={styles.creditCardContainer.numberOverlay.header}
                                    titleVariant='titleSmall'
                                    subtitleStyle={styles.creditCardContainer.numberOverlay.amount}
                                    subtitleVariant='displayMedium'

                                />
                            </View>
                        </Card.Content>
                        {/* Filter buttons by Month and Year*/}
                    </Card>
                </View>
                <View style={styles.qrcodeContainer}>
                    <ClickableQRCode
                    />
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    nestedScrollEnabled
                >

                    {filters && filters.map((filterDate, index) => {
                        const dateString = filterDate.date === "All" ? "All" : `${filterDate.date} ${filterDate.year}`;
                        console.log("filterdate", filterDate);
                        const isSelected = (selectedFilter.date === filterDate.date && selectedFilter.year === filterDate.year);
                        return (
                            <Button
                                key={index.toString()}
                                onPress={() => {
                                    handleChangeTask(filterDate)
                                    handleRefresh(true, filterDate);
                                }}
                                style={styles.defaultBtn}
                                contentStyle={isSelected ? styles.selectedButton : styles.unSelectedButton}
                                labelStyle={isSelected ? styles.selectedButton.selectedButtonText : styles.unSelectedButton.unSelectedButtonText}
                                mode={isSelected ? "outlined" : "text"}
                                theme={{ roundness: 2 }}
                            >
                                {dateString}
                            </Button>
                        )
                    })
                    }

                </ScrollView>
                {/*All Transactions*/}
                <Card mode="contained" flex={0.2} contentStyle={{ left: -10 }} style={{ backgroundColor: COLOURS.shades0 }}>

                    <Card.Title
                        title={t("transactionsLabel")}
                        titleStyle={{
                            fontSize: 20,
                            color: "#1E1729",
                            fontWeight: "bold",
                            padding: 10,
                        }}
                    />

                    <Card.Content>
                        {isLoading ? (
                            <ActivityIndicator />
                        ) : transactions && transactions.map((tran, index) => (
                            <View key={index.toString()}>
                                {tran.type === "income" ? (<DonationReceivedItem tran={tran} />) : (<PaymentItem tran={tran} />)}
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    qrcodeContainer: {
        flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10,
    },
    phoneContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },



    creditCardContainer: {
        alignItems: 'center',
        height: 260,
        backgroundColor: COLOURS.shades0,
        creditCardImage: {
            width: 360,
            height: 292,
            backgroundColor: COLOURS.shades0,
        },
        logoOverlay: {
            position: "absolute",
            top: 40,
            left: 20,
            right: 0,
            bottom: 0,
        },
        numberOverlay: {
            position: "absolute",
            bottom: 87,
            left: 20,
            right: 0,
            amount: {
                color: COLOURS.shades0
            },
            header: {
                fontSize: 14,
                color: COLOURS.shades0,
            },
            cardDigits: {
                marginRight: 45,
                top: 15
            },
        },
    },

    defaultBtn: {
        width: 91,
        height: 36,
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        borderColor: COLOURS.primaryMain,
        backgroundColor: COLOURS.neutral10,
    },

    selectedButton: {       
        selectedButtonText: {
            width: '100%',
            marginTop: 8,
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOURS.primary,
        },
    },

    unSelectedButton: {
        backgroundColor: COLOURS.shades0,
        unSelectedButtonText: {
            width: '100%',
            marginTop: 8,
            fontSize: 16,
            color: COLOURS.neutral50,
        },
    },


});
