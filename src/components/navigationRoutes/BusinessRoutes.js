import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from "react-native";
import { useTranslation } from 'react-i18next';
import { COLOURS } from '../Colours.js';

import AccountSettingsRoutes from './AccountSettingsRoutes.js';
import BusinessHome from '../../areas/business-screens/BusinessHome.js';
import CameraFunction from '../../areas/business-screens/CameraFunction.js';
import Transaction from "../../areas/business-screens/Transaction.js";

import HomeSvg from '../../components/svgComponents/HomeSvg';
import HomeFocusedSvg from '../../components/svgComponents/HomeFocusedSvg';
import UserSvg from '../../components/svgComponents/UserSvg';
import UserFocusedSvg from '../../components/svgComponents/UserFocusedSvg';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BusinessNavRoutes()
{
    const navigation = useNavigation();
    const { t } = useTranslation("donorUserRoutes");
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
            <Tab.Screen
                name="Home"
                component={BusinessHome}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeFocusedSvg /> : <HomeSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    tabBarLabel: t("donorHomeBottomTabLabel"),
                    headerShown: false 
                }}
            />

            {/* Account Settings Screen for Donor User */}
            <Tab.Screen
                name="Business Account"
                component={AccountSettingsRoutes}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) =>
                        focused ? <UserFocusedSvg /> : <UserSvg />,
                    tabBarLabel: t("donorProfileBottomTabLabel"),
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                }}
            />

            <Tab.Screen
                name="Camera"
                component={CameraFunction}
                options={{
                    tabBarButton: () => null,
                    headerTitle: '',
                    headerLeft: () => (
                        <Image
                            source={require('../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')}
                            style={{ width: 106, height: 28, left: 10, }}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },
                    unmountOnBlur: true
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Transaction}
                options={{
                    tabBarButton: () => null,
                    headerTitle: 'Confirm Transaction',
                    headerLeft: () => (
                        <Image
                            source={require('../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')}
                            style={{ width: 106, height: 28, left: 10, }}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },
                    unmountOnBlur: true
                }}/>
        </Tab.Navigator>
    )
};

