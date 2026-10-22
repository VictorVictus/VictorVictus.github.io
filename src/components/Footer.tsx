import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { useI18n } from '../i18n'
import { profile } from '../data/profile'

export function Footer() {
  const { t } = useI18n()

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-sig">
          <span className="footer-sig__mark" aria-hidden="true">
            VP
          </span>
          {profile.name}
        </p>
        <p className="footer-copy">
          © {profile.cvYear} · {profile.location}
        </p>
        <p className="footer-built">{t('footer_built')}</p>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin aria-hidden="true" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github aria-hidden="true" />
          </a>
          <button type="button" onClick={backToTop} aria-label={t('back_to_top')} title={t('back_to_top')}>
            <ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
