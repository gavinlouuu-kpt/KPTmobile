import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Avatar, Divider } from 'native-base';

import { useAuth } from '../Authentication/AuthProvider';

import Setting from './Profile/Setting';
import Device from './Profile/Device';
import History from './Profile/History';

export default function Profile() {


  const { userStat } = useAuth();

  const slideAnime = useRef(new Animated.Value(0)).current;

  const [panelIndex, setPanelIndex] = useState(0)

  const renderPanel = () => {
    switch (panelIndex) {
      case 1:
        return (
          <Animated.View style={{
            transform: [
              {
                translateY: slideAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0]
                })
              }
            ],
            flex: 1
          }}>
            <Device />
          </Animated.View>
        )
      case 2:
        return (
          <Animated.View style={{
            transform: [
              {
                translateY: slideAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0]
                })
              }
            ],
            flex: 1
          }}>
            <Setting />
          </Animated.View>
        )
      default:
        return (
          <Animated.View style={{
            transform: [
              {
                translateY: slideAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0]
                })
              }
            ],
            flex: 1
          }}>
            <History />
          </Animated.View>
        )
    }
  }

  useEffect(() => {
    Animated.timing(slideAnime, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).reset();
    Animated.timing(slideAnime, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();
  }, [slideAnime, panelIndex])

  return (
    <View style={{ flex: 1 }}>
      <View style={classes.container}>
        <Avatar size={120} _text={{ fontSize: 24, fontWeight: "bold" }} >
          {userStat.username.charAt(0)}
        </Avatar>
        <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 32, letterSpacing: 1, paddingTop: 10 }}>{userStat.username}</Text>
        <Divider bg="black" my={5} />
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
          <TouchableOpacity style={classes.Button} onPress={() => setPanelIndex(0)}>
            <MaterialCommunityIcons
              name="format-list-numbered"
              size={24}
            />
            <Text>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={classes.Button} onPress={() => setPanelIndex(1)}>
            <MaterialCommunityIcons
              name="devices"
              size={24}
            />
            <Text>
              Device
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={classes.Button} onPress={() => setPanelIndex(2)}>
            <MaterialCommunityIcons
              name="cog"
              size={24}
            />
            <Text>
              Setting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {renderPanel()}
      </View>
    </View >
  )
}

const classes = StyleSheet.create({
  container: {
    height: 290, 
    alignItems: "center", 
    backgroundColor: "#ffffff", 
    margin: 5, 
    padding: 26
  },
  Button: {
    alignItems: "center", 
    marginHorizontal: 5, 
    paddingHorizontal: 5
  }
})