import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native';
import { Card, TextInput } from "react-native-paper";
//Custom Components for styling
import { COLOURS } from '../../components/Colours.js';
import MainButton from '../../components/MainButton.js';
import BusinessUserImageSvg from '../../components/svgComponents/BusinessUserImageSvg';

export default function BusinessHome({ navigation })
{
    const { t, i18n } = useTranslation("businessHome");
    const { height, width } = useWindowDimensions();
    const [total, setTotal] = React.useState("");
    const [transactionNumber, setTransactionNumber] = React.useState("");
    const [isSaleInfoSet, setIsSaleInfoSet] = React.useState(false);

    const handlePOSTransactionNumber = (tranNumber) =>
    {
        setTransactionNumber(tranNumber);
        setIsSaleInfoSet(true);

        console.log(transactionNumber)
    };

    return (
        <ScrollView style={styles.container}>
           
            <View flexDirection="column" style={styles.ImagesContainer}>
                <View flex={1} style={styles.ImagesContainer.logoContainer} >
                    <Image source={require('../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')}
                        style={styles.ImagesContainer.logoContainer.logo}
                        resizeMode="cover"
                    />
                </View>

                <View flex={1} style={styles.ImagesContainer.image}>{BusinessUserImageSvg()}</View>
            </View>
           

            <Card style={styles.inputCard } mode="outlined">
                <Card.Content>
                    <View>
                    <Card.Title
                        title={t("transactionAmountHeader")}
                        titleVariant="titleMedium"
                        />
                   
                        <TextInput
                            value={total}
                            onChangeText={amt => setTotal(amt)}
                            placeholder={`$0.00`}
                            keyboardType="numeric"
                        />
                    </View>

                    <View>
                        <Card.Title
                            title={t("posTransactionHeader")}
                            titleVariant="titleMedium"
                        />

                        <TextInput
                            value={transactionNumber}
                            onChangeText={handlePOSTransactionNumber}
                            placeholder={"0"}
                            keyboardType="numeric"
                        />
                    </View>
                </Card.Content>
                <Card.Actions>
                    <MainButton
                        disabled={!isSaleInfoSet}
                        onPress={() => navigation.navigate('Camera', {
                            posTranNumber: parseFloat(transactionNumber),
                            posTranTotal: parseFloat(total),
                        })}
                        nameBtn={t("newSaleButtonText")}
                    />
                </Card.Actions>
            </Card>
           
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },

    ImagesContainer: {
        alignItems: "center",
        padding: 10,
        logoContainer: {
            width: 130,
            height: 60,
            padding: 5,
            logo: {
                width: 130,
                height: 60
            },
        },
        image: {
            padding: 5,
            width: 240,
            height: 240,
        },
    },
    

    inputCard: {
        backgroundColor: COLOURS.shades0
    }
});