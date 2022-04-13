import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

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
            <ScrollView style={classes.container}>
                <TouchableOpacity onPress={handleLogout} style={classes.Button}>
                    <Text style={classes.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </Card>
    )
}

const classes = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 10
    },
    Button: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "500",
        letterSpacing: 0.25,
        lineHeight: 22
    }
})