import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import EntypoIcon from 'react-native-vector-icons/Entypo';

import Card from '../Card';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function HistroyCard({ item }) {

    const ordinalNum = (num) => {
        if (num === 1 || num === 21) return "st"
        if (num === 2 || num === 22) return "nd"
        if (num === 3 || num === 23) return "rd"
        return "th"
    }

    const getDate = () => {

        const currentTime = new Date(0)
        currentTime.setUTCSeconds(item.date)
        const day = currentTime.getDate()
        const month = currentTime.getMonth()
        const year = currentTime.getFullYear()
        return `${day}${ordinalNum(day)} ${monthNames[month]}, ${year}`
    }

    return (
        <Card style={{
            height: 140,
            backgroundColor: "#ffffff",
            margin: 5,
            padding: 10,
        }}>
            <Text style={classes.dateText}>{getDate()}</Text>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={classes.rowContainer}>
                    <EntypoIcon name="dot-single" size={18} />
                    <Text style={classes.title}>Ketone Diff:</Text>
                    <View style={[classes.rowContainer, { flex: 1 }]}>
                        <View style={{ flex: 2 }}>
                            <Text style={classes.resultText}>{item.KetoneDiff}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={classes.defaultFont}>units</Text>
                        </View>
                    </View>
                </View>
                <View style={classes.rowContainer}>
                    <EntypoIcon name="dot-single" size={18} />
                    <Text style={classes.title}>Average Heart Rate:</Text>
                    <View style={[classes.rowContainer, { flex: 1 }]}>
                        <View style={{ flex: 2 }}>
                            <Text style={classes.resultText}>{item.HeartRate}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={classes.defaultFont}>BPM</Text>
                        </View>
                    </View>
                </View>
                <View style={classes.rowContainer}>
                    <EntypoIcon name="dot-single" size={18} />
                    <Text style={classes.title}>Burnt Calories:</Text>
                    <View style={[classes.rowContainer, { flex: 1 }]}>
                        <View style={{ flex: 2 }}>
                            <Text style={classes.resultText}>{item.Cal}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={classes.defaultFont}>cal</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    )
}

const classes = StyleSheet.create({
    defaultFont: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        letterSpacing: 0.75
    },
    title: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        letterSpacing: 0.75,
        flex: 1
    },
    dateText: {
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 1,
        fontWeight: "bold"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    resultText: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 32,
        letterSpacing: 0.75
    }
})