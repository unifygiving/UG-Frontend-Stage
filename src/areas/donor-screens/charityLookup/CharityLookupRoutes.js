import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';

//Donor User - Charity Lookup Screens
import CharityAbout from './CharityAbout.js';
import CharityRecipients from './CharityRecipients.js';

const CharityTopTabs = createMaterialTopTabNavigator();

export default CharityLookupRoutes = ({ route, navigation }) =>
{
    const { id } = route.params;
    const { t } = useTranslation("charityLookupRoutes")

    return (
        <CharityTopTabs.Navigator initialRouteName="About">
            <CharityTopTabs.Screen
                name="About"
                component={CharityAbout}
                initialParams={{ id: id }}
                options={{
                    tabBarLabel: t("aboutTitle"),
                    unmountOnBlur: true,
                }}
            />
            <CharityTopTabs.Screen
                name="Recipients"
                component={CharityRecipients}
                initialParams={{ id: id }}
                options={{
                    tabBarLabel: t("recipientsTitle"),
                    unmountOnBlur: true,
                }}
            />
        </CharityTopTabs.Navigator>
    );
}
