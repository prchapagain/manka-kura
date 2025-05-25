
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Language, AppTranslations } from '../types';
import { DEFAULT_LANGUAGE, LOCAL_STORAGE_KEYS, TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: keyof AppTranslations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as Language | null) || DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const translate = (key: keyof AppTranslations): string => {
    return TRANSLATIONS[key]?.[language] || (TRANSLATIONS[key]?.[Language.ENGLISH] || key.toString());
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
