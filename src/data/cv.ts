export const expertise = [
  { id: 'robotics', titleKey: 'expertise_1_title', descKey: 'expertise_1_p' },
  { id: 'embedded', titleKey: 'expertise_2_title', descKey: 'expertise_2_p' },
  { id: 'validation', titleKey: 'expertise_3_title', descKey: 'expertise_3_p' },
  { id: 'cyber', titleKey: 'expertise_4_title', descKey: 'expertise_4_p' },
  { id: 'leadership', titleKey: 'expertise_5_title', descKey: 'expertise_5_p' },
] as const

export type CvEntry = {
  id: string
  titleKey: string
  date: string
  dateKey?: string
  location: string
  bullets: string[]
}

export const experience: CvEntry[] = [
  {
    id: 'cyber',
    titleKey: 'cv_xp6_title',
    date: 'Jun 2026 – Nov 2026',
    location: 'SGS Brightsight Laboratories, Sant Cugat del Vallès',
    bullets: ['cv_xp6_b1', 'cv_xp6_b2', 'cv_xp6_b3', 'cv_xp6_b4'],
  },
  {
    id: 'research',
    titleKey: 'cv_xp1_title',
    date: 'Feb 2026 – Jul 2026',
    location: 'Fachhochschule Technikum Wien, Vienna',
    bullets: ['cv_xp1_b1', 'cv_xp1_b2', 'cv_xp1_b3', 'cv_xp1_b4', 'cv_xp1_b5'],
  },
  {
    id: 'smilics',
    titleKey: 'cv_xp2_title',
    date: 'Jul 2025 – Jan 2026',
    location: 'Smilics Technologies, Terrassa',
    bullets: [
      'cv_xp2_b1',
      'cv_xp2_b2',
      'cv_xp2_b3',
      'cv_xp2_b4',
      'cv_xp2_b5',
      'cv_xp2_b6',
      'cv_xp2_b7',
    ],
  },
  {
    id: 'entrepreneurship',
    titleKey: 'cv_xp3_title',
    date: 'Sep 2024 – Jul 2025',
    location: 'ESEIAAT, UPC, Terrassa',
    bullets: ['cv_xp3_b1', 'cv_xp3_b2'],
  },
  {
    id: 'representative',
    titleKey: 'cv_xp4_title',
    date: 'Oct 2023 – Present',
    location: 'ESEIAAT, UPC, Terrassa',
    bullets: ['cv_xp4_b1', 'cv_xp4_b2'],
  },
  {
    id: 'tutor',
    titleKey: 'cv_xp5_title',
    date: 'Spring 2024 – Summer 2024',
    location: 'Palau‑Solità i Plegamans',
    bullets: ['cv_xp5_b1', 'cv_xp5_b2'],
  },
]

export const education: CvEntry[] = [
  {
    id: 'erasmus',
    titleKey: 'cv_ed1_title',
    date: 'Feb 2026 – Jun 2026',
    location: 'Fachhochschule Technikum Wien, Vienna',
    bullets: [],
  },
  {
    id: 'upc',
    titleKey: 'cv_ed2_title',
    date: 'Sep 2022 – Jun 2026',
    location: 'ESEIAAT, UPC, Terrassa',
    bullets: [],
  },
  {
    id: 'highschool',
    titleKey: 'cv_ed3_title',
    date: 'Graduated: Jun 2022',
    dateKey: 'cv_ed3_date',
    location: 'IES Ramon Casas i Carbó, Palau‑Solità i Plegamans',
    bullets: [],
  },
]

export const skillKeys = ['cv_skills_1', 'cv_skills_2', 'cv_skills_3']

export const cvLanguages = [
  { nameKey: 'lang_ca', levelKey: 'lvl_native', dots: 5 },
  { nameKey: 'lang_es', levelKey: 'lvl_native', dots: 5 },
  { nameKey: 'lang_en', levelKey: 'lvl_c1', dots: 4 },
  { nameKey: 'lang_de', levelKey: 'lvl_b1', dots: 3 },
  { nameKey: 'lang_fr', levelKey: 'lvl_basic', dots: 1 },
]

export const competencyKeys = [
  'cv_soft_1',
  'cv_soft_2',
  'cv_soft_3',
  'cv_soft_4',
  'cv_soft_5',
  'cv_soft_6',
  'cv_soft_7',
  'cv_soft_8',
]
