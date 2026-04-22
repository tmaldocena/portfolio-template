import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail, Dribbble } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function ContactPage() {
  const { t, config } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen lg:h-screen lg:overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row h-full">

        {/* Left visually rich block */}
        <div className="lg:w-5/12 h-[35vh] lg:h-screen relative shrink-0">
          {/* A sophisticated dark looping video perfect for a contact page mood */}
          <video
            src="https://cdn.pixabay.com/video/2022/12/25/144156-784280927_large.mp4"
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-70 sepia-[0.3] hue-rotate-[-30deg]"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:pb-32 w-full z-10">
            <h1 className="text-primary text-6xl md:text-8xl lg:text-[100px] font-serif leading-none tracking-tight">
              {t.contact.title}
            </h1>
          </div>
        </div>

        {/* Right content block */}
        <div className="flex-1 px-6 md:px-16 lg:px-24 py-16 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-xl mx-auto lg:mx-0 w-full space-y-12">

            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-primary text-3xl font-serif">{t.contact.inquiries_title}</h2>
              <p className="text-primary/70 leading-relaxed text-lg font-light">
                {t.contact.inquiries_desc}
              </p>

              <div className="flex gap-8 pt-4">
                {config?.social?.instagram && (
                  <a href={config.social.instagram} target="_blank" rel="noreferrer" className="text-primary/60 hover:text-primary transition-colors hover:scale-110 transform">
                    <Instagram size={22} strokeWidth={1.5} />
                  </a>
                )}
                {config?.social?.linkedin && (
                  <a href={config.social.linkedin} target="_blank" rel="noreferrer" className="text-primary/60 hover:text-primary transition-colors hover:scale-110 transform">
                    <Linkedin size={22} strokeWidth={1.5} />
                  </a>
                )}
                {config?.social?.behance && (
                  <a href={config.social.behance} target="_blank" rel="noreferrer" className="text-primary/60 hover:text-primary transition-colors hover:scale-110 transform">
                    <Dribbble size={22} strokeWidth={1.5} />
                  </a>
                )}
                <a href={`mailto:${config?.social?.email || ''}`} className="text-primary/60 hover:text-primary transition-colors hover:scale-110 transform">
                  <Mail size={22} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Contact Form: Minimalist Underline Style */}
            <form className="space-y-8">
              <div className="group">
                <label className="block text-primary/40 text-[10px] uppercase tracking-widest mb-3 group-focus-within:text-primary transition-colors">{t.contact.form.name}</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-primary/20 pb-4 text-primary text-xl focus:outline-none focus:border-primary placeholder-primary/20 transition-colors rounded-none"
                  placeholder={t.contact.form.placeholder_name}
                />
              </div>
              <div className="group">
                <label className="block text-primary/40 text-[10px] uppercase tracking-widest mb-3 group-focus-within:text-primary transition-colors">{t.contact.form.email}</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-primary/20 pb-4 text-primary text-xl focus:outline-none focus:border-primary placeholder-primary/20 transition-colors rounded-none"
                  placeholder={t.contact.form.placeholder_email}
                />
              </div>
              <div className="group">
                <label className="block text-primary/40 text-[10px] uppercase tracking-widest mb-3 group-focus-within:text-primary transition-colors">{t.contact.form.message}</label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-primary/20 pb-4 text-primary text-xl focus:outline-none focus:border-primary placeholder-primary/20 transition-colors resize-none rounded-none"
                  placeholder={t.contact.form.placeholder_message}
                />
              </div>
              <div className="pt-4">
                <button className="bg-primary text-black font-medium px-10 py-4 rounded-full hover:scale-105 transition-transform text-xs uppercase tracking-widest">
                  {t.contact.form.submit}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </motion.div>
  )
}
