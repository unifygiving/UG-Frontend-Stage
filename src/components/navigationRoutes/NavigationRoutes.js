import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationContainer, { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks/useAuth.js';

import DonorNavRoutes from './DonorRoutes.js';
import RecipientNavRoutes from './RecipientRoutes.js';
import CharityNavRoutes from './CharityRoutes.js';
import OnBoardingRoutes from './OnBoardingRoutes.js';
import BusinessNavRoutes from './BusinessRoutes.js';

import * as Linking from "expo-linking";
import { useEffect } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

//Area Screens
//import CharityApp from '../../areas/charity-screens/CharityIndex.js';

const Stack = createNativeStackNavigator();

export default function NavigationRoutes() {
    const navigation = useNavigation();
    const { t } = useTranslation("navRoutes");
    const auth = useAuth();

    const url = Linking.useURL();

    /* Handle DEEP LINKING */
    useEffect(() => {
        console.log("URL from deeplinking", url);
        if (url) {
            const regex = /transaction\/(\d+)(?:\?(cancel|success)=1$)?/gm;
            if (url.match(regex)) {
                const m = regex.exec(url);
                console.log(`Transaction ID: ${m[1]}, Status: ${m[2]}`);
                if (m[2] === "cancel") {
                    navigation.goBack();
                } else {
                    navigation.navigate("Donor", {
                        screen: "DonationComplete", params: {
                            transactionId: m[1],
                            success: m[2] | m[2] != "cancel",
                        }
                    });
                }
                console.log(`Transaction ID: ${m[1]}, Status: ${m[2]}`);
            }
        }
    }, [url]);

    return (
        <SafeAreaProvider>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {auth.user == null &&
                    <Stack.Screen component={OnBoardingRoutes} name="Onboarding" />
                }
                {auth.user?.role == "donor" &&
                    <Stack.Screen component={DonorNavRoutes} name="Donor" />
                }
                {auth.user?.role == "charity" &&
                    <Stack.Screen component={CharityNavRoutes} name="Charity" />
                }
                {auth.user?.role == "recipient" &&
                    <Stack.Screen component={RecipientNavRoutes} name="Recipient" />
                }
                {auth.user?.role == "business" &&
                    <Stack.Screen component={BusinessNavRoutes} name="Business" />
                }
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}