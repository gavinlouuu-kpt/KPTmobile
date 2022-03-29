import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "./Main"

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    )
}