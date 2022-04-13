import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../Card';

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
        <Card
            style={{
                height: 100,
                backgroundColor: "#ffffff",

                marginHorizontal: 10,
                marginTop: 10,
            }}>
            <View style={{ borderRadius: 10 }}>
                <View style={classes.titleContainer}>
                    <Text style={classes.title}>Devices</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={[classes.Button, { borderColor: deviceConnect ? "#ff0000" : "#000000" }]} onPress={handleDeviceConnect}>
                        <MaterialCommunityIconsIcon
                            name="cellphone"
                            size={24}
                        />
                        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                            <Text style={classes.nameText}>KPT Beagle</Text>
                            <Text style={[classes.statusText, { color: watchConnect ? "#ff0000" : "#000000" }]}>{deviceConnect ? "Not Connected" : "Connected"}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[classes.Button, { borderColor: deviceConnect ? "#ff0000" : "#000000" }]} onPress={handleWatchConnect}>
                        <MaterialCommunityIconsIcon
                            name="watch-variant"
                            size={24}
                        />
                        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                            <Text style={classes.nameText}>Smart Watch</Text>
                            <Text style={[classes.statusText, { color: watchConnect ? "#ff0000" : "#000000" }]}>{watchConnect ? "Not Connected" : "Connected"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    )
}

const classes = StyleSheet.create({
    titleContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        letterSpacing: 1
    },
    Button: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        flex: 1,
        padding: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    nameText: {
        fontSize: 13,
        fontWeight: "500",
        letterSpacing: 0.25
    },
    statusText: {
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 0.25,
    }
})