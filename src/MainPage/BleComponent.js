import { useState, useEffect } from 'react';
import BleManager from 'react-native-ble-manager'
import { bytesToString } from 'convert-string';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function BleComponent({navigation, route}){

    const [deviceConnect, setDeviceConnect] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [list, setList] = useState([]);
    const [readValue, setReadValue] = useState("0");
    const peripherals = new Map();

    var found = false;
  
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
  
    const handleStopScan = () => {
      console.log('Scan is stopped');
      setIsScanning(false);
      if(!found){
        setList([]);
      }else{
        found = false;
      }
    }
  
    const handleDisconnectedPeripheral = (data) => {
      let peripheral = peripherals.get(data.peripheral);
      if (peripheral) {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
      console.log('Disconnected from ' + data.peripheral);
      setDeviceConnect(false);
    }  
  
    const handleDiscoverPeripheral = (peripheral) => {
      console.log('Got ble peripheral', peripheral);
      if (!peripheral.name) {
        peripheral.name = 'NO NAME';
      }
      if(peripheral.rssi > -30){
        console.log('Found Device');
        found = true; 
        peripherals.set(peripheral.id, peripheral);
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);
          setDeviceConnect(true);
        }).catch((error) => {
          console.log('Connection error', error);
        });
        setList(Array.from(peripherals.values()));
      }    
    }
  
    const handleUpdateValueForCharacteristic = (data) => {
      console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
      const val = bytesToString(data.value);
      console.log('String Data: ', val);
      setReadValue(val)
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
      const handleValue = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
  
      return(() => {
        console.log('unmount');
        handleDisconnect.remove();
        handleStop.remove();
        handleDiscover.remove();
        handleValue.remove();
      });
    }, []);

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
          <TouchableHighlight onPress={() => peripheralConnection(item) }>
            <View style={[styles.row, {backgroundColor: color}]}>
              <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
              <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
              <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
            </View>
          </TouchableHighlight>
        );
      }

    return (
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>
                
                <View style={{margin: 10}}>
                  <Button 
                    title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                    onPress={() => startScan() } 
                  />            
                </View>
    
                <View style={{margin: 10}}>
                  <Button title="Start Notification" onPress={() => updateReadValue() } />
                </View>
    
                {(list.length == 0) &&
                  <View style={{flex:1, margin: 20}}>
                    <Text style={{textAlign: 'center'}}>No peripherals</Text>
                  </View>
                }
    
                <View style={{flex:1, margin: 5}}>
                  <Text style={{textAlign: 'center'}}>{readValue}</Text>
                </View>
              </View>              
            </ScrollView>
            <FlatList
                data={list}
                renderItem={({ item }) => renderItem(item) }
                keyExtractor={item => item.id}
              />              
          </SafeAreaView>
        </View>
      );
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });