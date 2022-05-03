import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import { ArrayConvert } from "../utils";

import { useAuth } from '../Authentication/AuthProvider';

import { useBle } from './BleProvider';

import Card from '../Card';

const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
};

export default function HeartRate({ upload = false, creatorID = "" }) {

    const { database, currentUser } = useAuth()

    const { data } = useBle();

    const [viewWidth, setViewWidth] = useState(0)
    const [viewHeight, setViewHeight] = useState(0)

    const [heartRate, setHeartRate] = useState(0);
    const [heartRateList, setHeartRateList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) // number of point, current: 10

    useEffect(() => {
        if (data !== null) {
            setHeartRateList(pre => {
                let newArray = [...pre]
                newArray.shift()
                newArray.push(data)
                return newArray
            })
            setHeartRate(data)
            if (upload) {
                const ref = database.ref(`${creatorID}/user/${currentUser.uid}`)
                ref.once('value').then((snap) => {
                    let numChildren = parseInt(snap.numChildren());
                    ref.child("" + (numChildren)).set(data)
                })
            }
        }
    }, [currentUser, database, upload, data])

    return (
        <Card
            style={{
                height: 130,
                backgroundColor: "#ffffff",
                marginHorizontal: 10,
                marginTop: 10,
                flexDirection: 'row'
            }}>
            <View style={{ borderRadius: 10 }}>
                <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                    <Text style={classes.title}>Heart Rate</Text>
                </View>
                <View style={{ paddingHorizontal: 15, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={classes.defaultFont}>current</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={classes.resultText}>{heartRate}</Text>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIconsIcon
                                    name="heart-outline"
                                    size={24}
                                />
                                <Text style={classes.defaultFont}>BPM</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, marginTop: 10, marginRight: 5, justifyContent: 'center' }} onLayout={(event) => {
                setViewWidth(event.nativeEvent.layout.width)
                setViewHeight(event.nativeEvent.layout.height)
            }}>
                <LineChart
                    data={ArrayConvert(heartRateList)}
                    width={viewWidth - 10}
                    height={viewHeight - 10}
                    chartConfig={chartConfig}
                />
            </View>
        </Card>
    )
}

const classes = StyleSheet.create({
    defaultFont: {
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 22,
        letterSpacing: 0.25
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        letterSpacing: 1
    },
    resultText: {
        fontSize: 48,
        fontWeight: "bold",
        lineHeight: 50,
        letterSpacing: 1,
        fontStyle: "italic"
    }
});