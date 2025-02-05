import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View, Dimensions, RefreshControl, ScrollView } from "react-native";

import { Avatar, Button, Card, Searchbar } from "react-native-paper";

//Components for styling
import { COLOURS } from "../../../components/Colours.js";
import { useLazySearchCharityByNameRTKQuery } from "../../../store/slices/charitySlice.js";


const phoneWidth = Dimensions.get("window").width;
const phoneHeight = Dimensions.get("window").height;

export default function CharityList({ navigation })
{
    const { t } = useTranslation("charityList");

    const [searchQuery, setSearchQuery] = React.useState('');
    const [trigger, result] = useLazySearchCharityByNameRTKQuery();
    const { data: charities, isFetching, isError } = result;

    React.useEffect(() =>
    {
        trigger("");
    }, [])

    //Function to refresh the page and create the receipient component again from modal's Apply button click
    const handleRefresh = (query = searchQuery) =>
    {
        trigger(query);
    };

    return (
        <ScrollView
            style={styles.phoneContainer} refreshControl={
                <RefreshControl
                    refreshing={isFetching}
                    onRefresh={() => handleRefresh()}
                />
            }>
            <Card mode="contained" style={{ marginBottom: 10, width: "100%", backgroundColor: COLOURS.shades0} }>
                <Card.Title
                    title={t("messageLabel")}
                    titleVariant='titleMedium'
                    titleNumberOfLines={2}
                />
            </Card>
            <Searchbar
                placeholder={t("searchBar_ToolTip")}
                onChangeText={input => { setSearchQuery(input); handleRefresh(input); }}
                value={searchQuery}
                mode='bar'
                icon='magnify'
                style={styles.searchBar}
                onIconPress={() => handleRefresh()}
                onClearIconPress={() => { setSearchQuery(''); handleRefresh("") }}
            />

            <View style={styles.listContainer}>
                {charities?.map((charity, index) => (
                    <View key={index.toString()} style={styles.charityRow}>
                        <Avatar.Image size={72} source={{ uri: charity.picture }} />
                        <Text style={styles.charityText}>{charity.name}</Text>
                        <Button
                            mode="contained"
                            onPress={() =>
                            {
/*                                 navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: 'Recipients',
                                    },
                                    {
                                        name: 'About'
                                    }
                                    ],
                                });
 */                                navigation.navigate('AboutCharity', {
                                    screen: 'About',
                                    id: charity.id,
                                });
                            }}
                            style={styles.btnVisit}
                        >
                            {t("visitBtnLabel")}
                        </Button>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    phoneContainer: {
        flex: 1,
        width: phoneWidth,
        height: phoneHeight,
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },
    searchBar: {
        fontFamily: 'Inter_400Regular',
        color: COLOURS.neutral50,
        fontSize: 14,
        width: "100%",
    },
    listContainer: {
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    charityRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    charityText: {
        flex: 2.5,
        paddingLeft: 5,
        color: COLOURS.customText,
    },

    btnVisit: {
        flex: 0.5,
        borderRadius: 10,
        color: COLOURS.shades0,
        backgroundColor: COLOURS.primaryMain,
        width: 63,
        height: 40,
        marginLeft: 3,

    },
});
