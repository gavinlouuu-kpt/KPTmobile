import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableWithoutFeedback, NativeModules, NativeEventEmitter, Platform, PermissionsAndroid, ScrollView } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import { useFocusEffect } from '@react-navigation/native';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceComponent from './DeviceComponent';
import KetonesBreath from './KetonesBreath';

import { useAuth } from '../Authentication/AuthProvider';

import Card from '../Card';
import History from "./Profile/History";

export default function Main({ navigation }) {

    const { database, currentUser } = useAuth()

    const [isJoinClass, setIsJoinClass] = useState(false)

    const handleCreateClass = () => {
        navigation.navigate("ClassInstructor")
    }

    const handleJoinClass = () => {
        navigation.navigate("ClassMain")
        // startScan()
    }

    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();
    const [list, setList] = useState([]);


    const startScan = () => {
        if (!isScanning) {
            BleManager.scan([], 3, true).then((results) => {
                console.log('Scanning...');
                console.log(results)
                setIsScanning(true);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
    }

    const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }



    // useEffect(() => {
    //     BleManager.start({ showAlert: false });

    //     bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    //     bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    //     if (Platform.OS === 'android' && Platform.Version >= 23) {
    //         PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
    //             if (result) {
    //                 console.log("Permission is OK");
    //             } else {
    //                 PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
    //                     if (result) {
    //                         console.log("User accept");
    //                     } else {
    //                         console.log("User refuse");
    //                     }
    //                 });
    //             }
    //         });
    //     }
    //     return (() => {
    //         bleManagerEmitter.remove('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    //         bleManagerEmitter.remove('BleManagerStopScan', handleStopScan);
    //     })

    // }, []);

    // useEffect(() => {
    //     console.log(list)
    // }, [list])

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                setIsJoinClass(false)
                const snapshot = await database.ref('/').once('value')

                snapshot.forEach(child => {
                    if (currentUser.uid === child.key) {
                        setIsJoinClass(true)
                    }
                })
            }
            getData()
        }, [database, currentUser])
    );

    const renderClass = () => {
        switch (isJoinClass) {
            case true:
                return (
                    <View style={{ height: 200, margin: 10 }}>
                        <TouchableWithoutFeedback onPress={() =>setIsJoinClass(false) }>
                            <Card style={{
                                flex: 1,
                                backgroundColor: "#ffffff",
                            }}>
                                {/* <Text>Back</Text>
                            <Text>to Class</Text>
                            <Text></Text> */}
                            </Card>
                        </TouchableWithoutFeedback>
                    </View>
                )
            default:
                return (
                    <View style={{ height: 200, flexDirection: "row", margin: 10 }}>
                        <TouchableWithoutFeedback onPress={handleJoinClass}>
                            <View style={{ flex: 1 }}>
                                <Card
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#ffffff",
                                        marginRight: 2.5,
                                    }}>
                                    <View style={{ margin: 10, position: "relative" }}>
                                        <View style={{ backgroundColor: "#C4C4C4", flex: 1, height: "30%", width: "43.5%", position: "absolute", marginTop: "4%" }} />
                                        <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic", lineHeight: 34, letterSpacing: 1 }}>Join</Text>
                                        <Text style={{ fontSize: 32, fontWeight: "bold", lineHeight: 34, letterSpacing: 1 }}>a Class</Text>
                                    </View>
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handleCreateClass}>
                            <View style={{ flex: 1 }}>
                                <Card style={{
                                    flex: 1,
                                    backgroundColor: "#ffffff",
                                    marginLeft: 2.5,
                                }}>
                                    <View style={{ margin: 10, flex: 1, justifyContent: "flex-end" }}>
                                        <View style={{ position: "relative" }}>
                                            <View style={{ backgroundColor: "#C4C4C4", flex: 1, height: "50%", width: "65%", position: "absolute", marginTop: "5%" }} />
                                            <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic", lineHeight: 34, letterSpacing: 1 }}>Create</Text>
                                        </View>
                                        <Text style={{ fontSize: 32, fontWeight: "bold", lineHeight: 34, letterSpacing: 1 }}>a Class</Text>
                                    </View>
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
            <KetonesBreath />
            <Card
                style={{
                    height: 130,
                    backgroundColor: "#ffffff",
                    marginHorizontal: 10,
                    marginTop: 10,
                }}>
                <View style={{ borderRadius: 10, }}>
                    <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1 }}>Heart Rate</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>current</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={{ fontSize: 48, fontWeight: "bold", lineHeight: 50, letterSpacing: 1, fontStyle: "italic" }}>123</Text>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIconsIcon
                                        name="heart-outline"
                                        size={24}
                                    />
                                    <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>BPM</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.6 }}>
                        </View>
                    </View>
                </View>
            </Card>
            {/* This is DeviceComponent */}
            <DeviceComponent />

            {renderClass()}

            <View style={{ flex: 1 }}>
                <History />
            </View>
        </ScrollView>
    );
}
