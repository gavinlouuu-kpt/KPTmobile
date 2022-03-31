import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Main({ navigation }) {

    const [breathText, setBreathtext] = useState("Click & Breath")
    const [showLevel, setShowLevel] = useState(false)
    const [deviceConnect, setDeviceConnect] = useState(false)
    const [watchConnect, setWatchConnect] = useState(false)

    const handleBreath = () => {
        setBreathtext("Collecting data ...")
        setTimeout(() => {
            setShowLevel(true)
        }, 3000)
    }

    const handleBack = () => {
        if (showLevel) {
            setBreathtext("Click & Breath")
            setShowLevel(false)
        }
    }

    const handleDeviceConnect = () => {
        setDeviceConnect(pre => !pre)
    }

    const handleWatchConnect = () => {
        setWatchConnect(pre => !pre)
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
            <View
                style={{
                    flex: 1,
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
                <TouchableWithoutFeedback onPress={handleBack}>
                    <View style={{ flexDirection: "row", flex: 1, borderRadius: 10, }}>
                        <View style={{ flex: 0.8 }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1 }}>Ketones Level</Text>
                            </View>
                            <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                                {showLevel ?
                                    <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15 }}>
                                        <Text style={{ fontSize: 14, fontWeight: "500", letterSpacing: 0.25, lineHeight: 22 }}>Your Ketones level: </Text>
                                        <View style={{ position: "relative" }}>
                                            <View style={{ backgroundColor: "#FFB400", flex: 1, height: "60%", width: "100%", position: "absolute", marginTop: "10%" }} />
                                            <Text style={{ fontSize: 48, fontWeight: "700", letterSpacing: 1, lineHeight: 50, fontStyle: "italic" }}>99</Text>
                                        </View>
                                    </View>
                                    :
                                    <TouchableOpacity style={{ borderColor: "#000000", borderWidth: 1, borderRadius: 40 }} onPress={handleBreath}>
                                        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600", lineHeight: 28, letterSpacing: 0.75 }}>{breathText}</Text>
                                    </TouchableOpacity>

                                }
                            </View>
                        </View>
                        <View style={{ alignSelf: "center", flex: 0.2 }}>
                            <Image source={require('../image/breathing.png')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View
                style={{
                    flex: 1.3,
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
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>current</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 48, fontWeight: "bold", lineHeight: 50, letterSpacing: 1, fontStyle: "italic" }}>999</Text>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIconsIcon
                                    name="heart-outline"
                                    size={24}
                                />
                                <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>BPM</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
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
            <View style={{ flex: 3, flexDirection: "row", margin: 10 }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#ffffff",
                        marginRight: 2.5,
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
                    <View style={{ margin: 10, position: "relative" }}>
                        <View style={{ backgroundColor: "#C4C4C4", flex: 1, height: "30%", width: "43.5%", position: "absolute", marginTop: "4%" }} />
                        <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic", lineHeight: 34, letterSpacing: 1 }}>Join</Text>
                        <Text style={{ fontSize: 32, fontWeight: "bold", lineHeight: 34, letterSpacing: 1 }}>a Class</Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#ffffff",
                        marginLeft: 2.5,
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
                    <View style={{ margin: 10, flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ position: "relative" }}>
                            <View style={{ backgroundColor: "#C4C4C4", flex: 1, height: "50%", width: "65%", position: "absolute", marginTop: "5%" }} />
                            <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic", lineHeight: 34, letterSpacing: 1 }}>Create</Text>
                        </View>
                        <Text style={{ fontSize: 32, fontWeight: "bold", lineHeight: 34, letterSpacing: 1 }}>a Class</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}
