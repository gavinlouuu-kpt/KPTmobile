import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';

import { useAuth } from '../../Authentication/AuthProvider';

import { Input, Button } from 'native-base';

import StudentLogin from './StudentLogin';
import ClassResult from './ClassResult';

export default function ClassMain() {

    const { database, currentUser } = useAuth()

    const [number, setNumber] = useState(0)
    const [creatorID, setCreatorID] = useState(null)
    const [panelIndex, setPanelIndex] = useState(0)

    const handleInputClassID = async (ID) => {
        setNumber(ID)
    }

    const handleContinue = async () => {
        const isCorrectNum = /^[0-9]{4}$/.test(Number(number))
        if (isCorrectNum) {
            const snapshot = await database.ref('/').once('value')
            snapshot.forEach(child => {
                if (child.val().ClassID === Number(number)) {
                    setCreatorID(child.key)
                    setNumber(Number(number))
                }
            })
        }
    }

    const renderView = () => {
        switch (panelIndex) {
            case 1:
                return <ClassResult number={number} />
            default:
                return <StudentLogin
                    handleContinue={handleContinue}
                    handleInputClassID={handleInputClassID}
                />
        }
    }

    useEffect(() => {
        if (creatorID !== null) {
            database.ref(`${creatorID}/user`).update({
                [currentUser.uid]: 0
            }).then(() => setPanelIndex(1))
        } else {
            setPanelIndex(0)
        }

    }, [creatorID, database])

    return (
        <View style={{ flex: 1 }}>
            {renderView()}
        </View>
    )
}