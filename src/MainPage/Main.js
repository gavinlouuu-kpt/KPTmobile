import React from 'react';
import { Text, View, Button } from 'react-native';

import { useAuth } from '../Authentication/AuthProvider';

export default function Main({ navigation }) {

    const { Logout } = useAuth();

    const handleLogout = async () => {
        await Logout()
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Main</Text>
            <Button
                title="Login Page"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
}
