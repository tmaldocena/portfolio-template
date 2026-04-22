import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { useLanguage } from '../contexts/LanguageContext'

const cardEase = [0.22, 1, 0.36, 1] as const

function FeatureInfoCard({
  card,
  delay,
}: {
  card: any
  delay: number
}) {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="bg-[#212121] rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col justify-between h-full min-h-[300px] lg:min-h-0"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: cardEase }}
    >
      <div>
        {/* Icon */}
        <div className="mb-4">
          <img
            src={card.icon}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
          />
        </div>

        {/* Number + Title */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-primary font-medium text-base sm:text-lg leading-tight max-w-[80%]">
            {card.title}
          </h3>
          <span className="text-gray-600 text-xs font-mono ml-2 mt-0.5">{card.number}</span>
        </div>

        {/* Checklist */}
        <ul className="flex flex-col gap-2">
          {card.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-gray-400 text-xs sm:text-sm leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn more */}
      <div className="mt-6">
        <a href={card.link || '#'} target={card.link && card.link !== '#' ? "_blank" : undefined} rel="noreferrer" className="flex w-fit items-center gap-1 text-primary/70 hover:text-primary text-xs sm:text-sm transition-colors group">
          {t.features.learn_more}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" style={{ transform: 'rotate(-45deg)' }} />
        </a>
      </div>
    </motion.div>
  )
}

function VideoCard({ delay }: { delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl md:rounded-3xl overflow-hidden h-full min-h-[300px] lg:min-h-0"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: cardEase }}
    >
      <video
        src="https://cdn.pixabay.com/video/2025/08/25/299577_large.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5">
        <p className="font-medium text-sm sm:text-base" style={{ color: '#E1E0CC' }}>
          Your creative canvas.
        </p>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const { t } = useLanguage()

  const featureCards = [
    {
      number: '01',
      title: t.features.cards[0].title,
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
      items: t.features.cards[0].items,
      link: t.features.cards[0].link,
    },
    {
      number: '02',
      title: t.features.cards[1].title,
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
      items: t.features.cards[1].items,
      link: t.features.cards[1].link,
    },
    {
      number: '03',
      title: t.features.cards[2].title,
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
      items: t.features.cards[2].items,
      link: t.features.cards[2].link,
    },
  ]

  return (
    <section className="min-h-screen bg-black relative py-20 md:py-32 px-4 md:px-6">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: t.features.header,
                  className: 'text-primary',
                },
              ]}
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mt-1">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: t.features.subheader,
                  className: 'text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          <VideoCard delay={0} />
          {featureCards.map((card, i) => (
            <FeatureInfoCard key={card.number} card={card} delay={(i + 1) * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
