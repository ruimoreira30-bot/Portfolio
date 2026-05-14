import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations, LANGUAGES, DEFAULT_LANG } from './translations.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'rm.lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(saved) ? saved : DEFAULT_LANG
  })

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return
    setLangState(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(
        'lang',
        lang === 'EN' ? 'en' : lang === 'FR' ? 'fr' : 'pt'
      )
    }
  }, [lang])

  const value = {
    lang,
    setLang,
    languages: LANGUAGES,
    t: translations[lang]
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used inside <LanguageProvider>')
  return ctx
}
