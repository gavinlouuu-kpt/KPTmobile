import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Card({ children, style = {} }) {
    return (
        <View style={[styles.root, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})