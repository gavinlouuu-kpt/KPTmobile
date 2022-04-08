import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceComponent from './DeviceComponent';
import KetonesBreath from './KetonesBreath';

import Card from '../Card';

export default function Main({ navigation }) {

    const handleCreateClass = () => {
        navigation.navigate("ClassInstructor")
    }

    const handleJoinClass = () => {
        navigation.navigate("ClassMain")
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
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
            </Card>
            {/* This is DeviceComponent */}
            <DeviceComponent />

            <View style={{ flex: 3, flexDirection: "row", margin: 10 }}>
                <TouchableWithoutFeedback onPress={handleJoinClass}>
                    <View style={{ flex: 1 }}>
                        <Card
                            style={{
                                flex: 1,
                                backgroundColor: "#ffffff",
                                marginRight: 2.5,
                            }}>
                            <View style={{ margin: 10, position: "relative" }}>
                                <View style={{ backgroundColor: "#C4C4C4", flex: 1, height: "30%", width: "43.5%", position: "absolute", marginTop: "4%" }} />
                                <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic", lineHeight: 34, letterSpacing: 1 }}>Join</Text>
                                <Text style={{ fontSize: 32, fontWeight: "bold", lineHeight: 34, letterSpacing: 1 }}>a Class</Text>
                            </View>
                        </Card>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleCreateClass}>
                    <View style={{ flex: 1 }}>
                        <Card style={{
                            flex: 1,
                            backgroundColor: "#ffffff",
                            marginLeft: 2.5,
                        }}>
                            <View style={{ margin: 10, flex: 1, justifyContent: "flex-end" }}>
                                <View style={{ position: "relative" }}>
                                    <View style={{ backgroundColor: "#C4C4C4", flex: 1, height: "50%", width: "65%", position: "absolute", marginTop: "5%" }} />
                                    <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic", lineHeight: 34, letterSpacing: 1 }}>Create</Text>
                                </View>
                                <Text style={{ fontSize: 32, fontWeight: "bold", lineHeight: 34, letterSpacing: 1 }}>a Class</Text>
                            </View>
                        </Card>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}
