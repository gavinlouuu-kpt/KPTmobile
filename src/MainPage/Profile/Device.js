import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import DeviceComponent from '../DeviceComponent';

import Card from '../../Card';

import { useBle } from '../BleProvider';

export default function Device() {

    const { list, handleConnect } = useBle();


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleConnect(item)}>
            <View style={{ backgroundColor: "#ffffff", marginHorizontal: 10, marginVertical: 2.5, paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 12, textAlign: 'center', color: '#333333', padding: 10 }}>{item.name}</Text>
                <Text style={{ fontSize: 10, textAlign: 'center', color: '#333333', padding: 2 }}>RSSI: {item.rssi}</Text>
                <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
            </View>
        </TouchableOpacity>
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
                    <View style={{ flex: 1, margin: 20 }}>
                        <Text style={{ textAlign: 'center' }}>No peripherals</Text>
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