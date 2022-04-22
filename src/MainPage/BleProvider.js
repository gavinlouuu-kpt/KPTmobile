import React, {
    createContext,
    useEffect,
    useContext,
    useRef,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native'

import BleManager from 'react-native-ble-manager'

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BleContext = createContext()

export default function BleProvider({ children }) {

    const [deviceConnect, setDeviceConnect] = useState(false);
    const [watchConnect, setWatchConnect] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();

    const [list, setList] = useState([]);

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
        if (peripheral.rssi > -30) {
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
            } else {
                for (let i = 0; i < results.length; ++i) {
                    let p = results[i];
                    BleManager.disconnect(p.id);
                }
            }

        })
    }

    useEffect(() => {
        BleManager.start({ showAlert: false }).then(() => {
            console.log("Module initialized");
        });

        const handleDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        const handleStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
        const handleDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);

        return (() => {
            console.log('unmount');
            handleDisconnect.remove();
            handleStop.remove();
            handleDiscover.remove();
        });
    }, []);

    const handleWatchConnect = () => {
        setWatchConnect(pre => !pre)
    }

    const value = useMemo(
        () => ({
            watchConnect,
            deviceConnect,
            list,
            handleWatchConnect,
            peripheralConnection,
        }), [
        watchConnect,
        deviceConnect,
        list,
        handleWatchConnect,
        peripheralConnection
    ],
    );

    return (
        <BleContext.Provider value={value}>
            {children}
        </BleContext.Provider>
    )
}

export const useBle = () => useContext(BleContext);
