import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

//Components from React-Native-Paper
import { Provider as PaperProvider, Button, Card, List } from "react-native-paper";

import DropDown from "react-native-paper-dropdown";

//Components for styling
import { COLOURS } from "../../components/Colours.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ImpactNewUser({ navigation })
{
    const [selectedCountry, setSelectedCountry] = useState("UK");
    const [showDropDown, setShowDropDown] = useState(false);

    const countries = [
        { label: "United Kingdom", value: "UK" },
        { label: "Portugal", value: "Portugal" },
        { label: "Germany", value: "Germany" },
        { label: "France", value: "France" },
    ];

    return (
        <PaperProvider>
            <View style={styles.phoneContainer}>
                <ScrollView>
                    <View flexDirection="column" flex={7}>
                        <View flex={0.2} style={styles.numContainer}>
                            <Text>0</Text>
                            <Text>£0</Text>
                        </View>
                        <View flex={0.2} style={styles.numContainer}>
                            <Text>People helped</Text>
                            <Text>Total donated</Text>
                        </View>
                        <View flex={0.7} style={styles.dropdownContainer}>
                            <Text>Select Country</Text>
                            <DropDown
                                mode="outlined"
                                value={selectedCountry}
                                setValue={setSelectedCountry}
                                list={countries}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                            />
                        </View>
                        <View flex={0.9}>
                            <Card mode="flat">
                                <Card.Cover
                                    source={require("../../../assets/Impact_images/Vector1337.png")}
                                    style={{ height: 286, width: 202, alignSelf: "center" }}
                                />
                            </Card>
                        </View>
                        <View flex={0.1}>
                            <Card mode="elevated" style={{ margin: 15, marginBottom: 5 }}>
                                <Card.Title
                                    title="Contributed this month"
                                    left={() => <List.Icon icon="heart-outline" color="#6200ee" />}
                                    onPress={() =>
                                    {
                                        // Handle Settings click
                                    }}
                                />
                            </Card>
                            <Card mode="elevated" style={{ margin: 15, marginTop: 0 }}>
                                <Card.Title
                                    title="Recurring Donations"
                                    left={() => <List.Icon icon="refresh" color="#6200ee" />}
                                />
                            </Card>
                        </View>
                        <View flex={1}>
                            <Card mode="flat">
                                <Card.Cover
                                    source={require("../../../assets/DonorHome_images/Frame4242.png")}
                                />
                            </Card>
                        </View>
                        <View flex={0.6} style={{ margin: 15, marginBottom: 0 }}>
                            <Text style={{ margin: 20, fontSize: 14, color: "#564A67" }}>
                                Your donation can bring hope and change to the lives of homeless
                                individuals, providing them with shelter, food and support on
                                their path to a brighter future.
                            </Text>
                        </View>
                        <View flex={0.5}>
                            <Button
                                style={{
                                    backgroundColor: COLOURS.primaryMain,
                                    margin: 10,
                                    borderRadius: 5,
                                    padding: 10,
                                }}
                                labelStyle={{ color: "white" }}
                                onPress={() =>
                                {
                                    navigation.navigate("ImpactNewUser");
                                }}
                            >
                                Donate Now
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    phoneContainer: {
        height: height,
        width: width,
        backgroundColor: "#fff",
    },

    numContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },

    dropdownContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 200,
        marginLeft: 100,
        paddingTop: 15,
    },
});
