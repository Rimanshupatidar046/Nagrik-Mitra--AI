import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, LANGUAGES } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('nagrik_lang');
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // localStorage unavailable fallback
    }
    return 'en';
  });

  const setLanguage = (langCode) => {
    if (!LANGUAGES.some((l) => l.code === langCode)) return;
    setLanguageState(langCode);
    try {
      localStorage.setItem('nagrik_lang', langCode);
    } catch (e) {
      console.warn('Could not persist language to localStorage:', e);
    }
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  /**
   * Translate a key with safe fallback:
   * 1. Check current language translation
   * 2. If missing, fall back to English translation
   * 3. If missing in English, fall back to provided fallback parameter
   * 4. If no fallback parameter, return the key itself
   * Never returns undefined or blank string unless specifically translated to that.
   */
  const t = (key, fallback) => {
    if (!key) return '';
    const currentDict = translations[language] || {};
    const fallbackDict = translations['en'] || {};

    if (currentDict[key] !== undefined && currentDict[key] !== '') {
      return currentDict[key];
    }
    if (fallbackDict[key] !== undefined && fallbackDict[key] !== '') {
      return fallbackDict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        languages: LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      currentLanguage: LANGUAGES[0],
      languages: LANGUAGES,
      setLanguage: () => {},
      t: (key, fallback) => (fallback !== undefined ? fallback : key),
    };
  }
  return context;
};

export default LanguageContext;
