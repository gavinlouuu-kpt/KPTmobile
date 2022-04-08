import React from 'react'
import { View, Text } from 'react-native'

import EntypoIcon from 'react-native-vector-icons/Entypo';

import Card from '../Card';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function HistroyCard({ data }) {

    const ordinalNum = (num) => {
        if (num === 1 || num === 21) return "st"
        if (num === 2 || num === 22) return "nd"
        if (num === 3 || num === 23) return "rd"
        return "th"
    }

    const getDate = () => {

        const currentTime = new Date(0)
        currentTime.setUTCSeconds(data.date)
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
            <Text style={{ fontSize: 24, lineHeight: 32, letterSpacing: 1, fontWeight: "bold", }}>{getDate()}</Text>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <EntypoIcon name="dot-single" size={18} />
                    <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75, flex: 1 }}>Ketone Diff:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", lineHeight: 32, letterSpacing: 0.75 }}>{data.KetoneDiff}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75 }}>units</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <EntypoIcon name="dot-single" size={18} />
                    <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75, flex: 1 }}>Average Heart Rate:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", lineHeight: 32, letterSpacing: 0.75 }}>{data.HeartRate}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75 }}>BPM</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <EntypoIcon name="dot-single" size={18} />
                    <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75, flex: 1 }}>Burnt Calories:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", lineHeight: 32, letterSpacing: 0.75 }}>{data.Cal}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75 }}>cal</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    )
}