import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

export default function KetonesBreath() {

    const [breathText, setBreathtext] = useState("Click & Breath")
    const [showLevel, setShowLevel] = useState(false)

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
    )
}