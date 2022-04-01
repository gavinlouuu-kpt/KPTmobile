import React from 'react'
import { View, Text, FlatList } from 'react-native'
import DeviceComponent from '../DeviceComponent';

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

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: "#F5F5F5", marginHorizontal: 10, marginVertical: 2.5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, letterSpacing: 0.75 }}>
                {item.title}
            </Text>
        </View>
    );

    return (
        <>
            <DeviceComponent />
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    margin: 10,
                    // marginHorizontal: 10,
                    // marginTop: 10,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: "bold", lineHeight: 32, letterSpacing: 1, margin: 10 }}>
                    Searching ...
                </Text>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )
}