import { Link } from 'react-router-dom'
import { ArrowLeft, Linkedin, Mail, MapPin, Phone, Printer } from 'lucide-react'
import { useI18n } from '../i18n'
import { profile } from '../data/profile'
import {
  competencyKeys,
  cvLanguages,
  education,
  experience,
  skillKeys,
  type CvEntry,
} from '../data/cv'

function CvEntryBlock({ entry }: { entry: CvEntry }) {
  const { t, has } = useI18n()
  const bullets = entry.bullets.filter((key) => has(key))

  return (
    <article className="cv-entry">
      <div className="cv-entry__head">
        <h4>{t(entry.titleKey)}</h4>
        <span className="cv-entry__date">{entry.dateKey ? t(entry.dateKey) : entry.date}</span>
      </div>
      <p className="cv-entry__loc">{entry.location}</p>
      {bullets.length > 0 && (
        <ul className="cv-entry__bullets">
          {bullets.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

function SkillLine({ text }: { text: string }) {
  const match = text.match(/^<strong>(.*?)<\/strong>\s*(.*)$/)
  if (!match) return <>{text}</>
  return (
    <>
      <span className="cv-skills__label">{match[1]}</span>
      <span>{match[2]}</span>
    </>
  )
}

export function Cv() {
  const { t } = useI18n()

  return (
    <section className="cv-page">
      <div className="container">
        <div className="cv-toolbar">
          <div>
            <p className="kicker">
              <span className="kicker__square" aria-hidden="true" />
              Curriculum Vitae<span className="kicker__year">/ {profile.cvYear}</span>
            </p>
            <h1 className="page-title">
              Víctor <span>Puche</span>
            </h1>
          </div>
          <div className="cv-toolbar__actions">
            <Link to="/" className="btn btn--ghost">
              <ArrowLeft aria-hidden="true" />
              {t('back')}
            </Link>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" />
              {t('btn_email')}
            </a>
            <button type="button" className="btn btn--primary" onClick={() => window.print()}>
              <Printer aria-hidden="true" />
              {t('cv_print')}
            </button>
          </div>
        </div>

        <article className="cv-doc">
            <header className="cv-doc__header">
              <div>
                <h2>Víctor Puche</h2>
                <p className="cv-doc__role">{t('cv_subhead')}</p>
              </div>
              <ul className="cv-contact">
                <li>
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <Phone aria-hidden="true" />
                  <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
                </li>
                <li>
                  <Linkedin aria-hidden="true" />
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/victorpuche
                  </a>
                </li>
                <li>
                  <MapPin aria-hidden="true" />
                  <span>{profile.location}</span>
                </li>
              </ul>
            </header>

            <div className="cv-doc__body">
              <div className="cv-col-main">
                <section className="cv-block">
                  <h3>{t('cv_xp_title')}</h3>
                  {experience.map((entry) => (
                    <CvEntryBlock key={entry.id} entry={entry} />
                  ))}
                </section>

                <section className="cv-block">
                  <h3>{t('cv_ed_title')}</h3>
                  {education.map((entry) => (
                    <CvEntryBlock key={entry.id} entry={entry} />
                  ))}
                </section>
              </div>

              <aside className="cv-col-side">
                <section className="cv-block">
                  <h3>{t('cv_skills_title')}</h3>
                  <ul className="cv-skills">
                    {skillKeys.map((key) => (
                      <li key={key}>
                        <SkillLine text={t(key)} />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="cv-block">
                  <h3>{t('cv_lang_title')}</h3>
                  <ul className="cv-langs">
                    {cvLanguages.map((language) => (
                      <li key={language.nameKey}>
                        <div className="cv-lang__row">
                          <span>{t(language.nameKey)}</span>
                          <span className="cv-lang__level">{t(language.levelKey)}</span>
                        </div>
                        <span className="cv-dots" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <span
                              key={dot}
                              className={`cv-dot${dot <= language.dots ? ' is-filled' : ''}`}
                            />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="cv-block">
                  <h3>{t('cv_soft_title')}</h3>
                  <ul className="cv-competencies">
                    {competencyKeys.map((key) => (
                      <li key={key}>{t(key)}</li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
        </article>
      </div>
    </section>
  )
}
