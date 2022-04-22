import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import { useAuth } from './Authentication/AuthProvider'

import MainStack from "./MainPage/MainStack"
import AuthStack from "./AuthPage/AuthStack"

import BleProvider from './MainPage/BleProvider';

export default function App() {

  const { currentUser } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {currentUser ?
        <BleProvider>
          <MainStack />
        </BleProvider>
        : <AuthStack />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});