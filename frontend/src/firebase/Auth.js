import React, { useState, useEffect } from 'react'
import firebaseApp from './Firebase'

export const AuthConext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(setCurrentUser);
    }, [])
    return <AuthConext.Provider value={currentUser}>{children}</AuthConext.Provider>
};