import { motion } from 'framer-motion'
import { AboutSection } from '../components/AboutSection'
import { useLanguage } from '../contexts/LanguageContext'

export function AboutPage() {
  const { t } = useLanguage()

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen pt-24"
    >
      <div className="px-4 md:px-8 max-w-7xl mx-auto mb-10">
        <h1 className="text-primary text-5xl md:text-7xl font-serif mb-4">{t.nav.about}</h1>
      </div>
      <AboutSection />
      <div className="px-4 md:px-8 max-w-3xl mx-auto pb-12 text-primary/70 leading-relaxed space-y-6">
        <p>
          {t.about.body}
        </p>
      </div>

      <div className="px-4 md:px-8 max-w-3xl mx-auto pb-32">
        <h2 className="text-primary text-2xl font-serif mb-6">{t.about.expertise_title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {t.about.expertise.map((exp: any, i: number) => (
            <div key={i}>
              <p className="text-primary/40 text-[10px] uppercase tracking-widest mb-2">{exp.label}</p>
              <p className="text-primary text-sm">{exp.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
