import React from 'react'
import { View, Text } from 'react-native'

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import KetonesBreath from '../KetonesBreath'

export default function ClassResult({ number }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                height: 52,
                backgroundColor: "#ffffff",
                margin: 10,
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1, margin: 10 }}>
                        Class ID
                    </Text>
                    <View style={{ position: "relative" }}>
                        <View style={{ backgroundColor: "#FFB400", flex: 1, height: "40%", width: "65%", position: "absolute", marginTop: "8%", marginLeft: "40%" }} />
                        <Text style={{ fontSize: 48, fontWeight: "bold", letterSpacing: 1, lineHeight: 50, marginVertical: 5, marginLeft: 84, fontStyle: "italic" }}>{number}</Text>
                    </View>
                </View>
            </View>
            <KetonesBreath />
            <View
                style={{
                    height: 140,
                    backgroundColor: "#ffffff",
                    // margin: 10,
                    marginHorizontal: 10,
                    marginTop: 10,
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
                <View style={{ borderRadius: 10, }}>
                    <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1 }}>Heart Rate</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>current</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={{ fontSize: 48, fontWeight: "bold", lineHeight: 50, letterSpacing: 1, fontStyle: "italic" }}>123</Text>
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
            </View>
        </View>
    )
}