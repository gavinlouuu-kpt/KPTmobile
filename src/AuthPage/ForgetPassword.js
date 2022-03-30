import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Dimensions, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Input, FormControl, Button, AlertDialog } from "native-base";
import { useHeaderHeight } from '@react-navigation/elements';

import { useAuth } from "../Authentication/AuthProvider";

import { ValidateEmail } from "../utils";

export default function ForgetPassword({ navigation }) {

  const { PasswordReset } = useAuth();
  const headerHeight = useHeaderHeight();

  const slideAnime = useRef(new Animated.Value(0)).current;
  const [height] = useState(Dimensions.get('window').height)

  const [email, setEmail] = useState("");
  const [hyperText, setHyperText] = useState(null)

  const [isOpen, setIsOpen] = useState(false);
  const alertRef = useRef(null);
  const onClose = () => {
    setIsOpen(false)
    navigation.goBack();
  };

  const replaceString = (code, string) => {
    const newCode = "[" + code + "] "
    return string.replace(newCode, '')
  }

  const handleSubmit = async () => {
    if (ValidateEmail(email)) {
      setHyperText(null)
      try {
        await PasswordReset(email);
        await setIsOpen(!isOpen)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            return setHyperText(replaceString(error.code, error.message))
        }
      }
    } else {
      setHyperText("Enter a Valid Email!")
    }
  }

  useEffect(() => {
    Animated.timing(slideAnime, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [slideAnime])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "flex-end" }}
      >
        <Animated.View style={{
          transform: [
            {
              translateY: slideAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0]
              })
            }
          ],
          height: height * 0.4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }}>
          <View style={{ margin: 20, flex: 1, }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", flex: 1 }}>Retriving your password</Text>
            <Text style={{ fontSize: 12, flex: 2 }}>Many people say that life isn't like a bed of roses. I beg to differ. I think that life is quite like a bed of roses. Just like life, a bed of roses looks pretty on the outside, but when you're in it, you find that it is nothing but thorns and pain. I myself have been pricked quite badly.</Text>
            <View style={{ flex: 2 }}>
              <FormControl isRequired isInvalid={hyperText !== null}>
                <Input variant="underlined" placeholder="example@example.com" px={0} onChangeText={(Text) => setEmail(Text)} />
                {hyperText !== null ?
                  <FormControl.ErrorMessage>
                    {hyperText}
                  </FormControl.ErrorMessage>
                  :
                  <FormControl.HelperText>
                    Email
                  </FormControl.HelperText>
                }
              </FormControl>
            </View>
            <View style={{ flex: 1, }}>
              <Button size="md" onPress={handleSubmit} style={{ alignSelf: "flex-end" }}>
                CONTINUE
              </Button>
            </View>
          </View>
        </Animated.View>
        <AlertDialog leastDestructiveRef={alertRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.Body>
              Reset passwork link had sent to your email account.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button onPress={onClose} ref={alertRef}>
                  Next
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </KeyboardAvoidingView>

    </TouchableWithoutFeedback>
  )
}