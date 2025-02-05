import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Image } from "react-native";
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';

//Colour guide for styling
import { COLOURS } from '../Colours.js';

//Charity Screens
import CharityRecipientList from "../../areas/charity-screens/CharityRecipientList.js";
import ReviewNewRecipient from "../../areas/charity-screens/ReviewNewRecipient.js";
import CharityRecipientProfileSetup from "../../areas/charity-screens/CharityRecipientProfileSetup.js";
import AccountSettingsRoutes from './AccountSettingsRoutes.js'; //User Account Settings Screens

//Custom Components
import UserFocusedSvg from '../../components/svgComponents/UserFocusedSvg';
import UserSvg from '../../components/svgComponents/UserSvg';
import HomeSvg from '../../components/svgComponents/HomeSvg';
import HomeFocusedSvg from '../../components/svgComponents/HomeFocusedSvg';
import MyDonationSvg from '../../components/svgComponents/MyDonationSvg';
import MyDonationFocusedSvg from '../../components/svgComponents/MyDonationFocusedSvg';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function CharityNavRoutes()
{
    const navigation = useNavigation();
    const { t } = useTranslation("charityRoutes");
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    height: 60 + insets.bottom,
                    backgroundColor: COLOURS.shades0,
                    paddingTop: 6,
                    paddingBottom: insets.bottom,
                    borderTopColor: COLOURS.neutral30,
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Inter_700Bold',
                    fontSize: 11,
                    lineHeight: 12,
                },
            }}
            backBehavior="history"
        >

            {/* Home Screen - List of Recipients */}
            <Tab.Screen
                name="Home"
                component={CharityRecipientList}
                options={{
                    tabBarLabel: t("charityRecipientsHomeBottomTabLabel"),
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeFocusedSvg /> : <HomeSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    headerTitle: '',
                    headerLeft: () => (
                        <Image
                            source={require("../../../assets/logo/New_Logo/Main_Logo_Horizontal.png")}
                            style={{ width: 92, height: 32, left: 10, }}
                        />
                    ),
                    //headerRight: () => (
                    //    <Image
                    //        source={require("../../../assets/DonorHome_images/notification.png")}
                    //        style={{ width: 24, height: 24, right: 10 }}
                    //    />
                    //),
                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },
                }}
            />

            {/* Add New Recipient */}
            <Tab.Screen
                name="AddRecipient"
                component={CharityRecipientProfileSetup}
                options={{
                    tabBarLabel: t("addRecipientBottomTabLabel"),
                    tabBarIcon: ({ focused }) =>
                        focused ? <MyDonationFocusedSvg /> : <MyDonationSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    headerTitle: t("addRecipientPageHeader"),
                    unmountOnBlur: true,
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e)=>{
                        e.preventDefault();
                        console.log("NAVI");
                        navigation.navigate('AddRecipient', {key: uuid.v4(), navSource: 'Add', resetForm: true});
                    }
                })}
                initialParams={{ key: uuid.v4(), navSource: 'Add', resetForm: true }}
            />

            {/* Review New Recipient Profile before saving */}
            <Tab.Screen
                name="ReviewNewRecipient"
                component={ReviewNewRecipient}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("reviewNewRecipientPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('AddRecipient', {resetForm: false, navSource: 'Review'})}
                        />
                    ),
                    unmountOnBlur: true,
                }}

            />

            {/* Edit Existing Recipient */}
            <Tab.Screen
                name="EditRecipientProfile"
                component={CharityRecipientProfileSetup}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("editRecipientPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() =>
                                navigation.navigate('Home')
                            }
                        />
                    ),
                    unmountOnBlur: true
                }}
            />

            {/* Charity User Account Settings Screens */}
            <Tab.Screen
                name="AccountSettings"
                component={AccountSettingsRoutes}
                options={{
                    tabBarLabel: t("charityProfileBottomTabLabel"),
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) =>
                        focused ? <UserFocusedSvg /> : <UserSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
