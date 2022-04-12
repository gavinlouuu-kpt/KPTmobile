import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { randomHeartRate } from '../../utils';

import { useAuth } from '../../Authentication/AuthProvider';

import KetonesBreath from '../KetonesBreath'
import Card from '../../Card';

export default function ClassResult({ classID, creatorID }) {

    const { database, currentUser } = useAuth()

    const [heartRate, setHeartRate] = useState(0);

    useEffect(() => {
        const randomRate = setInterval(() => {
            const heartRate = randomHeartRate()
            setHeartRate(heartRate)
            const ref = database.ref(`${creatorID}/user/${currentUser.uid}`)
            ref.once('value').then((snap) => {
                let numChildren = parseInt(snap.numChildren());
                ref.child("" + (numChildren)).set(heartRate)
            })
        }, 1000)
        return () => clearInterval(randomRate)
    }, [randomHeartRate, database, currentUser])

    return (
        <View style={{ flex: 1 }}>
            <Card style={{
                height: 52,
                backgroundColor: "#ffffff",
                margin: 10,
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1, margin: 10 }}>
                        Class ID
                    </Text>
                    <View style={{ position: "relative" }}>
                        <View style={{ backgroundColor: "#FFB400", flex: 1, height: "40%", width: "65%", position: "absolute", marginTop: "8%", marginLeft: "40%" }} />
                        <Text style={{ fontSize: 48, fontWeight: "bold", letterSpacing: 1, lineHeight: 50, marginVertical: 5, marginLeft: 84, fontStyle: "italic" }}>{classID}</Text>
                    </View>
                </View>
            </Card>
            <KetonesBreath />
            <Card
                style={{
                    height: 140,
                    backgroundColor: "#ffffff",
                    marginHorizontal: 10,
                    marginTop: 10,
                }}>
                <View style={{ borderRadius: 10, }}>
                    <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1 }}>Heart Rate</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>current</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={{ fontSize: 48, fontWeight: "bold", lineHeight: 50, letterSpacing: 1, fontStyle: "italic" }}>{heartRate}</Text>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIconsIcon
                                        name="heart-outline"
                                        size={24}
                                    />
                                    <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>BPM</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.6 }}>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}