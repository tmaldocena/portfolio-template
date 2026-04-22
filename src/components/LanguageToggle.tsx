import { useLanguage } from '../contexts/LanguageContext'

export function LanguageToggle() {
  const { language, setLanguage, config } = useLanguage()

  if (config?.language_mode !== 'bilingual') return null

  return (
    <div className="fixed top-0 right-0 z-50 p-4 md:p-6">
      <button
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        className="bg-black/80 backdrop-blur-md border border-primary/10 rounded-full px-4 py-2 text-[10px] sm:text-xs font-medium tracking-widest text-primary/60 hover:text-primary transition-colors shadow-xl"
      >
        <span className={language === 'en' ? 'text-primary font-bold' : ''}>EN</span>
        <span className="mx-1 opacity-20">|</span>
        <span className={language === 'es' ? 'text-primary font-bold' : ''}>ES</span>
      </button>
    </div>
  )
}
