import React, { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth} from 'firebase/auth';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});

    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(getAuth(), email, password);
    }

    const logIn = (email,password) => {
        return signInWithEmailAndPassword(getAuth(), email, password);
    }

    const logout = () => {
        return signOut(getAuth());
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    },[])

    return(
        <UserContext.Provider value={{createUser, user, logout, logIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}