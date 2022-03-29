import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Input, FormControl, Button } from "native-base";

import { useAuth } from "../Authentication/AuthProvider";

export default function Register() {

  const { Register } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [hyperText, setHyperText] = useState("")

  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  const handleSubmit = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      return setHyperText("Column must not empty!")
    } else {
      setHyperText("")
      if (!ValidateEmail(email)) {
        return setEmailError(!ValidateEmail(email))
      }
      if (password !== confirmPassword) {
        return setPasswordError(true)
      } else {
        setPasswordError(false)
      }
      try {
        await Register(
          email, password
        );
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            return setHyperText('Invalid Email');
          case 'auth/email-already-in-use':
            return setHyperText('Email already in use!');
        }
      }
    }
    // await Register(email, password)
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
      <FormControl isRequired isInvalid={emailError}>
        <Input variant="underlined" placeholder="example@example.com" px={0} onChangeText={(Text) => setEmail(Text)} isInvalid={emailError} />
        {emailError ?
          <FormControl.ErrorMessage>
            Invalid Email! Please Try Again!
          </FormControl.ErrorMessage> :
          <FormControl.HelperText>
            Email
          </FormControl.HelperText>}
      </FormControl>
      <FormControl isRequired isInvalid={passwordError}>
        <Input type="password" variant="underlined" placeholder="password" px={0} onChangeText={(Text) => setPassword(Text)} />
        {passwordError ?
          <FormControl.ErrorMessage>
            Password not the same!
          </FormControl.ErrorMessage> :
          <FormControl.HelperText>
            Password
          </FormControl.HelperText>}
      </FormControl>
      <FormControl isRequired isInvalid={passwordError}>
        <Input type="password" variant="underlined" placeholder="ConfirmPassword" px={0} onChangeText={(Text) => setConfirmPassword(Text)} />
        {passwordError ?
          <FormControl.ErrorMessage>
            Password not the same!
          </FormControl.ErrorMessage> :
          <FormControl.HelperText>
            ConfirmPassword
          </FormControl.HelperText>}
      </FormControl>
      {hyperText === "" ?
        <></> :
        <Text>
          {hyperText}
        </Text>}
      <Button size="md" onPress={handleSubmit}>
        Register
      </Button>
    </View>
  )
}