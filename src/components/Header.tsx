import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { LANG_LABELS, LANGS, useI18n, type Lang } from '../i18n'
import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import { SectionLink } from './SectionLink'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY

      if (dy > 4 && y > 80) {
        setHeaderHidden(true)
      } else if (dy < -4 || y <= 80) {
        setHeaderHidden(false)
      }
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const languageSwitch = (className = '') => (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t('lang_label')}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn${lang === code ? ' is-active' : ''}`}
          onClick={() => setLang(code as Lang)}
          aria-pressed={lang === code}
          aria-label={LANG_LABELS[code]}
          title={LANG_LABELS[code]}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <header className={`site-header${headerHidden ? ' site-header--hidden' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Víctor Puche — home">
            <span className="brand__mark" aria-hidden="true">
              VP
            </span>
            <span className="brand__text">
              <span className="brand__name">{profile.name}</span>
              <span className="brand__meta">Portfolio / {profile.cvYear}</span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
              {t('sobremi')}
            </NavLink>
            <SectionLink id="work" className="nav-link">
              {t('projectes')}
            </SectionLink>
            <NavLink to="/cv" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
              {t('micv')}
            </NavLink>
            <SectionLink id="contact" className="nav-link">
              {t('contacte')}
            </SectionLink>
          </nav>

          <div className="header-actions">
            {languageSwitch('lang-switch--desktop')}

            <button
              type="button"
              className="icon-button"
              onClick={toggle}
              aria-label={t('theme_toggle')}
              title={t('theme_toggle')}
            >
              {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>

            <button
              type="button"
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t('menu_close') : t('menu_open')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <nav aria-label="Mobile navigation">
            <Link to="/about">
              <span className="mobile-menu__num">01</span>
              {t('sobremi')}
            </Link>
            <SectionLink id="work" onNavigate={() => setMenuOpen(false)}>
              <span className="mobile-menu__num">02</span>
              {t('projectes')}
            </SectionLink>
            <Link to="/cv">
              <span className="mobile-menu__num">03</span>
              {t('micv')}
            </Link>
            <SectionLink id="contact" onNavigate={() => setMenuOpen(false)}>
              <span className="mobile-menu__num">04</span>
              {t('contacte')}
            </SectionLink>
          </nav>

          <div className="mobile-menu__footer">
            {languageSwitch()}
            <div className="mobile-menu__socials">
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin aria-hidden="true" />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
