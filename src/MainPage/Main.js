import React, { useEffect, useState } from 'react';
import { Text, View, NativeModules, NativeEventEmitter, Platform, PermissionsAndroid, ScrollView, StyleSheet } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceComponent from './DeviceComponent';
import KetonesBreath from './KetonesBreath';

import { randomHeartRate } from "../utils";

import Card from '../Card';
import History from "./Profile/History";
import ClassMain from './Class/ClassMain';

export default function Main({ navigation }) {

    /* --------Start of Ble Coding-------- */
    

    // const [isScanning, setIsScanning] = useState(false);
    // const peripherals = new Map();
    // const [list, setList] = useState([]);

    // const startScan = () => {
    //     if (!isScanning) {
    //         BleManager.scan([], 3, true).then((results) => {
    //             console.log('Scanning...');
    //             console.log(results)
    //             setIsScanning(true);
    //         }).catch(err => {
    //             console.error(err);
    //         });
    //     }
    // }

    // const handleStopScan = () => {
    //     console.log('Scan is stopped');
    //     setIsScanning(false);
    // }

    // const handleDiscoverPeripheral = (peripheral) => {
    //     console.log('Got ble peripheral', peripheral);
    //     if (!peripheral.name) {
    //         peripheral.name = 'NO NAME';
    //     }
    //     peripherals.set(peripheral.id, peripheral);
    //     setList(Array.from(peripherals.values()));
    // }



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
    /* --------End of Ble Coding-------- */

    const [heartRate, setHeartRate] = useState(0);

    useEffect(() => {
        const randomRate = setInterval(() => {
            setHeartRate(randomHeartRate())
        }, 1000)
        return () => clearInterval(randomRate)
    }, [])

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
                        <Text style={classes.title}>Heart Rate</Text>
                    </View>
                    <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={classes.defaultFont}>current</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={classes.resultText}>{heartRate}</Text>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIconsIcon
                                        name="heart-outline"
                                        size={24}
                                    />
                                    <Text style={classes.defaultFont}>BPM</Text>
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

            <ClassMain />

            <View style={{ flex: 1 }}>
                <History needRender={false} />
            </View>
        </ScrollView>
    );
}

const classes = StyleSheet.create({
    defaultFont: {
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 22,
        letterSpacing: 0.25
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        letterSpacing: 1
    },
    resultText: {
        fontSize: 48,
        fontWeight: "bold",
        lineHeight: 50,
        letterSpacing: 1,
        fontStyle: "italic"
    }
});