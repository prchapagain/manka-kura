import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoadingUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      if (storedUser) {
        setCurrentUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      // Handle error or clear storage if corrupted
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
