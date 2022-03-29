import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./Login"
import Register from "./Register"

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}