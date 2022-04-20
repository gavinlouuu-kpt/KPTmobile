import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import DeviceComponent from '../DeviceComponent';

import Card from '../../Card';

import BleManager from 'react-native-ble-manager';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'ESP32-1231231123',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'ESP32-1231231123',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'ESP32-1231231123',
    },
];


export default function Device() {

    const [list, setList] = useState([]);

    useEffect(() => {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if(results.length == 0) {
                setList([]);
            }else{
                setList(Array.from(results.values()));
            }
        })
    }, [])
        

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: color, marginHorizontal: 10, marginVertical: 2.5, paddingHorizontal: 10 }}>
            <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
            <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
            <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
    );

    return (
        <>
            <DeviceComponent />
            <Card
                style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    margin: 10,
                }}
            >
                <Text style={classes.title}>
                    Searching ...
                </Text>
                {(list.length == 0) &&
                    <View style={{flex:1, margin: 20}}>
                        <Text style={{textAlign: 'center'}}>No peripherals</Text>
                    </View>
                }
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </Card>
        </>
    )
}

const classes = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 32,
        letterSpacing: 1,
        margin: 10
    },
    container: {
        backgroundColor: "#F5F5F5",
        marginHorizontal: 10,
        marginVertical: 2.5,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        letterSpacing: 0.75
    }
})