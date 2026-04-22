import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export function Navbar() {
  const location = useLocation()
  const { t } = useLanguage()

  const navItems = [
    { name: t.nav.portfolio, path: '/portfolio' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' }
  ]

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4 md:mt-6">
      <div className="bg-black/80 backdrop-blur-md border border-primary/10 rounded-full px-6 py-2 md:px-10 md:py-3 shadow-2xl">
        <nav className="flex items-center gap-6 sm:gap-10 md:gap-14">
          <Link
            to="/"
            className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
            style={{ color: location.pathname === '/' ? '#E1E0CC' : 'rgba(225, 224, 204, 0.6)' }}
          >
            {t.nav.home}
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                color: location.pathname === item.path ? '#E1E0CC' : 'rgba(225, 224, 204, 0.6)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.color = 'rgba(225, 224, 204, 0.6)'
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
