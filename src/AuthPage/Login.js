import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Input, FormControl, Button } from "native-base";

import { useAuth } from "../Authentication/AuthProvider"

export default function Login({ navigation }) {

  const CallAlert = Message => {
    Alert.alert('Opps, somethings wrong!', Message, [
      {text: 'OK', style: 'cancel'},
    ]);
  };

  const { Login } = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        await Login(email, password);
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            return CallAlert('Invalid Email');
          case 'auth/wrong-password':
            return CallAlert('Email/Password Wrong!');
          case 'auth/user-not-found':
            return CallAlert('Email/Password Wrong!');
        }
      }
    } else {
      CallAlert('Email or Password is empty!');
    }
  }

  const handleRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 5 }}>
            {/* <Text>Icon</Text> */}
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>AppNameAppName</Text>
          </View>
          <View style={{ flex: 2, justifyContent: "center", marginHorizontal: 20 }}>
            <Text>Many people say that life isn't like a bed of roses. I beg to differ. I think that life is quite like a bed of roses. Just like life, a bed of roses looks pretty on the outside, but when you're in it, you find that it is nothing but thorns and pain. I myself have been pricked quite badly.</Text>
          </View>
          <View style={{ flex: 4, marginHorizontal: 20 }}>
            <FormControl>
              <Input variant="underlined" placeholder="example@example.com" px={0} onChangeText={(Text) => setEmail(Text)} />
              <FormControl.HelperText>
                Email
              </FormControl.HelperText>
            </FormControl>
            <FormControl>
              <Input type="password" variant="underlined" placeholder="password" px={0} onChangeText={(Text) => setPassword(Text)} />
              <FormControl.HelperText>
                Password
              </FormControl.HelperText>
            </FormControl>
            <View style={{ marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                <TouchableOpacity>
                  <Text>
                    Forget Password?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegister}>
                  <Text>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Button size="md" onPress={handleLogin}>
                  LOGIN
                </Button>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}