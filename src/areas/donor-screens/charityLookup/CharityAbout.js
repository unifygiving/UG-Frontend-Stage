import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, Linking, ScrollView, StyleSheet, View, Image } from "react-native";
import { Avatar, Card, Divider, Text } from "react-native-paper";
import { useTranslation } from 'react-i18next';

import { getCharityById as apiGetById } from "../../../services/charity/index.js";
import { useGetCharityByIdRTKQuery } from "../../../store/slices/charitySlice.js";

//Components for styling
import { COLOURS } from "../../../components/Colours.js";
import { LoadingAnimation } from "../../../components/LoadingAnimation.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// import MapView from "react-native-maps";
// import { Marker } from 'react-native-maps';

export default function CharityAbout({ route, navigation }) {
    const { id } = route.params;

    const { data: charity, error, isFetching } = useGetCharityByIdRTKQuery(id);

    // const [charityLocation, setCharityLocation] = useState({
    //     latitude: 51.47227,
    //     longitude: -0.14946
    // });

    // const [region, setRegion] = useState({
    //     ...charityLocation,
    //     latitudeDelta: 0.05,
    //     longitudeDelta: 0.05,
    // });

    // console.log(region, charityLocation);

    // if (isFetching) {
    // }

    return (
        <>
            {isFetching ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View>
                        <LoadingAnimation></LoadingAnimation>
                    </View>
                </View>
            ) : (
                <ScrollView style={styles.phoneContainer}>
                    <Card mode="outlined">
                        <Card.Cover
                            source={{ uri: charity?.picture }}
                            resizeMode='cover'
                            style={styles.coverImage}
                        />

                        <Avatar.Image
                            size={50}
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
                            <View>
                                <Text>
                                    {charity?.description}
                                </Text>
                            </View>

                            <Card.Title
                                title='Website'
                                subtitle={
                                    <Text
                                        onPress={() => {
                                            Linking.openURL(charity?.social_link);
                                        }}
                                        style={styles.contextContainers.website}
                                    >
                                        {charity?.social_link}
                                    </Text>}
                                titleVariant='titleLarge'
                                subtitleVariant='labelMedium'
                                style={styles.contextContainers}
                            />

                            <View>
                                <Card.Title
                                    title='Address'
                                    subtitle={charity?.address + " " + charity?.city}
                                    titleVariant='titleLarge'
                                    subtitleVariant='labelMedium'
                                    style={styles.contextContainers}
                                />

                            </View>
                            
{/*  Not working for now, for production need registration in Google and Apple                           
                            <MapView style={styles.map}
                                initialRegion={region}
                                scrollEnabled={true}
                            >
                                <Marker
                                    key={0}
                                    coordinate={charityLocation}
                                    title={charity?.name}
                                    description={charity?.address}
                                >
                                </Marker>
                            </MapView> */}
                        </Card.Content>
                    </Card>
                </ScrollView>
            )}
        </>
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

    divider: {
        color: COLOURS.neutral30,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 12,
    },

    contextContainers: {
        alignItems: 'center',
        right: 15,
        color: COLOURS.shades10,
        fontWeight: 'bold',
        website: {
            color: 'blue',
            textDecorationLine: 'underline',
        },
    },
    map: {
        width: "100%",
        minHeight: Dimensions.get("screen").height / 3,
        marginBottom: 10,
    },
});
