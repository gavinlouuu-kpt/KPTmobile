import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import { useAuth } from '../../Authentication/AuthProvider'

export default function Setting() {

    const { Logout } = useAuth()

    const handleLogout = async () => {
        await Logout()
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#ffffff",
            margin: 5,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#ffffff", borderRadius: 10, }}>
                <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", letterSpacing: 0.25, lineHeight: 22 }}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}