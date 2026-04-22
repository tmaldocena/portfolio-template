import React, { createContext, useContext, useState, useEffect } from 'react'
import siteContent from '../data/content.json'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: any // Translation content for the current language
  config: any // Site configuration
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const config = (siteContent as any).config || { language_mode: 'bilingual', social: {} }

  // Initialize from localStorage if available, otherwise default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (config.language_mode === 'en_only') return 'en'
    if (config.language_mode === 'es_only') return 'es'
    
    const saved = localStorage.getItem('language')
    return (saved === 'en' || saved === 'es') ? saved : 'en'
  })

  // Watch for config changes (e.g. during onboarding preview updates)
  useEffect(() => {
    if (config.language_mode === 'en_only') setLanguageState('en')
    if (config.language_mode === 'es_only') setLanguageState('es')
  }, [config.language_mode])

  const setLanguage = (lang: Language) => {
    if (config.language_mode !== 'bilingual') return // Block changes if not bilingual
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (siteContent as any)[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, config }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
