import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Card from '../Card';

export default function KetonesBreath() {

    const [breathText, setBreathtext] = useState("Click & Breath")
    const [showLevel, setShowLevel] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)

    const handleBreath = () => {
        setBreathtext("Collecting data ...")
        setButtonDisable(true)
        setTimeout(() => {
            setShowLevel(true)
        }, 3000)
    }

    const handleBack = () => {
        if (showLevel) {
            setBreathtext("Click & Breath")
            setButtonDisable(false)
            setShowLevel(false)
        }
    }

    return (
        <Card
            style={{
                height: 100,
                backgroundColor: "#ffffff",
                marginHorizontal: 10,
                marginTop: 10,
            }}>
            <TouchableWithoutFeedback onPress={handleBack}>
                <View style={{ flexDirection: "row", flex: 1, borderRadius: 10, }}>
                    <View style={{ flex: 0.8 }}>
                        <View style={{ margin: 10 }}>
                            <Text style={classes.title}>Ketones Level</Text>
                        </View>
                        <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                            {showLevel ?
                                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15 }}>
                                    <Text style={classes.subTitle}>Your Ketones level: </Text>
                                    <View style={{ position: "relative" }}>
                                        <View style={classes.backgroundColor} />
                                        <Text style={classes.resultText}>99</Text>
                                    </View>
                                </View>
                                :
                                <TouchableOpacity style={classes.Button} onPress={handleBreath} disabled={buttonDisable}>
                                    <Text style={classes.ButtonText}>{breathText}</Text>
                                </TouchableOpacity>

                            }
                        </View>
                    </View>
                    <View style={{ alignSelf: "center", flex: 0.2 }}>
                        <Image source={require('../image/breathing.png')} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Card>
    )
}

const classes = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        letterSpacing: 1
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.25,
        lineHeight: 22
    },
    backgroundColor: {
        backgroundColor: "#FFB400",
        flex: 1,
        height: "60%",
        width: "100%",
        position: "absolute",
        marginTop: "10%"
    },
    Button: {
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 40
    },
    ButtonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 28,
        letterSpacing: 0.75
    },
    resultText: {
        fontSize: 48,
        fontWeight: "700",
        letterSpacing: 1,
        lineHeight: 50,
        fontStyle: "italic"
    }
});