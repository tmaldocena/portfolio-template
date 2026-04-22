import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { AnimatedLetter } from './AnimatedLetter'
import { useLanguage } from '../contexts/LanguageContext'

export function AboutSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = t.about.body.split('')

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center">
          {/* Label */}
          <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-6 md:mb-8">
            {t.about.label}
          </p>

          {/* Main heading with multi-style pull-up */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 md:mb-12">
            <WordsPullUpMultiStyle
              segments={[
                { text: t.about.segments[0] + ' ', className: 'font-normal text-primary' },
                { text: t.about.segments[1] + ' ', className: 'font-normal italic font-serif text-primary' },
                {
                  text: t.about.segments[2],
                  className: 'font-normal text-primary',
                },
              ]}
            />
          </h2>

          {/* Scroll-linked character reveal */}
          <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#DEDBC8' }}>
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                index={i}
                totalChars={chars.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
