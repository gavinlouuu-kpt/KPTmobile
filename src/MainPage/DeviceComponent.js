import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native'

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../Card';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function DeviceComponent() {

    const [deviceConnect, setDeviceConnect] = useState(false);
    const [watchConnect, setWatchConnect] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [list, setList] = useState([]);
    const peripherals = new Map();

    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
    }

    const handleDisconnectedPeripheral = (data) => {
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
          peripheral.connected = false;
          peripherals.set(peripheral.id, peripheral);
          setList(Array.from(peripherals.values()));
        }
        setDeviceConnect(false)
        console.log('Disconnected from ' + data.peripheral);
    }  

    const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
          peripheral.name = 'NO NAME';
        }
        if(peripheral.rssi > -30){
          console.log('Found Device');
          peripherals.set(peripheral.id, peripheral);
          BleManager.connect(peripheral.id).then(() => {
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              setList(Array.from(peripherals.values()));
            }
            setDeviceConnect(true);
            console.log('Connected to ' + peripheral.id);
          }).catch((error) => {
            console.log('Connection error', error);
          });
          setList(Array.from(peripherals.values()));
        }    
    }

    const startScan = () => {
        if (!isScanning) {
          BleManager.scan(['6E400001-B5A3-F393-E0A9-E50E24DCCA9E'], 3, false).then((results) => {
            console.log('Scanning...');
            setIsScanning(true);
          }).catch(err => {
            console.error(err);
          });
        }    
    }

    const peripheralConnection = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
                startScan();
            }else{
                for (let i = 0; i < results.length; ++i){
                    let p = results[i];
                    BleManager.disconnect(p.id);
                }
            }

        })
    }

    useEffect(() => {
        BleManager.start({showAlert: false}).then(() => {
            console.log("Module initialized");
        });

        const handleDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        const handleStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
        const handleDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
        
        return(() => {
          console.log('unmount');
          handleDisconnect.remove();
          handleStop.remove();
          handleDiscover.remove();
        });
    }, []);
    
    const handleWatchConnect = () => {
        setWatchConnect(pre => !pre)
    }

    return (
        <Card
            style={{
                height: 100,
                backgroundColor: "#ffffff",

                marginHorizontal: 10,
                marginTop: 10,
            }}>
            <View style={{ borderRadius: 10 }}>
                <View style={classes.titleContainer}>
                    <Text style={classes.title}>Devices</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={[classes.Button, { borderColor: deviceConnect ? "#000000" : "#ff0000" }]} onPress={peripheralConnection}>
                        <MaterialCommunityIconsIcon
                            name="cellphone"
                            size={24}
                        />
                        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                            <Text style={classes.nameText}>KPT Beagle</Text>
                            <Text style={[classes.statusText, { color: deviceConnect ? "#000000" : "#ff0000" }]}>{deviceConnect ? "Connected" : "Not Connected"}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[classes.Button, { borderColor: watchConnect ? "#000000" : "#ff0000" }]} onPress={handleWatchConnect}>
                        <MaterialCommunityIconsIcon
                            name="watch-variant"
                            size={24}
                        />
                        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                            <Text style={classes.nameText}>Smart Watch</Text>
                            <Text style={[classes.statusText, { color: watchConnect ? "#000000" : "#ff0000" }]}>{watchConnect ? "Connected" : "Not Connected"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    )
}

const classes = StyleSheet.create({
    titleContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        letterSpacing: 1
    },
    Button: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        flex: 1,
        padding: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    nameText: {
        fontSize: 13,
        fontWeight: "500",
        letterSpacing: 0.25
    },
    statusText: {
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 0.25,
    }
})