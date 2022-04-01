import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userStat, setUserStat] = useState({
        username: "Loading",
    });
    const [loading, setLoading] = useState(true);

    const Login = async (email, password) =>
        await auth().signInWithEmailAndPassword(email, password);

    const Register = async (email, password) =>
        await auth().createUserWithEmailAndPassword(email, password);

    const Logout = async () => await auth().signOut();

    const PasswordReset = async email => {
        await auth().sendPasswordResetEmail(email)
    }

    const AddUser = (user, username, email) => {
        const newUsername = username === "" ? "user" : username
        firestore().collection("userStat").doc(user.user.uid).set(
            {
                createdAt: firestore.FieldValue.serverTimestamp(),
                id: user.user.uid,
                username: newUsername,
                email: email
            }, {
            merge: true
        }
        )
    }

    useEffect(() => {
        if (currentUser !== null) {
            const getData = async () => {
                const user = await firestore().collection('userStat').doc(currentUser.uid).get();
                setUserStat({
                    username: user.data().username,
                })
            }
            getData()
        }
    }, [currentUser])

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        userStat,
        Login,
        Register,
        Logout,
        PasswordReset,
        AddUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}