import { useNavigation, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { Image } from "react-native";
import { useTranslation } from 'react-i18next';
import TitlePage from '../../areas/onboarding/TitlePage.jsx';
import Register from '../../areas/onboarding/register/Register.js';
import EmailConfirmation from '../../areas/onboarding/register/EmailConfirmation';
import Login from '../../areas/onboarding/login/Login.js';
import ResetPassword from '../../areas/onboarding/login/ResetPassword.js';
import { COLOURS } from '../Colours.js';

const Stack = createNativeStackNavigator();

export default function OnBoardingRoutes() {
    const navigation = useNavigation();
    const { t } = useTranslation("onboardingRoutes");

    return (
        <Stack.Navigator
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={{
                headerTintColor: COLOURS.customText,
                headerTitleStyle: {
                    fontFamily: 'Inter_700Bold',
                    fontSize: 20,
                },
                headerStyle: {
                    backgroundColor: COLOURS.shades0,
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={TitlePage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Register to Unify"
                component={Register}
                options={{
                    headerTitle: t("registrationPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="EmailConfirmation"
                component={EmailConfirmation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login to Unify"
                component={Login}
                options={{
                    headerTitle: t("loginPageHeader"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Reset Password"
                component={ResetPassword}
                options={{
                    headerTitle: t("resetPassword"),
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginLeft: 0 }}
                            onPress={() => navigation.navigate('Login to Unify')}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}