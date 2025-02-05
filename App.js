import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

// Redux to manage state
import store from './src/store/index.js';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as Linking from "expo-linking";

import { setJSExceptionHandler } from 'react-native-exception-handler';
import ErrorBoundary from 'react-native-error-boundary';
import GenericAPIError from './src/components/errors/GenericAPIError.js';
import ApiErrorBoundary from './src/components/errors/ApiErrorBoundary.js';
import UnauthroizedAccess from './src/components/errors/UnauthroizedAccess.js';

//Navigation Stack frameworks needed for each screen
import { getPathFromState, getStateFromPath, NavigationContainer } from '@react-navigation/native';
import NavigationRoutes from './src/components/navigationRoutes/NavigationRoutes.js';
import { name as appName } from './app.json';

import { navigationRef } from './src/components/navigationRoutes/RootNavigation.js';

//Use google 'inter' Font from Expo-Google-Fonts
import {
    useFonts,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
} from '@expo-google-fonts/inter';
import FallbackComponent from 'react-native-error-boundary/lib/ErrorBoundary/FallbackComponent/index.js';

setJSExceptionHandler((error, isFatal) => {
    console.log("JS EXCEPTION", error);
}, true);

function handleJSErrorForErrorBoundary(error, stackTrace) {
    // Show error locally on DEBUG mode
    console.log("Boundary", error);
    return null;
}

const linking = {
    prefixes: [Linking.createURL("/"), "https://unifygiving.com", "ug://"],
    config: {
        screens:{
            Donor: {
                screens: {
                    DonationHome: "donation/:recipientId",
                }
            }
        }
    }
};


const App = () => {
    useEffect(() =>
    {
        (async () => {
            const { status } = await requestTrackingPermissionsAsync();
            if (status === 'granted') {
              console.log('Tracking Granted IOS');
            }
          })();
    }, []);

    //Set fonts used
    const queryClient = new QueryClient();
    let [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_600SemiBold,
        Inter_400Regular,
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <NavigationContainer linking={linking} ref={navigationRef}>
                    <ErrorBoundary
                        handleJSErrorForErrorBoundary={handleJSErrorForErrorBoundary}
                        FallbackComponent={FallbackComponent}
                        resetError={()=>{
                            console.log("reset");
                        }}
                    >
                        <ApiErrorBoundary Cases={[
                            { status: 401, component: UnauthroizedAccess }
                        ]}
                            FallbackComponent={GenericAPIError}>
                            <NavigationRoutes />
                        </ApiErrorBoundary>
                    </ErrorBoundary>
                </NavigationContainer>
            </Provider>
        </QueryClientProvider>
    );
};

export default App;

AppRegistry.registerComponent(appName, () => App);