import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircuitBoard,
  FlaskConical,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useI18n } from '../i18n'
import { img, profile } from '../data/profile'
import { projects, type ProjectImage } from '../data/projects'
import { expertise } from '../data/cv'
import { ProjectCard } from '../components/ProjectCard'
import { Lightbox } from '../components/Lightbox'
import { SectionLink } from '../components/SectionLink'

const expertiseIcons = {
  robotics: Bot,
  embedded: CircuitBoard,
  validation: FlaskConical,
  cyber: ShieldCheck,
  leadership: Users,
} as const

type LightboxState = { images: ProjectImage[]; index: number } | null

export function Home() {
  const { t } = useI18n()
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const openImage = (images: ProjectImage[] | undefined, index: number) => {
    if (!images) return
    setLightbox({ images, index })
  }

  return (
    <>
      <section className="masthead">
        <div className="container masthead__grid">
          <div className="masthead__copy">
            <h1 className="masthead__title">
              <span>Víctor</span>
              <span>
                Puche<span className="masthead__period">.</span>
              </span>
            </h1>

            <p className="masthead__role">{t('hero_sub')}</p>

            <div className="masthead__actions">
              <SectionLink id="contact" className="btn btn--primary">
                {t('btn_connect')}
                <ArrowUpRight aria-hidden="true" />
              </SectionLink>
              <Link to="/cv" className="btn btn--ghost">
                {t('btn_cv')}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <figure className="masthead__portrait">
            <div className="portrait-frame">
              <img src={img(profile.photo)} alt="Víctor Puche" />
            </div>
          </figure>
        </div>

        <div className="container masthead__facts">
          <span>
            <MapPin aria-hidden="true" />
            {profile.location}
          </span>
          <span>
            <GraduationCap aria-hidden="true" />
            UPC - ESEIAAT / FH Technikum Wien
          </span>
          {profile.openToWork && (
            <span className="status">
              <span className="status__dot" aria-hidden="true" />
              {t('open_to_work')}
            </span>
          )}
        </div>
      </section>

      <section id="about" className="section">
        <div className="container section-layout section-layout--full">
          <div className="section-content">
            <h2 className="section-title">{t('about_title')}</h2>
            <div className="about-preview">
              <p>{t('about_p')}</p>
              <Link to="/about" className="link-arrow">
                {t('about_cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="specialization" className="section section--tinted">
        <div className="container section-layout section-layout--full">
          <div className="section-content">
            <h2 className="section-title">{t('expertise_title')}</h2>

            <div className="expertise-list">
              {expertise.map((item, index) => {
                const Icon = expertiseIcons[item.id]
                return (
                  <article className="expertise-row" key={item.id}>
                    <div className="expertise-row__title">
                      <span className="expertise-row__num">{String(index + 1).padStart(2, '0')}</span>
                      <Icon aria-hidden="true" className="expertise-row__icon" />
                      <h3>{t(item.titleKey)}</h3>
                    </div>
                    <p>{t(item.descKey)}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="container section-layout section-layout--full">
          <div className="section-content">
            <div className="section-title-row">
              <h2 className="section-title">{t('work_title')}</h2>
              <span className="section-count">
                {String(projects.length).padStart(2, '0')} / {t('projectes')}
              </span>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenImage={openImage}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact__grid">
            <h2 className="contact__title">{t('contact_title')}</h2>

            <div className="contact__body">
              <p>{t('contact_p')}</p>

              <a className="contact__email" href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight aria-hidden="true" />
              </a>

              <div className="contact__links">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin aria-hidden="true" />
                  {t('btn_linkedin')}
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" />
                  {t('btn_github')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox((state) => (state ? { ...state, index } : state))}
        />
      )}
    </>
  )
}
