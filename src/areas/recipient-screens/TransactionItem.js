import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { convertDateToLocaleAbbreviatedDate, getValidDate } from '../../helpers/functions/util';

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

const localeDateFormatLang = 'en-UK';
const currency = 'GBP';

const PaymentItem = ({ tran }) => {
    return (
        <Card.Title
            title={tran.business?.name ?? "Unknown"}
            subtitle={`${convertDateToLocaleAbbreviatedDate(localeDateFormatLang, getValidDate(tran.created_at))}  ${tran.type}`}
            left={() => <Avatar.Image size={50} source={require("../../../assets/RecipientHome_images/car.png")} key={tran.id} style={styles.transactionContainer.businessAvatar} />}
            right={() => <Text key={tran.id} style={styles.transactionContainer.tranAmount}>{formatCurrency(tran.amount, currency)}</Text>}
            titleVariant='titleMedium'
            subtitleVariant='labelMedium'
            style={styles.transactionContainer}
            titleStyle={styles.transactionContainer.tranTitle}
            subtitleStyle={styles.transactionContainer.tranSubTitle}
        />

    );
};

const DonationReceivedItem = ({ tran }) => {
    return (
        <Card.Title
            title="Donation Received"
            subtitle={`${convertDateToLocaleAbbreviatedDate(localeDateFormatLang, getValidDate(tran.created_at))}  ${tran.type}`}
            left={() => <Avatar.Image size={50} source={require("../../../assets/RecipientHome_images/car.png")} key={tran.id} style={styles.transactionContainer.businessAvatar} />}
            right={() => <Text key={tran.id} style={styles.transactionContainer.tranAmount}>{formatCurrency(tran.amount_donation, currency)}</Text>}
            titleVariant='titleMedium'
            subtitleVariant='labelMedium'
            style={styles.transactionContainer}
            titleStyle={styles.transactionContainer.tranTitle}
            subtitleStyle={styles.transactionContainer.tranSubTitle}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    transactionContainer: {
        tranTitle: {
            paddingTop: 9
        },
        tranSubTitle: {
            paddingBottom: 10,
        },
        businessAvatar: {
            borderRadius: 6,
        },
        tranAmount: {
            paddingTop: 5
        },
    },
});

export { PaymentItem, DonationReceivedItem };