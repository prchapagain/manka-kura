import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from 'react';
import { Theme } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
        return storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT);
    });
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === Theme.DARK) {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
