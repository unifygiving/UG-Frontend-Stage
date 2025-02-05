import * as React from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

//Components for styling
import { COLOURS } from "../../components/Colours.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const paymentCardOptions = [
    { label: "Visa card icon with information", value: "card1" },
    { label: "Credit card icon with information", value: "card2" },
    { label: "Add new Card placeholder ", value: "card3" },

    // Add more payment card options as needed
];

export default function ProfilePayment({ navigation })
{
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardChange = (value) =>
    {
        setSelectedCard(value);
    };

    return (
        <View style={styles.phoneContainer}>
            <View flexDirection="column" flex={7}>
                <View flex={0.1} style={{ borderWidth: 1 }}>
                    <Text>Card transfer header placeholder</Text>
                </View>
                <View flex={0.1} style={{ borderWidth: 1 }}>
                    <Text>Recipient header placeholder</Text>
                    <Text>Recipient picture and name placeholder</Text>
                </View>
                <View flex={0.3} style={{ borderWidth: 1 }}>
                    <Text>Transfer detail header placeholder</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text>__________________________________________________</Text>
                    <Text>Total cost placeholder</Text>
                </View>
                <View flex={0.1} style={{ borderWidth: 1 }}>
                    <Text>Write message header place holder</Text>
                    <Text>Text area placeholder to write msg</Text>
                </View>
                <View flex={0.1} style={{ borderWidth: 1 }}>
                    <Text>Select card header place holder</Text>
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={selectedCard}
                            onValueChange={handleCardChange}
                        >
                            {paymentCardOptions.map((option) => (
                                <Picker.Item
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    style={styles.dropdown}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View flex={0.2} style={{ borderWidth: 1 }}>
                    <Text>Donate button place holder</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    phoneContainer: {
        height: height,
        width: width,
    },
    Picker: {
        marginVertical: 1,
        paddingHorizontal: 2,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        width: 375,
        marginLeft: 5,
        height: 45,
    },
    dropdown: {
        height: 5,
        width: "100%",
        color: "black",
    },
});
