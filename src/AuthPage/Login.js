import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, Dimensions } from 'react-native'
import { Input, FormControl, Button } from "native-base";
import { useHeaderHeight } from '@react-navigation/elements';

import { useAuth } from "../Authentication/AuthProvider"

import { replaceString } from "../utils";

export default function Login({ navigation }) {

  const windowWidth = Dimensions.get('window').width;

  const { Login } = useAuth();
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        await Login(email, password);
      } catch (error) {
        return setErrorMessage(replaceString(error.code, error.message))
      }
    } else {
      setErrorMessage('Email or Password is empty!');
    }
  }

  const handleRegister = () => {
    setErrorMessage(null)
    navigation.navigate('Register')
  }

  const handleResetPassword = () => {
    setErrorMessage(null)
    navigation.navigate('ForgetPassword')
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={headerHeight}
          style={{ flex: 1, backgroundColor: "#ffffff" }}
        >
          <View style={{ flex: 5}}>
            {/* <View style={{ backgroundColor: "#54595F", justifyContent: "center", paddingHorizontal: 10 }}>
              <Image source={require('../image/kptw.png')} style={{ width: windowWidth - 20 }} resizeMode="contain" />
            </View> */}
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
            <FormControl isInvalid={errorMessage !== null}>
              <FormControl.ErrorMessage>
                {errorMessage}
              </FormControl.ErrorMessage>
            </FormControl>
            <View style={{ marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                <TouchableOpacity onPress={handleResetPassword}>
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}