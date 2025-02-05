import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

import { COLOURS } from '../Colours';

import AccountIndex from '../../areas/user-account-settings/AccountIndex';
import AccountSettings from '../../areas/user-account-settings/AccountSettings';
import AccountAbout from '../../areas/user-account-settings/AccountAbout';
import EditAccount from '../../areas/user-account-settings/EditAccount';
import AccountPrivacy from '../../areas/user-account-settings/AccountPrivacy';
import AccountChangePassword from '../../areas/user-account-settings/AccountChangePassword';
import DeleteAccount from '../../areas/user-account-settings/DeleteAccount';
import ProfilePayment from '../../areas/user-account-settings/ProfilePayment.js';

const AccountDonorStack = createNativeStackNavigator();

export default AccountSettingsRoutes = () =>
{
    const navigation = useNavigation();
    return (
        <AccountDonorStack.Navigator
            initialRouteName="Account"
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 20,
                },
                /*  headerBackVisible: false,*/
            }}
            backBehavior="history"
        >
            <AccountDonorStack.Screen
                name="Account"
                component={AccountIndex}
                options={{
//                    statusBarStyle: 'light',
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,
                    /*
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    */
                }}
            />

            <AccountDonorStack.Screen
                name="Settings"
                component={AccountSettings}
                options={{
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Account')}
                        />
                    ),
                }}
            />

            <AccountDonorStack.Screen
                name="About"
                component={AccountAbout}
                options={{
                    headerTintColor: COLOURS.customText,

                    headerStyle: {
                        backgroundColor: COLOURS.shades0,
                    },

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Account')}
                        />
                    ),
                }}
            />

            <AccountDonorStack.Screen
                name="Edit Account"
                component={EditAccount}
                options={{
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Settings')}
                        />
                    ),
                }}
            />

            <AccountDonorStack.Screen
                name="Privacy"
                component={AccountPrivacy}
                options={{
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Settings')}
                        />
                    ),
                }}
            />

            <AccountDonorStack.Screen
                name="Change Password"
                component={AccountChangePassword}
                options={{
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Settings')}
                        />
                    ),
                }}
            />

            <AccountDonorStack.Screen
                name="Delete Account"
                component={DeleteAccount}
                options={{
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Settings')}
                        />
                    ),
                }}
            />

            {/* Payment Method from Account for Donor User */}
            <AccountDonorStack.Screen
                name="ProfileAddPayment"
                component={ProfilePayment}
                options={{
                    headerTintColor: COLOURS.shades0,

                    headerStyle: {
                        backgroundColor: COLOURS.primaryMain,
                    },

                    headerShadowVisible: false,

                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Settings')}
                        />
                    ),
                }}
            />
        </AccountDonorStack.Navigator>
    );
};