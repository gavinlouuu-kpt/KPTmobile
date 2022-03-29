import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import { AuthProvider } from './src/Authentication/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";

const Root = () => (
    <NavigationContainer>
        <NativeBaseProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </NativeBaseProvider>
    </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => Root);
