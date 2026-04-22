import React from 'react'

// Moving this OUTSIDE the main component prevents the "blur on type" issue
// because React won't destroy and recreate the functional component instance on every keystroke.
function DualInput({ 
  label, 
  valueEn, 
  valueEs, 
  onChangeEn, 
  onChangeEs, 
  type = "text" 
}: any) {
  return (
    <div className="mb-6">
      <label className="block text-primary/40 text-[10px] md:text-xs uppercase tracking-widest mb-3">{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] text-primary/30 uppercase mb-1 block">English</span>
          {type === "textarea" ? (
            <textarea
              rows={4}
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary/30"
              value={valueEn || ''}
              onChange={(e) => onChangeEn(e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary/30"
              value={valueEn || ''}
              onChange={(e) => onChangeEn(e.target.value)}
            />
          )}
        </div>
        <div>
          <span className="text-[10px] text-primary/30 uppercase mb-1 block">Español</span>
          {type === "textarea" ? (
            <textarea
              rows={4}
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary/30"
              value={valueEs || ''}
              onChange={(e) => onChangeEs(e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary/30"
              value={valueEs || ''}
              onChange={(e) => onChangeEs(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function QuestionnaireForm({ content, setContent }: { content: any, setContent: any }) {
  
  const updateConfig = (key: string, value: any, isSocial: boolean = false) => {
    setContent((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        ...(isSocial 
          ? { social: { ...prev.config.social, [key]: value } }
          : { [key]: value })
      }
    }))
  }

  const updateField = (lang: string, section: string, key: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [key]: value
        }
      }
    }))
  }

  const updateSubField = (lang: string, section: string, parentKey: string, key: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [parentKey]: {
            ...prev[lang][section][parentKey],
            [key]: value
          }
        }
      }
    }))
  }

  const updateArrayItem = (lang: string, section: string, arrayKey: string, index: number, value: any) => {
    setContent((prev: any) => {
      const newArray = [...prev[lang][section][arrayKey]]
      newArray[index] = value
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          [section]: {
            ...prev[lang][section],
            [arrayKey]: newArray
          }
        }
      }
    })
  }

  const updateExpertise = (lang: string, index: number, prop: string, value: any) => {
    setContent((prev: any) => {
      const newExp = [...prev[lang].about.expertise]
      newExp[index] = { ...newExp[index], [prop]: value }
      return {
        ...prev,
        [lang]: { ...prev[lang], about: { ...prev[lang].about, expertise: newExp } }
      }
    })
  }

  const updateFeatureCard = (lang: string, index: number, prop: string, value: any) => {
    setContent((prev: any) => {
      const newCards = [...prev[lang].features.cards]
      newCards[index] = { ...newCards[index], [prop]: value }
      return {
        ...prev,
        [lang]: { ...prev[lang], features: { ...prev[lang].features, cards: newCards } }
      }
    })
  }

  const updateProject = (lang: string, index: number, prop: string, value: any) => {
    setContent((prev: any) => {
      const newProjects = [...prev[lang].portfolio.projects]
      newProjects[index] = { ...newProjects[index], [prop]: value }
      return {
        ...prev,
        [lang]: { ...prev[lang], portfolio: { ...prev[lang].portfolio, projects: newProjects } }
      }
    })
  }

  return (
    <div className="space-y-12">
      {/* 0. Global Configuration */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">0. Global Config</h2>
        
        <div className="mb-6">
          <label className="block text-primary/40 text-xs uppercase tracking-widest mb-3">Language Mode</label>
          <select 
            className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none appearance-none"
            value={content?.config?.language_mode || 'bilingual'}
            onChange={(e) => updateConfig('language_mode', e.target.value)}
          >
            <option value="bilingual">Bilingual (English & Español Toggle)</option>
            <option value="en_only">English Only</option>
            <option value="es_only">Español Only</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-primary/40 text-xs uppercase tracking-widest mb-3">Instagram URL</label>
            <input 
              type="text" placeholder="https://instagram.com/..."
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none"
              value={content?.config?.social?.instagram || ''}
              onChange={(e) => updateConfig('instagram', e.target.value, true)}
            />
          </div>
          <div>
            <label className="block text-primary/40 text-xs uppercase tracking-widest mb-3">LinkedIn URL</label>
            <input 
              type="text" placeholder="https://linkedin.com/..."
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none"
              value={content?.config?.social?.linkedin || ''}
              onChange={(e) => updateConfig('linkedin', e.target.value, true)}
            />
          </div>
          <div>
            <label className="block text-primary/40 text-xs uppercase tracking-widest mb-3">Behance URL</label>
            <input 
              type="text" placeholder="https://behance.net/..."
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none"
              value={content?.config?.social?.behance || ''}
              onChange={(e) => updateConfig('behance', e.target.value, true)}
            />
          </div>
          <div>
            <label className="block text-primary/40 text-xs uppercase tracking-widest mb-3">Contact Email</label>
            <input 
              type="email" placeholder="hello@example.com"
              className="w-full bg-[#151515] border border-primary/10 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none"
              value={content?.config?.social?.email || ''}
              onChange={(e) => updateConfig('email', e.target.value, true)}
            />
          </div>
        </div>
      </section>

      {/* 1. Navigation */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">1. Navigation</h2>
        <DualInput label="Home Link" 
          valueEn={content.en.nav.home} valueEs={content.es.nav.home} 
          onChangeEn={(v: string) => updateSubField('en', 'nav', 'nav', 'home', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'nav', 'nav', 'home', v)} />
        <DualInput label="Portfolio Link" 
          valueEn={content.en.nav.portfolio} valueEs={content.es.nav.portfolio} 
          onChangeEn={(v: string) => updateSubField('en', 'nav', 'nav', 'portfolio', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'nav', 'nav', 'portfolio', v)} />
        <DualInput label="About Link" 
          valueEn={content.en.nav.about} valueEs={content.es.nav.about} 
          onChangeEn={(v: string) => updateSubField('en', 'nav', 'nav', 'about', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'nav', 'nav', 'about', v)} />
        <DualInput label="Contact Link" 
          valueEn={content.en.nav.contact} valueEs={content.es.nav.contact} 
          onChangeEn={(v: string) => updateSubField('en', 'nav', 'nav', 'contact', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'nav', 'nav', 'contact', v)} />
      </section>

      {/* 2. Hero Section */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">2. Hero section</h2>
        <DualInput label="Brand Name" 
          valueEn={content.en.hero.brand} valueEs={content.es.hero.brand} 
          onChangeEn={(v: string) => updateField('en', 'hero', 'brand', v)} 
          onChangeEs={(v: string) => updateField('es', 'hero', 'brand', v)} />
        <DualInput label="Hero Description" type="textarea"
          valueEn={content.en.hero.description} valueEs={content.es.hero.description} 
          onChangeEn={(v: string) => updateField('en', 'hero', 'description', v)} 
          onChangeEs={(v: string) => updateField('es', 'hero', 'description', v)} />
        <DualInput label="Call to Action (Button)" 
          valueEn={content.en.hero.cta} valueEs={content.es.hero.cta} 
          onChangeEn={(v: string) => updateField('en', 'hero', 'cta', v)} 
          onChangeEs={(v: string) => updateField('es', 'hero', 'cta', v)} />
      </section>

      {/* 3. About Section */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">3. About Section</h2>
        <DualInput label="Eyebrow Label" 
          valueEn={content.en.about.label} valueEs={content.es.about.label} 
          onChangeEn={(v: string) => updateField('en', 'about', 'label', v)} 
          onChangeEs={(v: string) => updateField('es', 'about', 'label', v)} />
        
        <h3 className="text-primary/60 text-sm font-semibold mb-4 mt-8">Giant Text Segments (3 Parts)</h3>
        <DualInput label="Segment 1" 
          valueEn={content.en.about.segments[0]} valueEs={content.es.about.segments[0]} 
          onChangeEn={(v: string) => updateArrayItem('en', 'about', 'segments', 0, v)} 
          onChangeEs={(v: string) => updateArrayItem('es', 'about', 'segments', 0, v)} />
        <DualInput label="Segment 2 (Italic)" 
          valueEn={content.en.about.segments[1]} valueEs={content.es.about.segments[1]} 
          onChangeEn={(v: string) => updateArrayItem('en', 'about', 'segments', 1, v)} 
          onChangeEs={(v: string) => updateArrayItem('es', 'about', 'segments', 1, v)} />
        <DualInput label="Segment 3" 
          valueEn={content.en.about.segments[2]} valueEs={content.es.about.segments[2]} 
          onChangeEn={(v: string) => updateArrayItem('en', 'about', 'segments', 2, v)} 
          onChangeEs={(v: string) => updateArrayItem('es', 'about', 'segments', 2, v)} />

        <div className="my-8" />
        <DualInput label="Full Biography" type="textarea"
          valueEn={content.en.about.body} valueEs={content.es.about.body} 
          onChangeEn={(v: string) => updateField('en', 'about', 'body', v)} 
          onChangeEs={(v: string) => updateField('es', 'about', 'body', v)} />
        
        <div className="my-8 h-px bg-primary/10" />

        <h3 className="text-primary/60 text-sm font-semibold mb-4 mt-8">Expertise Columns</h3>
        <DualInput label="Expertise Section Title" 
          valueEn={content.en.about.expertise_title} valueEs={content.es.about.expertise_title} 
          onChangeEn={(v: string) => updateField('en', 'about', 'expertise_title', v)} 
          onChangeEs={(v: string) => updateField('es', 'about', 'expertise_title', v)} />

        {[0, 1, 2].map((i) => (
          <div key={i} className="pl-4 border-l border-primary/20 mt-6">
            <DualInput label={`Col ${i+1} Label (Eyebrow)`} 
              valueEn={content.en.about.expertise[i]?.label} valueEs={content.es.about.expertise[i]?.label} 
              onChangeEn={(v: string) => updateExpertise('en', i, 'label', v)} 
              onChangeEs={(v: string) => updateExpertise('es', i, 'label', v)} />
            <DualInput label={`Col ${i+1} Value`} 
              valueEn={content.en.about.expertise[i]?.value} valueEs={content.es.about.expertise[i]?.value} 
              onChangeEn={(v: string) => updateExpertise('en', i, 'value', v)} 
              onChangeEs={(v: string) => updateExpertise('es', i, 'value', v)} />
          </div>
        ))}
      </section>

      {/* 4. Features Section */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">4. Services & Features</h2>
        <DualInput label="Main Header" 
          valueEn={content.en.features.header} valueEs={content.es.features.header} 
          onChangeEn={(v: string) => updateField('en', 'features', 'header', v)} 
          onChangeEs={(v: string) => updateField('es', 'features', 'header', v)} />
        <DualInput label="Subheader" 
          valueEn={content.en.features.subheader} valueEs={content.es.features.subheader} 
          onChangeEn={(v: string) => updateField('en', 'features', 'subheader', v)} 
          onChangeEs={(v: string) => updateField('es', 'features', 'subheader', v)} />
        <DualInput label="Learn More (Button)" 
          valueEn={content.en.features.learn_more} valueEs={content.es.features.learn_more} 
          onChangeEn={(v: string) => updateField('en', 'features', 'learn_more', v)} 
          onChangeEs={(v: string) => updateField('es', 'features', 'learn_more', v)} />

        <div className="my-8 h-px bg-primary/10" />

        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-12">
            <h3 className="text-primary/60 text-sm font-semibold mb-4 mt-8">Card {i+1}</h3>
            <DualInput label="Card Title" 
              valueEn={content.en.features.cards[i]?.title} valueEs={content.es.features.cards[i]?.title} 
              onChangeEn={(v: string) => updateFeatureCard('en', i, 'title', v)} 
              onChangeEs={(v: string) => updateFeatureCard('es', i, 'title', v)} />
            <DualInput label="Card Bullets (1 per line)" type="textarea"
              valueEn={content.en.features.cards[i]?.items?.join('\n')} valueEs={content.es.features.cards[i]?.items?.join('\n')} 
              onChangeEn={(v: string) => updateFeatureCard('en', i, 'items', v.split('\n'))} 
              onChangeEs={(v: string) => updateFeatureCard('es', i, 'items', v.split('\n'))} />
            <DualInput label="Card Link (URL or #)" 
              valueEn={content.en.features.cards[i]?.link} valueEs={content.es.features.cards[i]?.link} 
              onChangeEn={(v: string) => updateFeatureCard('en', i, 'link', v)} 
              onChangeEs={(v: string) => updateFeatureCard('es', i, 'link', v)} />
          </div>
        ))}
      </section>

      {/* 5. Portfolio */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">5. Portfolio Page</h2>
        <DualInput label="Portfolio Title" 
          valueEn={content.en.portfolio.title} valueEs={content.es.portfolio.title} 
          onChangeEn={(v: string) => updateField('en', 'portfolio', 'title', v)} 
          onChangeEs={(v: string) => updateField('es', 'portfolio', 'title', v)} />
        <DualInput label="Portfolio Description" type="textarea"
          valueEn={content.en.portfolio.description} valueEs={content.es.portfolio.description} 
          onChangeEn={(v: string) => updateField('en', 'portfolio', 'description', v)} 
          onChangeEs={(v: string) => updateField('es', 'portfolio', 'description', v)} />

        <div className="my-8 h-px bg-primary/10" />
        <h3 className="text-primary/60 text-sm font-semibold mb-4">Extended Portfolio Projects</h3>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mb-12 border-l border-primary/20 pl-4 mt-8">
            <h4 className="text-primary/40 text-xs uppercase tracking-widest mb-4">Project {i+1}</h4>
            <DualInput label="Project Title" 
              valueEn={content.en.portfolio.projects[i]?.title} valueEs={content.es.portfolio.projects[i]?.title} 
              onChangeEn={(v: string) => updateProject('en', i, 'title', v)} 
              onChangeEs={(v: string) => updateProject('es', i, 'title', v)} />
            <DualInput label="Category" 
              valueEn={content.en.portfolio.projects[i]?.category} valueEs={content.es.portfolio.projects[i]?.category} 
              onChangeEn={(v: string) => updateProject('en', i, 'category', v)} 
              onChangeEs={(v: string) => updateProject('es', i, 'category', v)} />
            <DualInput label="Client Name" 
              valueEn={content.en.portfolio.projects[i]?.client} valueEs={content.es.portfolio.projects[i]?.client} 
              onChangeEn={(v: string) => updateProject('en', i, 'client', v)} 
              onChangeEs={(v: string) => updateProject('es', i, 'client', v)} />
            <DualInput label="Project Description" type="textarea"
              valueEn={content.en.portfolio.projects[i]?.description} valueEs={content.es.portfolio.projects[i]?.description} 
              onChangeEn={(v: string) => updateProject('en', i, 'description', v)} 
              onChangeEs={(v: string) => updateProject('es', i, 'description', v)} />
            <DualInput label="Media URL (mp4, jpg, or empty)" 
              valueEn={content.en.portfolio.projects[i]?.media} valueEs={content.es.portfolio.projects[i]?.media} 
              onChangeEn={(v: string) => updateProject('en', i, 'media', v)} 
              onChangeEs={(v: string) => updateProject('es', i, 'media', v)} />
            <DualInput label="Outbound Link" 
              valueEn={content.en.portfolio.projects[i]?.link} valueEs={content.es.portfolio.projects[i]?.link} 
              onChangeEn={(v: string) => updateProject('en', i, 'link', v)} 
              onChangeEs={(v: string) => updateProject('es', i, 'link', v)} />
          </div>
        ))}
      </section>

      {/* 6. Contact Form */}
      <section className="bg-[#101010] p-6 md:p-8 rounded-2xl border border-primary/5">
        <h2 className="text-primary font-serif text-2xl mb-8">6. Contact Page</h2>
        
        <DualInput label="Contact Main Title" 
          valueEn={content.en.contact.title} valueEs={content.es.contact.title} 
          onChangeEn={(v: string) => updateField('en', 'contact', 'title', v)} 
          onChangeEs={(v: string) => updateField('es', 'contact', 'title', v)} />
        <DualInput label="Inquiries Subtitle" 
          valueEn={content.en.contact.inquiries_title} valueEs={content.es.contact.inquiries_title} 
          onChangeEn={(v: string) => updateField('en', 'contact', 'inquiries_title', v)} 
          onChangeEs={(v: string) => updateField('es', 'contact', 'inquiries_title', v)} />
        <DualInput label="Inquiries Description" type="textarea"
          valueEn={content.en.contact.inquiries_desc} valueEs={content.es.contact.inquiries_desc} 
          onChangeEn={(v: string) => updateField('en', 'contact', 'inquiries_desc', v)} 
          onChangeEs={(v: string) => updateField('es', 'contact', 'inquiries_desc', v)} />

        <div className="my-8 h-px bg-primary/10" />
        
        <h3 className="text-primary/60 text-sm font-semibold mb-4">Input Labels</h3>
        <DualInput label="Name Field Label" 
          valueEn={content.en.contact.form.name} valueEs={content.es.contact.form.name} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'name', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'name', v)} />
        <DualInput label="Name Placeholder" 
          valueEn={content.en.contact.form.placeholder_name} valueEs={content.es.contact.form.placeholder_name} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'placeholder_name', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'placeholder_name', v)} />
          
        <DualInput label="Email Field Label" 
          valueEn={content.en.contact.form.email} valueEs={content.es.contact.form.email} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'email', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'email', v)} />
        <DualInput label="Email Placeholder" 
          valueEn={content.en.contact.form.placeholder_email} valueEs={content.es.contact.form.placeholder_email} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'placeholder_email', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'placeholder_email', v)} />

        <DualInput label="Message Field Label" 
          valueEn={content.en.contact.form.message} valueEs={content.es.contact.form.message} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'message', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'message', v)} />
        <DualInput label="Message Placeholder" 
          valueEn={content.en.contact.form.placeholder_message} valueEs={content.es.contact.form.placeholder_message} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'placeholder_message', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'placeholder_message', v)} />

        <DualInput label="Submit Button" 
          valueEn={content.en.contact.form.submit} valueEs={content.es.contact.form.submit} 
          onChangeEn={(v: string) => updateSubField('en', 'contact', 'form', 'submit', v)} 
          onChangeEs={(v: string) => updateSubField('es', 'contact', 'form', 'submit', v)} />
      </section>

    </div>
  )
}
