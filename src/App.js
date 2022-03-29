import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { useAuth } from './Authentication/AuthProvider'

import MainStack from "./MainPage/MainStack"
import AuthStack from "./AuthPage/AuthStack"

export default function App() {

  const { currentUser } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {currentUser ? <MainStack /> : <AuthStack />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});