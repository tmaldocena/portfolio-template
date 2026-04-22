import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { WordsPullUp } from './WordsPullUp'
import { useLanguage } from '../contexts/LanguageContext'

const customEase = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="h-screen p-4 md:p-6 bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background video */}
        <video
          src="https://cdn.pixabay.com/video/2020/07/02/43661-436237700_large.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-6 pb-6 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-4">
            {/* Giant heading */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] relative"
                style={{
                  fontSize: 'clamp(18vw, 20vw, 22vw)',
                  color: '#E1E0CC',
                }}
              >
                <WordsPullUp
                  text={t.hero.brand}
                  style={{ color: '#E1E0CC' }}
                  showAsterisk
                />
              </h1>
            </div>

            {/* Right column: description + CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 pb-2 lg:pb-4">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: customEase }}
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7, ease: customEase }}
              >
                <button className="group flex items-center gap-2 hover:gap-3 transition-all bg-primary rounded-full pl-4 pr-1 py-1 font-medium text-sm sm:text-base text-black">
                  {t.hero.cta}
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <ArrowRight size={16} color="#DEDBC8" />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
