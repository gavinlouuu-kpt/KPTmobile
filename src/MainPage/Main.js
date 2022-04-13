import React, { useEffect, useState } from 'react';
import { Text, View, NativeModules, NativeEventEmitter, Platform, PermissionsAndroid, ScrollView, StyleSheet } from 'react-native';

import {
    LineChart,
} from "react-native-chart-kit";

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import DeviceComponent from './DeviceComponent';
import KetonesBreath from './KetonesBreath';

import History from "./Profile/History";
import ClassMain from './Class/ClassMain';
import HeartRate from './HeartRate';

export default function Main({ navigation }) {

    /* --------Start of Ble Coding-------- */

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
    /* --------End of Ble Coding-------- */

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>

            <KetonesBreath />

            <HeartRate />

            <DeviceComponent />

            <ClassMain />

            <View style={{ flex: 1 }}>
                <History needRender={false} />
            </View>
        </ScrollView>
    );
}