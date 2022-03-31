import React, { useEffect } from 'react';
import { TouchableOpacity } from "react-native"

import { Avatar } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../Authentication/AuthProvider';

import Main from "./Main"
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function MainStack() {

    const { currentUser } = useAuth();

    return (
        <Stack.Navigator initialRouteName="Main"
            screenOptions={({ navigation }) => ({
                headerShadowVisible: false,
                title: '',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Avatar size="sm" bgColor={"gray.900"} _text={{ color: "white" }}>
                            {currentUser.email.charAt(0)}
                        </Avatar>
                    </TouchableOpacity>
                ),
            })}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Profile" component={Profile}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIconsIcon
                                name="chevron-left"
                                size={24}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    )
}