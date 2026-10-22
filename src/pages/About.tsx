import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, MapPin } from 'lucide-react'
import { useI18n } from '../i18n'
import { img, profile } from '../data/profile'

const values = [
  { titleKey: 'about_c1_title', bodyKeys: ['about_c1_p1'] },
  { titleKey: 'about_c2_title', bodyKeys: ['about_c2_p1'] },
  { titleKey: 'about_c3_title', bodyKeys: ['about_c3_p1'] },
  { titleKey: 'about_c4_title', bodyKeys: ['about_c4_p1', 'about_c4_p2'] },
]

export function About() {
  const { t } = useI18n()

  return (
    <>
      <section className="about-masthead">
        <div className="container about-masthead__grid">
          <figure className="about-photo">
            <div className="about-photo__frame">
              <img src={img(profile.aboutPhoto)} alt="Víctor Puche" />
            </div>
          </figure>

          <div className="about-masthead__copy">
            <p className="kicker">
              <span className="kicker__square" aria-hidden="true" />
              {t('about_page_pre')}
            </p>

            <h1 className="about-title">
              Víctor <span>Puche</span>
            </h1>

            <p className="about-masthead__sub">
              {t('about_page_sub')
                .split('<br>')
                .map((line) => (
                  <span key={line} className="about-masthead__line">
                    {line}
                  </span>
                ))}
            </p>

            <div className="about-masthead__facts">
              <span>
                <MapPin aria-hidden="true" />
                {profile.location}
              </span>
              <span>
                <GraduationCap aria-hidden="true" />
                UPC - ESEIAAT / FH Technikum Wien
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-layout section-layout--full">
          <div className="section-content">
            <p className="about-intro">{t('about_p_new')}</p>

            <div className="fact-list">
              <article className="fact">
                <span className="fact__num" aria-hidden="true">
                  01
                </span>
                <h2>{t('about_card_tech_title')}</h2>
                <p>{t('about_card_tech_p')}</p>
              </article>
              <article className="fact">
                <span className="fact__num" aria-hidden="true">
                  02
                </span>
                <h2>{t('about_card_prac_title')}</h2>
                <p>{t('about_card_prac_p')}</p>
              </article>
            </div>

            <div className="hobbies">
              <h2>{t('about_hobbies_title')}</h2>
              <p>{t('about_hobbies_p')}</p>
            </div>

            <div className="values">
              {values.map((value, index) => (
                <article className="value" key={value.titleKey}>
                  <div className="value__head">
                    <span className="value__num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2>{t(value.titleKey)}</h2>
                  </div>
                  <div className="value__body">
                    {value.bodyKeys.map((key) => (
                      <p key={key}>{t(key)}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="about-cta">
              <p>{t('about_cta_p')}</p>
              <Link to="/cv" className="link-arrow">
                {t('about_cta_link')}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
