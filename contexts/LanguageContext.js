import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from 'react';
import { Language } from '../types';
import { DEFAULT_LANGUAGE, LOCAL_STORAGE_KEYS, TRANSLATIONS } from '../constants';
const LanguageContext = createContext(undefined);
export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE;
    });
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, language);
        document.documentElement.lang = language;
    }, [language]);
    const setLanguage = (newLanguage) => {
        setLanguageState(newLanguage);
    };
    const translate = (key) => {
        return TRANSLATIONS[key]?.[language] || (TRANSLATIONS[key]?.[Language.ENGLISH] || key.toString());
    };
    return (_jsx(LanguageContext.Provider, { value: { language, setLanguage, translate }, children: children }));
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
