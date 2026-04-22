import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { FeaturesSection } from './components/FeaturesSection'
import { Navbar } from './components/Navbar'
import { LanguageToggle } from './components/LanguageToggle'
import { PortfolioPage } from './pages/PortfolioPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { OnboardingPage } from './pages/OnboardingPage'

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </>
  )
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <main className="bg-black min-h-screen">
          <Navbar />
          <LanguageToggle />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Routes>
        </main>
      </LanguageProvider>
    </Router>
  )
}

export default App
