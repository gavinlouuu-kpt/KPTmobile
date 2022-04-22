import React from 'react';
import { View, ScrollView } from 'react-native';

import DeviceComponent from './DeviceComponent';
import KetonesBreath from './KetonesBreath';

import History from "./Profile/History";
import ClassMain from './Class/ClassMain';
import HeartRate from './HeartRate';

export default function Main({ navigation }) {


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