import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function PortfolioPage() {
  const { t } = useLanguage()
  const projects = t.portfolio.projects || []
  const leftCol = projects.filter((_: any, i: number) => i % 2 === 0)
  const rightCol = projects.filter((_: any, i: number) => i % 2 !== 0)

  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [selectedProject])

  const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    const isVideo = project.media?.includes('.mp4') || project.media?.includes('.webm')
    const hasMedia = !!project.media
    const globalId = projects.findIndex((p:any) => p.title === project.title)
    
    return (
      <motion.div 
        layoutId={`project-${globalId}`}
        onClick={() => setSelectedProject({ ...project, globalId })}
        className="group block overflow-hidden rounded-2xl md:rounded-3xl border border-primary/10 bg-black/40 hover:bg-[#101010] transition-colors relative cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`w-full relative overflow-hidden ${index % 3 === 0 ? 'h-[300px] md:h-[500px]' : 'h-[300px] md:h-[400px]'}`}>
          {hasMedia ? (
            isVideo ? (
              <motion.video layoutId={`media-${globalId}`} src={project.media} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              <motion.img layoutId={`media-${globalId}`} src={project.media} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            )
          ) : (
             <motion.div layoutId={`media-${globalId}`} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#101010] to-[#050505]">
               <span className="text-primary/10 font-serif text-3xl md:text-5xl opacity-50">No Media</span>
             </motion.div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
        </div>

        <motion.div layoutId={`info-${globalId}`} className="p-6 md:p-8 flex justify-between items-end relative z-10">
          <div>
            <motion.p layoutId={`cat-${globalId}`} className="text-primary/40 text-[10px] md:text-xs uppercase tracking-widest mb-3">{project.category}</motion.p>
            <motion.h3 layoutId={`title-${globalId}`} className="text-primary text-2xl md:text-4xl font-serif group-hover:text-[#E8E4D9] transition-colors">{project.title}</motion.h3>
          </div>
          {/* A small hint icon to open */}
          <div className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
            <ArrowUpRight size={18} />
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-black min-h-screen pt-32 pb-32">
        <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />
        <div className="px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-20 md:mb-32">
            <h1 className="text-primary text-6xl md:text-8xl lg:text-[100px] font-serif mb-8 leading-none">{t.portfolio.title}</h1>
            <p className="text-primary/60 text-lg md:text-2xl leading-relaxed max-w-2xl font-light">{t.portfolio.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            <div className="flex flex-col gap-6 md:gap-10">
              {leftCol.map((project: any, i: number) => <ProjectCard key={i} project={project} index={i * 2} />)}
            </div>
            <div className="flex flex-col gap-6 md:gap-10 md:mt-32">
              {rightCol.map((project: any, i: number) => <ProjectCard key={i} project={project} index={i * 2 + 1} />)}
            </div>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20 border border-primary/10 rounded-3xl bg-[#0a0a0a]">
              <p className="text-primary/40 font-serif text-2xl">No projects available.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full Screen Cinematic Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.globalId}`}
              className="relative w-full h-full md:rounded-[40px] bg-black border border-primary/10 overflow-y-auto overflow-x-hidden flex flex-col shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:text-black border border-white/20 hover:bg-white transition-colors z-50 mix-blend-difference"
              >
                <X size={20} />
              </button>

              <div className="w-full h-[50vh] md:h-[70vh] shrink-0 relative bg-black">
                {selectedProject.media ? (
                  selectedProject.media.includes('.mp4') || selectedProject.media.includes('.webm') ? (
                    <motion.video layoutId={`media-${selectedProject.globalId}`} src={selectedProject.media} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
                  ) : (
                    <motion.img layoutId={`media-${selectedProject.globalId}`} src={selectedProject.media} alt={selectedProject.title} className="w-full h-full object-cover opacity-90" />
                  )
                ) : (
                  <motion.div layoutId={`media-${selectedProject.globalId}`} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#101010] to-[#050505]">
                    <span className="text-primary/10 font-serif text-5xl opacity-50">No Media</span>
                  </motion.div>
                )}
                
                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
                
                <motion.div layoutId={`info-${selectedProject.globalId}`} className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-6xl">
                  <motion.p layoutId={`cat-${selectedProject.globalId}`} className="text-primary/60 text-xs md:text-sm uppercase tracking-widest mb-4">{selectedProject.category}</motion.p>
                  <motion.h3 layoutId={`title-${selectedProject.globalId}`} className="text-primary text-5xl md:text-7xl lg:text-[120px] font-serif leading-none tracking-tight">{selectedProject.title}</motion.h3>
                </motion.div>
              </div>

              {/* Additional Details Below Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 md:p-16 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-24"
              >
                <div>
                  <h4 className="text-primary/50 text-xs uppercase tracking-widest mb-6">About the project</h4>
                  <p className="text-primary/90 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-light">
                    {selectedProject.description || "No description provided."}
                  </p>
                  
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="mt-16 inline-flex items-center gap-4 group">
                      <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <span className="text-primary text-sm uppercase tracking-widest group-hover:text-primary transition-colors">View Live Project</span>
                    </a>
                  )}
                </div>

                <div className="space-y-12 lg:border-l lg:border-primary/5 lg:pl-12 pt-4">
                  <div>
                    <h4 className="text-primary/40 text-[10px] uppercase tracking-widest mb-3">Client</h4>
                    <p className="text-primary text-lg">{selectedProject.client || "Independent"}</p>
                  </div>
                  <div>
                    <h4 className="text-primary/40 text-[10px] uppercase tracking-widest mb-3">Category</h4>
                    <p className="text-primary text-lg">{selectedProject.category}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
