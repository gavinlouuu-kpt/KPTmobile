import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet, LogBox } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Card from '../../Card';

import { useAuth } from '../../Authentication/AuthProvider';


/********************************/
//Have an warning that passing a function to Navigation State!
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
/********************************/



export default function ClassMain() {

    const navigation = useNavigation();

    const { database, currentUser } = useAuth()

    const [isCreatedClass, setIsCreatedClass] = useState(false)
    const [classInfo, setClassInfo] = useState(null)

    const handleCreateClass = () => {
        navigation.navigate("ClassInstructor", {
            setClassInfo: setClassInfo
        })
    }

    const handleJoinClass = () => {
        navigation.navigate("ClassJoin")
    }

    const handleGoBackClass = () => {
        if (classInfo.group === "T") {
            handleCreateClass()
        } else if (classInfo.group === "S") {
            navigation.navigate("ClassJoin", {
                classID: classInfo.classID
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                setIsCreatedClass(false)
                const snapshot = await database.ref('/').once('value')

                snapshot.forEach(child => {
                    if (currentUser.uid === child.key) {
                        setClassInfo({
                            classID: child.val().ClassID,
                            group: "T"
                        })
                        setIsCreatedClass(true)
                    } else {
                        if (child.hasChild("user") && child.val().user[currentUser.uid] !== undefined) {
                            setClassInfo({
                                classID: child.val().ClassID,
                                group: "S"
                            })
                            setIsCreatedClass(true)
                        }
                    }

                })
            }
            getData()
        }, [database, currentUser])
    );

    const renderClass = () => {
        switch (isCreatedClass) {
            case true:
                return (
                    <View style={{ height: 200, margin: 10 }}>
                        <TouchableWithoutFeedback onPress={handleGoBackClass}>
                            <View style={{ flex: 1 }}>
                                <Card style={{
                                    flex: 1,
                                    backgroundColor: "#ffffff",
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    padding: 5
                                }}>
                                    <View style={{ position: "relative" }}>
                                        <View style={[classes.backgroundColor, { height: "70%", width: 70, marginTop: 5 }]} />
                                        <Text style={classes.highLightFont}>Back</Text>
                                    </View>
                                    <Text style={classes.defaultFont}>to Class</Text>
                                    <Text style={classes.defaultFont}>{classInfo.classID}</Text>
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
            default:
                return (
                    <View style={{ height: 200, flexDirection: "row", margin: 10 }}>
                        <TouchableWithoutFeedback onPress={handleJoinClass}>
                            <View style={{ flex: 1 }}>
                                <Card
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#ffffff",
                                        marginRight: 2.5,
                                    }}>
                                    <View style={{ margin: 10, position: "relative" }}>
                                        <View style={[classes.backgroundColor, { height: "30%", width: "43.5%", marginTop: "4%" }]} />
                                        <Text style={classes.highLightFont}>Join</Text>
                                        <Text style={classes.defaultFont}>a Class</Text>
                                    </View>
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handleCreateClass}>
                            <View style={{ flex: 1 }}>
                                <Card style={{
                                    flex: 1,
                                    backgroundColor: "#ffffff",
                                    marginLeft: 2.5,
                                }}>
                                    <View style={{ margin: 10, flex: 1, justifyContent: "flex-end" }}>
                                        <View style={{ position: "relative" }}>
                                            <View style={[classes.backgroundColor, { height: "50%", width: "65%", marginTop: "5%" }]} />
                                            <Text style={classes.highLightFont}>Create</Text>
                                        </View>
                                        <Text style={classes.defaultFont}>a Class</Text>
                                    </View>
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
        }
    }

    return (
        <>
            {renderClass()}
        </>
    )
}

const classes = StyleSheet.create({
    defaultFont: {
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 34,
        letterSpacing: 1
    },
    highLightFont: {
        fontSize: 32,
        fontWeight: "bold",
        fontStyle: "italic",
        lineHeight: 34,
        letterSpacing: 1
    },
    backgroundColor: {
        backgroundColor: "#C4C4C4",
        flex: 1,
        position: "absolute"
    }
});