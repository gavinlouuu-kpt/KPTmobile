import React, { useEffect } from 'react';
import { TouchableOpacity } from "react-native"

import { Avatar } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../Authentication/AuthProvider';

import Main from "./Main"
import Profile from './Profile';
import ClassInstructor from './Class/ClassInstructor';
import ClassMain from "./Class/ClassMain";

const Stack = createNativeStackNavigator();

export default function MainStack() {

    const { userStat } = useAuth();

    return (
        <Stack.Navigator initialRouteName="Main"
            screenOptions={({ navigation }) => ({
                headerShadowVisible: false,
                title: '',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIconsIcon
                            name="chevron-left"
                            size={24}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Avatar size="sm" bgColor={"gray.900"} _text={{ color: "white" }}>
                            {userStat.username.charAt(0)}
                        </Avatar>
                    </TouchableOpacity>
                ),
            })}>
            <Stack.Screen name="Main" component={Main}
                options={{
                    headerLeft: () => <></>,
                }}
            />
            <Stack.Screen name="Profile" component={Profile}
                options={{
                    headerRight: () => (
                        <></>
                    ),
                }}
            />
            <Stack.Screen name="ClassInstructor" component={ClassInstructor} />
            <Stack.Screen name="ClassMain" component={ClassMain} />
        </Stack.Navigator>
    )
}