import React from 'react';
import { Text, View, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';

import { Input, Button } from 'native-base';

import KetonesBreath from "../KetonesBreath";

export default function StudentLogin({ handleContinue, handleInputClassID }) {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center" }}
            >
                <KetonesBreath />
                <View style={{
                    height: 52,
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
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", lineHeight: 32, letterSpacing: 1, marginHorizontal: 10 }}>
                        Class ID
                    </Text>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Input variant="rounded" placeholder="Enter The Class ID " isFullWidth={true} onChangeText={(Text) => handleInputClassID(Text)} />
                    </View>
                </View>
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <Button onPress={handleContinue} >Continue</Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}