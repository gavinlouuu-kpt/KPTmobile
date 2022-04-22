import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceComponent from './DeviceComponent';
import KetonesBreath from './KetonesBreath';

import { randomHeartRate } from "../utils";

import Card from '../Card';
import History from "./Profile/History";
import ClassMain from './Class/ClassMain';

export default function Main({ navigation }) {


    const [heartRate, setHeartRate] = useState(0);

    useEffect(() => {
        const randomRate = setInterval(() => {
            setHeartRate(randomHeartRate())
        }, 1000)
        return () => clearInterval(randomRate)
    }, [])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>

            <KetonesBreath />

            <Card
                style={{
                    height: 130,
                    backgroundColor: "#ffffff",
                    marginHorizontal: 10,
                    marginTop: 10,
                }}>
                <View style={{ borderRadius: 10, }}>
                    <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                        <Text style={classes.title}>Heart Rate</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={classes.defaultFont}>current</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
                        <View style={{ flex: 0.6 }}>
                        </View>
                    </View>
                </View>
            </Card>
            {/* This is DeviceComponent */}
            <DeviceComponent />

            <ClassMain />

            <View style={{ flex: 1 }}>
                <History needRender={false} />
            </View>
        </ScrollView>
    );
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