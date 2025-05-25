import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';
const UserContext = createContext(undefined);
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUserState] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
            if (storedUser) {
                setCurrentUserState(JSON.parse(storedUser));
            }
        }
        catch (error) {
            console.error("Failed to load user from localStorage", error);
            // Handle error or clear storage if corrupted
            localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
        }
        finally {
            setIsLoadingUser(false);
        }
    }, []);
    const setCurrentUser = (user) => {
        setCurrentUserState(user);
        if (user) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        }
        else {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
        }
    };
    return (_jsx(UserContext.Provider, { value: { currentUser, setCurrentUser, isLoadingUser }, children: children }));
};
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
