import React from 'react';
import { Text, View, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, Keyboard, StyleSheet } from 'react-native';

import { Input, Button } from 'native-base';

import KetonesBreath from "../KetonesBreath";
import Card from '../../Card';

export default function ClassLogin({ handleContinue, handleInputClassID }) {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center" }}
            >
                <KetonesBreath />
                <Card style={{
                    height: 52,
                    backgroundColor: "#ffffff",
                    marginHorizontal: 10,
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Text style={classes.title}>
                        Class ID
                    </Text>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Input variant="rounded" placeholder="Enter The Class ID " isFullWidth={true} onChangeText={(Text) => handleInputClassID(Text)} />
                    </View>
                </Card>
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <Button onPress={handleContinue} >Continue</Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const classes = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 32,
        letterSpacing: 1,
        marginHorizontal: 10
    }
})