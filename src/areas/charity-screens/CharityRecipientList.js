import * as React from "react";
import { Dimensions, FlatList, Image, LogBox, SafeAreaView, ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { Avatar, Divider, Text, Button, Card } from "react-native-paper";
import { useSelector, useDispatch } from 'react-redux'; //redux
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import { COLOURS } from "../../components/Colours.js"; //colour styling guide
import { fetchCharities, useGetCharityByIdRTKQuery } from "../../store/slices/charitySlice.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CharityRecipientList({ navigation })
{
    const { t } = useTranslation("charityUserRecipientUsersList");

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const { data: charity,
        error: charityError,
        isFetching: charityIsLoading,
        refetch,
    } = useGetCharityByIdRTKQuery(user.charity_id_admin);

    console.log(user);

    //Render each row with recipient's info provided by API
    const RecipientCard = ({ item, index, navigation }) =>
    {
        return (           
            <Card.Title
                key={index.toString()}
                title={item?.first_name + " " + item?.last_name}
                subtitle={item?.city + ", " + item?.country}
                left={() => (
                    <Avatar.Image
                        size={68}
                        source={{ uri: item?.picture }}
                        resizeMode='contain'
                    />
                )}
                right={() =>
                    <Button
                        onPress={
                            () =>
                                navigation.navigate('EditRecipientProfile',
                                    {
                                        recipient: item,
                                        navSource: 'Edit',
                                    }
                                )
                        }
                    >
                        {t("editProfileBtnLabel")}
                    </Button>
                }

                titleVariant='titleMedium'
                subtitleVariant='labelMedium'
                style={styles.recipientContainer}
                titleStyle={styles.recipientContainer.recipientTitle}
                subtitleStyle={styles.recipientContainer.recipientSubTitle}
            />
        )
    };

    return (
        <ScrollView style={styles.phoneContainer}
            refreshControl={
                <RefreshControl
                    refreshing={charityIsLoading}
                    onRefresh={() => refetch()}
                />
            }>
            <Card
                mode="contained"
                style={styles.mainContainer}
            >
                <Card.Title
                    title={t('userGreetingLabel', { name: user?.firstName })}
                    subtitle={t('userGreetingText')}
                    subtitleNumberOfLines={2}
                    titleVariant='headlineMedium'
                    subtitleVariant='labelLarge'
                    titleStyle={styles.header}
                    subtitleStyle={styles.mainContainer.subtitle}
                />
            </Card>

            <Card
                mode="contained"
                style={styles.mainContainer}
            >
                <Card.Title
                    title={t("recipientsHeader")}
                    titleVariant='headlineSmall'
                    titleStyle={styles.header}
                />
                <Card.Content>
                    {charity?.user_recipient?.map((recipient, index) => (
                        <View key={index.toString()}>
                            <RecipientCard item={recipient} index={index} navigation={navigation} />
                        </View>
                    ))}
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    phoneContainer: {
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },

    mainContainer: {
        backgroundColor: COLOURS.shades0,
        marginBottom: 10,
        padding: 5,
        shadowColor: 'transparent', // This removes shadow for iOS
        elevation: 0, // This removes shadow for Android
        subtitle: {
            fontFamily: "Inter_400Regular",
            color: COLOURS.neutral60,
        },
    },

    header: {
        fontFamily: "Inter_400Regular",
        fontWeight: "bold",
        color: COLOURS.neutral90,
    },

    recipientContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 15,
        width: "110%",
        recipientTitle: {
            alignSelf: 'flex-start',
            marginLeft: 17
        },
        recipientSubTitle: {
            alignSelf: 'flex-start',
            marginLeft: 17
        },
    },
});
