import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from "react-native";
import { useTranslation } from 'react-i18next';

import AccountSettingsRoutes from './AccountSettingsRoutes.js';
import ImpactDonorRoutes from './ImpactDonorRoutes.js';

import { COLOURS } from '../Colours.js';

//Area Screens
import DonorHome from '../../areas/donor-screens/DonorHome.js';
import DonationRecipientsList from '../../areas/donor-screens/donations/DonationRecipientsList.js';
import DonationPage from '../../areas/donor-screens/donations/DonationPage.js';
import DonationPayment from '../../areas/donor-screens/donations/DonationPaymentMethod.js';
import DonationReview from '../../areas/donor-screens/donations/DonationReview.js';
import DonationHistory from '../../areas/donor-screens/donations/DonationHistory.js';
import CharityList from '../../areas/donor-screens/charityLookup/CharityList.js';
import CharityLookupRoutes from '../../areas/donor-screens/charityLookup/CharityLookupRoutes.js';
import QRcodeScanner from '../../areas/donor-screens/QRcodeScanner.js';
import PaymentMethodForm from '../../areas/donor-screens/donations/PaymentMethodForm.js';
import HowItWorks from '../../areas/donor-screens/HowItWorks.js';
import CheckoutScreen from '../../areas/donor-screens/stripePayment/Checkout.js';
import { DonationComplete } from '../../areas/donor-screens/donations/DonationComplete.js';

//DO NOT DELETE - May need later
//import ImpactNewUser from '../../areas/donor-screens/ImpactNewUser.js';
//import ImpactExistingUser from '../../areas/donor-screens/ImpactExistingUser.js';
//import Impact from '../../areas/donor-screens/Impact.js';

import UserFocusedSvg from '../../components/svgComponents/UserFocusedSvg';
import UserSvg from '../../components/svgComponents/UserSvg';
import HomeSvg from '../../components/svgComponents/HomeSvg';
import HomeFocusedSvg from '../../components/svgComponents/HomeFocusedSvg';
import ImpactFocusedSvg from '../../components/svgComponents/ImpactFocusedSvg';
import ImpactSvg from '../../components/svgComponents/ImpactSvg';
import DonationSvg from '../../components/svgComponents/DonationSvg';
import MyDonationSvg from '../../components/svgComponents/MyDonationSvg';
import MyDonationFocusedSvg from '../../components/svgComponents/MyDonationFocusedSvg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function DonorNavRoutes() {
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
            {/* Bottom Tabs Order for Showing: Home, Impact, Donate, My Donations, Account */}
            {/* Home Screen for Donor User */}
            <Tab.Screen
                name="Home"
                component={DonorHome}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeFocusedSvg /> : <HomeSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    tabBarLabel: t("donorHomeBottomTabLabel"),
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

            {/* Impact Screen for Donor User */}
            <Tab.Screen
                name="Impact"
                component={ImpactDonorRoutes}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? <ImpactFocusedSvg /> : <ImpactSvg />,
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    tabBarLabel: t("impactBottomTabLabel"),
                }}
            />

            {/* DonationHome - Show Recipient List for Donor User */}
            <Tab.Screen
                name="Donation"
                component={DonationRecipientsList}
                options={{
                    tabBarIcon: () => <DonationSvg />,
                    tabBarLabel: t("donationStartBottomTabLabel"),
                    tabBarIconStyle: { position: 'absolute', top: 2 },
                    tabBarLabelStyle: {
                        color: COLOURS.placeholderColour,

                        fontFamily: 'Inter_700Bold',
                        fontSize: 11,
                        lineHeight: 12,
                    },
                    headerTitle: t("donationStartBottomTabLabel"),
                    //headerLeft: () => (
                    //    <HeaderBackButton
                    //        style={{ marginLeft: 0 }}
                    //        onPress={() => navigation.goBack()}
                    //    />
                    //),
                }}
            />

            {/* Donation History Screen for Donor User */}
            <Tab.Screen
                name="My Donation"
                component={DonationHistory}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? <MyDonationFocusedSvg /> : <MyDonationSvg />,
                    tabBarLabel: t("donationHistoryBottomTabLabel"),
                    tabBarActiveTintColor: COLOURS.customText,
                    tabBarInactiveTintColor: COLOURS.placeholderColour,
                    headerTitle: t("donationHistoryPageHeader"),
                }}
            />

            {/* Account Settings Screen for Donor User */}
            <Tab.Screen
                name="Donor Account"
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

            {/* END BOTTOM TABS ORDER */}

            {/* Donation Page Screen for Donor User */}
            <Tab.Screen
                name="DonationHome"
                component={DonationPage}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("donationHomePageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    tabBarStyle: { display: 'none' }
                }}
            />

            {/* Donation First Initial Payment Method Screen for Donor User */}
            <Tab.Screen
                name="PaymentMethod"
                component={DonationPayment}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("initalPaymentMethodPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    tabBarStyle: { display: 'none' }
                }}
            />

            {/* Donation Review/Receipt Screen for Donor User */}
            <Tab.Screen
                name="Donation Summary"
                component={DonationReview}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("donationSummaryPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    tabBarStyle: { display: 'none' }
                }}
            />

            {/* Charity List Screen for Donor User */}
            <Tab.Screen
                name="ListOfCharities"
                component={CharityList}
                options={{
                    unmountOnBlur: true,
                    tabBarButton: () => null,
                    headerTitle: t("listOfCharitiesPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
            />

            {/* Charity About Screens for Donor User */}
            <Tab.Screen
                name="AboutCharity"
                component={CharityLookupRoutes}
                options={{
                    tabBarButton: () => null,
                    headerTitle: 'Charity',
                    unmountOnBlur: true,
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="PaymentMethodForm"
                component={PaymentMethodForm}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("addCardDetailsPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    tabBarStyle: { display: 'none' }
                }}
            />


            {/* QR Code Scanner to bring up Phone camera in Recipient List screen */}
            <Tab.Screen
                name="QR code Scanner"
                component={QRcodeScanner}
                options={{
                    tabBarButton: () => null,
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
            />

            {/* How It Works Slides screen */}
            <Tab.Screen
                name="HowItWorks"
                component={HowItWorks}
                options={{
                    tabBarButton: () => null,
                    headerTitle: t("howItWorksPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
            />

            {/* Stripe Payments screen */}
            <Tab.Screen
                name="checkout"
                component={CheckoutScreen}
                options={{
                    tabBarButton: () => null,
                    headerTitle: "Checkout",
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="DonationComplete"
                component={DonationComplete}
                options={{
                    tabBarButton: () => null,
                    headerTitle: "Donation Complete",
                }}
            />

            {/* DO NOT DELETE - Maybe need to user later */}

            {/*<Tab.Screen*/}
            {/*    name="ImpactExistingUser"*/}
            {/*    component={ImpactExistingUser}*/}
            {/*    options={{*/}
            {/*        tabBarButton: () => null,*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<Tab.Screen*/}
            {/*    name="ImpactNewUser"*/}
            {/*    component={ImpactNewUser}*/}
            {/*    options={{*/}
            {/*        tabBarButton: () => null,*/}
            {/*    }}*/}
            {/*/>*/}
        </Tab.Navigator>
    );
}