import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Text, Button, Card } from 'react-native-paper';
import _ from 'lodash';

import { LoadingAnimation } from "../../../components/LoadingAnimation.js";

import { useGetCharityByIdRTKQuery } from "../../../store/slices/charitySlice.js";

//Components for styling
import { COLOURS } from '../../../components/Colours.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function CharityRecipients({ route, navigation })
{
    const { t } = useTranslation("donorCharityRecipientsPage");

    const { id } = route.params;

    const { data: charity, error, isFetching } = useGetCharityByIdRTKQuery(id);

    if (isFetching)
    {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View>
                    <LoadingAnimation></LoadingAnimation>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.phoneContainer}>
            <Card mode='outlined'>
                <Card.Cover
                    source={{ uri: charity?.picture }}
                    resizeMode='cover'
                    style={styles.coverImage}
                />

                <Avatar.Image
                    size={55}
                    source={{ uri: charity?.picture }}
                    resizeMode='contain'
                    style={styles.charityAvatar}
                />

                <Card.Title
                    title={charity?.name}
                    titleVariant='headlineSmall'
                    titleNumberOfLines={2}
                    style={styles.charityHeaderContainer}
                    titleStyle={styles.charityHeaderContainer.name}
                />

                <Divider bold='true' style={styles.divider} />

                <Card.Content>
                    {
                        charity?.user_recipient.map((recipient, index) => (
                            <View key={index.toString()} flexDirection='row' flex={1} style={styles.recipientItem}>
                                <Card.Title
                                    flex={1}
                                    title={recipient.first_name + " " + recipient.last_name}
                                    subtitle={recipient.location}
                                    left={() => (
                                        <Avatar.Image
                                            size={55}
                                            source={{ uri: recipient.picture }}
                                            resizeMode='contain'
                                        />
                                    )}
                                    titleVariant='titleMedium'
                                    subtitleVariant='labelMedium'
                                    titleStyle={styles.recipientItem.name}
                                    subtitleStyle={styles.recipientItem.location}

                                />

                                <TouchableOpacity
                                    style={styles.btnDonate}
                                    onPress={
                                        () =>
                                            navigation.navigate('DonationHome',
                                                {
                                                    recipientId: recipient.id
                                                }
                                            )
                                    }
                                >
                                    <Text style={styles.btnDonate.donateText}>{t("donateButton")}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    phoneContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },

    coverImage: {
        width: '100%',
        height: 200,
    },

    charityAvatar: {
        position: 'absolute',
        top: 170,
        bottom: 0,
        left: 20,
    },

    charityHeaderContainer: {
        paddingBottom: 5,
        paddingTop: 30,
        name: {
            alignSelf: 'baseline',
            color: COLOURS.shades10,
            fontWeight: 'bold'
        },
    },

    recipientItem: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 12,
        paddingLeft: 10,
        width: '92%',
        height: 60,
        name: {
            paddingLeft: 10,
            top: 6,
            color: COLOURS.shades10,
        },
        location: {
            paddingLeft: 10,
            bottom: 4,
            color: COLOURS.shades10,
        },
    },

    btnDonate: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.primaryMain,
        backgroundColor: COLOURS.primaryMain,
        alignItems: 'center',
        justifyContent: 'center',
        width: 81,
        height: 32,
        donateText: {
            color: COLOURS.shades0,
            padding: 7,
            fontWeight: 'bold',
        },
    },

    divider: {
        color: COLOURS.neutral30,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 12,
    },
});
