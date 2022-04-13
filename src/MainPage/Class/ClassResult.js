import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import KetonesBreath from '../KetonesBreath'
import Card from '../../Card';
import HeartRate from '../HeartRate';

export default function ClassResult({ classID, creatorID }) {

    return (
        <View style={{ flex: 1 }}>
            <Card style={{
                height: 52,
                backgroundColor: "#ffffff",
                margin: 10,
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[classes.title, { margin: 10 }]}>
                        Class ID
                    </Text>
                    <View style={{ position: "relative" }}>
                        <View style={classes.backgroundColor} />
                        <Text style={classes.classText}>{classID}</Text>
                    </View>
                </View>
            </Card>

            <KetonesBreath />

            <HeartRate upload={true} creatorID={creatorID} />
        </View>
    )
}

const classes = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        letterSpacing: 1
    },
    backgroundColor: {
        backgroundColor: "#FFB400",
        flex: 1,
        height: "40%",
        width: "65%",
        position: "absolute",
        marginTop: "8%",
        marginLeft: "40%"
    },
    classText: {
        fontSize: 48,
        fontWeight: "bold",
        letterSpacing: 1,
        lineHeight: 50,
        marginVertical: 5,
        marginLeft: 84,
        fontStyle: "italic"
    }
})