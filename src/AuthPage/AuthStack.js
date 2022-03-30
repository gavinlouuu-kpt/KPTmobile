import * as React from 'react';
import { TouchableOpacity } from "react-native"

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from "./Login"
import Register from "./Register"
import ForgetPassword from "./ForgetPassword"

const Stack = createNativeStackNavigator();

export default function AuthStack() {

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIconsIcon
                                name="chevron-left"
                                size={24}
                            />
                        </TouchableOpacity>
                    ),
                })} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIconsIcon
                                name="chevron-left"
                                size={24}
                            />
                        </TouchableOpacity>
                    ),
                })} />
        </Stack.Navigator>
    )
}