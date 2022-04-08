import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import { useAuth } from '../../Authentication/AuthProvider'

import Card from '../../Card'

export default function Setting() {

    const { Logout } = useAuth()

    const handleLogout = async () => {
        await Logout()
    }

    return (
        <Card style={{
            flex: 1,
            backgroundColor: "#ffffff",
            margin: 5,
        }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#ffffff", borderRadius: 10, }}>
                <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", letterSpacing: 0.25, lineHeight: 22 }}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </Card>
    )
}