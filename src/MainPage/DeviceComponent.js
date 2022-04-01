import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DeviceComponent() {

    const [deviceConnect, setDeviceConnect] = useState(false)
    const [watchConnect, setWatchConnect] = useState(false)

    const handleDeviceConnect = () => {
        setDeviceConnect(pre => !pre)
    }

    const handleWatchConnect = () => {
        setWatchConnect(pre => !pre)
    }

    return (
        <View
            style={{
                height: 100,
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
            <View style={{ borderRadius: 10 }}>
                <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1 }}>Devices</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ borderColor: deviceConnect ? "#ff0000" : "#000000", borderWidth: 1, borderRadius: 10, flexDirection: "row", flex: 1, padding: 5, alignItems: "center", marginHorizontal: 5 }} onPress={handleDeviceConnect}>
                        <MaterialCommunityIconsIcon
                            name="cellphone"
                            size={24}
                        />
                        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 13, fontWeight: "500", letterSpacing: 0.25 }}>KPT Beagle</Text>
                            <Text style={{ fontSize: 14, fontWeight: "700", letterSpacing: 0.25, color: deviceConnect ? "#ff0000" : "#000000" }}>{deviceConnect ? "Not Connected" : "Connected"}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderColor: watchConnect ? "#ff0000" : "#000000", borderWidth: 1, borderRadius: 10, flexDirection: "row", flex: 1, padding: 5, alignItems: "center", marginHorizontal: 5 }} onPress={handleWatchConnect}>
                        <MaterialCommunityIconsIcon
                            name="watch-variant"
                            size={24}
                        />
                        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 13, fontWeight: "500", letterSpacing: 0.25 }}>Smart Watch</Text>
                            <Text style={{ fontSize: 14, fontWeight: "700", letterSpacing: 0.25, color: watchConnect ? "#ff0000" : "#000000" }}>{watchConnect ? "Not Connected" : "Connected"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}