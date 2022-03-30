import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const Login = async (email, password) =>
        await auth().signInWithEmailAndPassword(email, password);

    const Register = async (email, password) =>
        await auth().createUserWithEmailAndPassword(email, password);

    const Logout = async () => await auth().signOut();

    const PasswordReset = async email => {
        await auth().sendPasswordResetEmail(email)
    }

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
        Login,
        Register,
        Logout,
        PasswordReset
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}