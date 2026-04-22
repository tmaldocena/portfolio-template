import { useState } from 'react'
import { motion } from 'framer-motion'
import { QuestionnaireForm } from '../components/QuestionnaireForm'
import { Download, Copy, Sparkles, Check } from 'lucide-react'

// Initial template structure
const initialContent = {
  config: {
    language_mode: "bilingual",
    social: {
      instagram: "https://instagram.com/client",
      linkedin: "https://linkedin.com/client",
      behance: "https://behance.net/client",
      email: "hello@client.com"
    }
  },
  en: {
    nav: { home: "Home", portfolio: "Portfolio", about: "About me", contact: "Contact" },
    hero: { brand: "Client Name", description: "Write a short bio here.", cta: "Join the lab" },
    about: {
      label: "Visual arts",
      segments: ["I am Name,", "a director.", "I have skills in X and Y."],
      body: "Expanded bio goes here.",
      expertise_title: "Expertise",
      expertise: [
        { label: "Direction", value: "Narrative & Commercial" },
        { label: "Visuals", value: "VFX & Color Grading" },
        { label: "Design", value: "Production & Concept" }
      ]
    },
    features: {
      header: "Studio-grade workflows.",
      subheader: "Built for pure vision.",
      learn_more: "Learn more",
      cards: [
        { title: "Service 1", items: ["Detail 1", "Detail 2", "Detail 3"], link: "#" },
        { title: "Service 2", items: ["Detail 1", "Detail 2"], link: "#" },
        { title: "Service 3", items: ["Detail 1", "Detail 2"], link: "#" }
      ]
    },
    portfolio: {
      title: "Work",
      description: "Projects that define our vision.",
      projects: [
        { title: "Project 1", category: "Film", client: "Client A", description: "Expanded project overview...", media: "", link: "#" },
        { title: "Project 2", category: "Doc", client: "Client B", description: "Expanded project overview...", media: "", link: "#" },
        { title: "Project 3", category: "Commercial", client: "Client C", description: "Expanded project overview...", media: "", link: "#" },
        { title: "Project 4", category: "Music Video", client: "Client D", description: "Expanded project overview...", media: "", link: "#" }
      ]
    },
    contact: {
      title: "Get in touch",
      inquiries_title: "Inquiries",
      inquiries_desc: "Available for freelance opportunities worldwide.",
      form: {
        name: "Name", email: "Email", message: "Message",
        placeholder_name: "Your name", placeholder_email: "Your email", placeholder_message: "How can I help you?",
        submit: "Send Message"
      }
    }
  },
  es: {
    nav: { home: "Inicio", portfolio: "Portfolio", about: "Sobre mí", contact: "Contacto" },
    hero: { brand: "Client Name", description: "Breve bio aquí.", cta: "Súmate al lab" },
    about: {
      label: "Artes visuales",
      segments: ["Soy Nombre,", "director.", "Tengo habilidades en X e Y."],
      body: "Bio expandida aquí.",
      expertise_title: "Experiencia",
      expertise: [
        { label: "Dirección", value: "Narrativo y Comercial" },
        { label: "Visuales", value: "VFX y Color Grading" },
        { label: "Diseño", value: "Producción y Concepto" }
      ]
    },
    features: {
      header: "Workflows de estudio.",
      subheader: "Creado para visión pura.",
      learn_more: "Saber más",
      cards: [
        { title: "Servicio 1", items: ["Detalle 1", "Detalle 2", "Detalle 3"], link: "#" },
        { title: "Servicio 2", items: ["Detalle 1", "Detalle 2"], link: "#" },
        { title: "Servicio 3", items: ["Detalle 1", "Detalle 2"], link: "#" }
      ]
    },
    portfolio: {
      title: "Proyectos",
      description: "Proyectos que definen nuestra visión.",
      projects: [
        { title: "Proyecto 1", category: "Film", client: "Cliente A", description: "Descripción detallada...", media: "", link: "#" },
        { title: "Proyecto 2", category: "Doc", client: "Cliente B", description: "Descripción detallada...", media: "", link: "#" },
        { title: "Proyecto 3", category: "Commercial", client: "Cliente C", description: "Descripción detallada...", media: "", link: "#" },
        { title: "Proyecto 4", category: "Music Video", client: "Cliente D", description: "Descripción detallada...", media: "", link: "#" }
      ]
    },
    contact: {
      title: "Hablemos",
      inquiries_title: "Consultas",
      inquiries_desc: "Disponible para freelance en todo el mundo.",
      form: {
        name: "Nombre", email: "Email", message: "Mensaje",
        placeholder_name: "Tu nombre", placeholder_email: "Tu email", placeholder_message: "¿En qué puedo ayudarte?",
        submit: "Enviar Mensaje"
      }
    }
  }
}

export function OnboardingPage() {
  const [content, setContent] = useState(initialContent)
  const [copied, setCopied] = useState(false)
  const [rawBio, setRawBio] = useState("")

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "content.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyPrompt = () => {
    const prompt = `I am building a premium, minimalist portfolio site. My raw bio is:\n\n"${rawBio}"\n\nPlease rewrite this into:\n1. A short, punchy 1-sentence hero description.\n2. A 3-segment short intro (e.g. ["I am X,", "a Y.", "I have skills in Z."])\n3. An expanded paragraph biography sounding professional but creative.\nProvide it in both English and informal Spanish ("tú/vos").`
    navigator.clipboard.writeText(prompt)
    alert("Prompt copied! Paste it into your favorite AI assistant and paste the results in the form below.")
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-black min-h-screen pt-32 pb-32 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Side: Form */}
        <div className="flex-1 space-y-12">
          <div>
            <h1 className="text-primary text-4xl md:text-5xl font-serif mb-4">Client Onboarding</h1>
            <p className="text-primary/60">Fill out this form to generate the <code>content.json</code> file for a new client site.</p>
          </div>

          {/* AI Bio Polish Box */}
          <div className="bg-[#101010] border border-primary/10 rounded-2xl p-6">
            <h2 className="text-primary font-serif text-xl flex items-center gap-2 mb-4">
              <Sparkles size={18} /> AI Bio Assistant
            </h2>
            <p className="text-primary/60 text-sm mb-4">Dump the client's raw bio here, and generate an AI prompt to format it perfectly for the Prisma template.</p>
            <textarea 
              value={rawBio}
              onChange={(e) => setRawBio(e.target.value)}
              placeholder="Paste raw bio here..."
              className="w-full bg-black border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary/30 min-h-[100px] mb-4"
            />
            <button 
              onClick={handleCopyPrompt}
              className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2"
            >
              <Copy size={14} /> Copy AI Prompt
            </button>
          </div>

          <QuestionnaireForm content={content} setContent={setContent} />
        </div>

        {/* Right Side: JSON Preview */}
        <div className="lg:w-[400px] lg:flex-shrink-0">
          <div className="sticky top-32 bg-[#101010] border border-primary/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-black/50 p-4 border-b border-primary/10 flex justify-between items-center">
              <h3 className="text-primary font-mono text-sm">content.json</h3>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary/60 hover:text-primary">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <button onClick={handleDownload} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary/60 hover:text-primary">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <pre className="p-4 text-[10px] text-primary/70 overflow-y-auto max-h-[600px] font-mono leading-relaxed">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
