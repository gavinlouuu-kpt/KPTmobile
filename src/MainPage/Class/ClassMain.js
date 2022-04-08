import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { useAuth } from '../../Authentication/AuthProvider';


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
        }

    }, [creatorID, database])

    useEffect(() => {
        if (creatorID !== null) {
            const onValueChange = database
                .ref(`/`)
                .on('value', snapshot => {
                    const ExistClass = new Set()
                    snapshot.forEach(child => {
                        ExistClass.add(child.key)
                    })
                    if (!ExistClass.has(creatorID)) {
                        setPanelIndex(0)
                    }
                });

            // Stop listening for updates when no longer required
            return () => database.ref('/').off('value', onValueChange);
        }

    }, [creatorID, database])

    return (
        <View style={{ flex: 1 }}>
            {renderView()}
        </View>
    )
}