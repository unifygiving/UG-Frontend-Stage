import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { COLOURS } from '../Colours.js';
import HomeSvg from '../../components/svgComponents/HomeSvg';
import HomeFocusedSvg from '../../components/svgComponents/HomeFocusedSvg';
import UserFocusedSvg from '../../components/svgComponents/UserFocusedSvg';
import UserSvg from '../../components/svgComponents/UserSvg';

import AccountSettingsRoutes from './AccountSettingsRoutes.js';

//Area Screens
import RecipientHome from '../../areas/recipient-screens/RecipientHome.js';
import RecipientSupporter from '../../areas/recipient-screens/RecipientSupporter.js';

const Tab = createBottomTabNavigator();

export default function RecipientNavRoutes()
{
    const navigation = useNavigation();
    const { t } = useTranslation("recipientRoutes");

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 60,
                    backgroundColor: COLOURS.shades0,
                    paddingTop: 6,
                    paddingBottom: 9,
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
                component={RecipientHome}
                options={{
                    headerTitle: t("homePageHeader"),
                    tabBarLabel: t("homePageTabLabel"),
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeFocusedSvg /> : <HomeSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    headerShown: true,
                }}
            />

            <Tab.Screen
                name="Supporters"
                component={RecipientSupporter}
                options={{
                    headerTitle: t("supportersPageHeader"),
                    tabBarLabel: t("supportersTabLabel"),
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeFocusedSvg /> : <HomeSvg />,
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

            <Tab.Screen
                name="Profile"
                component={AccountSettingsRoutes}
                options={{
                    tabBarLabel: t("profileTabLabel"),
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
