import * as React from "react";

import { useTranslation } from "react-i18next";

import { StyleSheet, RefreshControl } from "react-native";
import { Image } from "react-native-elements";
import { Button, FlatList, ScrollView, View, SafeAreaView, StatusBar } from "react-native";
import { Avatar, IconButton, Divider, Text, List } from "react-native-paper";
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-ui-datepicker';
import { getRecievedDonations } from "../../../services/donation";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { useGetDonationByDonorIdRTKQuery } from "../../../store/slices/donationSlice.js";
import moment from "moment/moment.js";

import { COLOURS } from '../../../components/Colours.js';

import { getValidDate, isValidDate } from "../../../helpers/functions/util.js";
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function DonationHistory({ navigation }) {
    const { t } = useTranslation("donationHistory")
    const { user } = useSelector(selectUser);

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
    const [selectStartDate, setSelectStartDate] = React.useReducer(selectDateReducer, aMonthAgo());
    const [selectEndDate, setSelectEndDate] = React.useReducer(selectDateReducer, new Date());
    const arrDateHeaders = [];

    console.log(`start date: ${selectStartDate}, end date: ${selectEndDate}`)
    const { data: donations, refetch, isFetching } = useGetDonationByDonorIdRTKQuery(
        { id: user.id, startDate: selectStartDate.toISOString(), endDate: selectEndDate.toISOString() });
    console.log("data ", donations?.user?.donations_given);

    //show setting for datepicker
    const [show, setShow] = React.useState(false);

    const renderDate = (date) =>
    {
        const validDate = getValidDate(date, new Date());
        if (isValidDate(validDate))
            return validDate.toLocaleDateString();
        return null;
    };

    const onDateChange = ({ startDate, endDate }) => {

        setSelectStartDate(startDate);
        setSelectEndDate(endDate);

        if (endDate)
        {
            setShow(false);
        }
           
    };

    const currency = 'GBP';
    const formatCurrency = (amount, currency) =>
    {
        //Use the Intl.NumberFormat API for currency formatting
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);

    };

    const renderSubheader = (item, allDonations, index) =>
    {

        const date = getValidDate(item.created_at, new Date()).toLocaleDateString();

        // Check if the date header already exists
        const headerIndex = arrDateHeaders.indexOf(date);

        if (headerIndex === -1)
        {
            //Header doesn't exist - Create new header
            arrDateHeaders.push(date);

            //Render new header
            return <List.Subheader style={styles.dateHeaders}>{date}</List.Subheader>;
        }
        else
        {
            //Header exists - Don't create new header
            return null;
        }
    };

    return (
        <ScrollView style={styles.phoneContainer}
            refreshControl={
                <RefreshControl
                    refreshing={isFetching}
                    onRefresh={() => refetch() && setShow(false)}
                />
            }
        >
            <SafeAreaView style={styles.safeContainer}>
                <View flexDirection='row'>
                    <IconButton
                        icon="calendar"
                        size={30}
                        onPress={() => setShow(true)}
                        style={styles.btnCalendarIcon}
                    />
                    <Text style={styles.calendarDatesSelected}>
                        {renderDate(selectStartDate)} to {renderDate(selectEndDate)}
                    </Text>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        startDate={selectStartDate}
                        endDate={selectEndDate}
                        mode='range'
                        onChange={onDateChange}
                    />
                )}
                <View>
                    {donations && donations?.user?.donations_given?.map((item, index) => (
                        <View id={index.toString()} key={index.toString()}>
                            {renderSubheader(item, index)}
                            <List.Item
                                id={item.id.toString()}
                                title={item.recipient.first_name + " " + item.recipient.last_name}
                                description={item.message}
                                descriptionStyle={styles.listItem.description}
                                descriptionNumberOfLines={3}
                                titleStyle={styles.listItem.title}
                                left={props => (
                                    <List.Icon
                                        {...props}
                                        icon={() => (
                                            <Avatar.Image
                                                size={68}
                                                source={{ uri: item?.recipient?.picture }}
                                                resizeMode="contain"
                                            />
                                        )}
                                    />
                                )}
                                right={() => (<Text style={styles.listItem.rightContent}> {formatCurrency(item.amount_donation, currency)}</Text>)}
                            />
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    phoneContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOURS.shades0
    },

    safeContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    btnCalendarIcon: {
        width: 50,
        height: 30,
        bottom: 12,
    },

    calendarDatesSelected: {
        fontSize: 16
    },

    dateHeaders: {
        fontSize: 17,
        fontWeight: "bold",
    },

    listItem: {
        description: {
            color: COLOURS.neutral50,
            fontSize: 12
        },
        rightContent: {
            alignSelf: 'center',
            paddingLeft: 5,
            fontSize: 14,
            color: COLOURS.neutral60
        },
        title: {
            color: COLOURS.neutral90,
            fontSize: 16,
            fontWeight: 'bold',
        },
    },
});