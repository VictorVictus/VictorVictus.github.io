import { doc, img } from './profile'

const wiki = 'https://en.wikipedia.org/wiki/'

export type Tag = { label: string; href: string }
export type ProjectImage = { src: string; alt: string; kind?: 'image' | 'pdf' }

export type Project = {
  id: string
  badgeKey: string
  titleKey: string
  descKey: string
  meta: string
  tags: Tag[]
  images?: ProjectImage[]
  carouselStyle?: 'fill' | 'strip'
}

const minipadImages: ProjectImage[] = [1, 2, 3, 4].map((n) => ({
  src: img(`minipad/${n}.jpg`),
  alt: `Minipad ${n}`,
}))

const lapisImages: ProjectImage[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
  src: img(`Lapis/${n}.png`),
  alt: `Lapis ${n}`,
}))

export const projects: Project[] = [
  {
    id: 'fault-injection',
    badgeKey: 'card7_badge',
    titleKey: 'card7_title',
    descKey: 'card7_p',
    meta: 'Security Lab · 2026',
    tags: [
      { label: 'Fault Injection', href: wiki + 'Fault_injection' },
      { label: 'Smart Card', href: wiki + 'Smart_card' },
      { label: 'ISO 7816', href: wiki + 'ISO/IEC_7816' },
      { label: 'Java Card', href: wiki + 'Java_Card' },
    ],
  },
  {
    id: 'cpp',
    badgeKey: 'card1_badge',
    titleKey: 'card1_title',
    descKey: 'card1_p',
    meta: 'FH Technikum Wien · 2026',
    tags: [
      { label: 'ROS2', href: wiki + 'Robot_Operating_System' },
      { label: 'C++', href: wiki + 'C%2B%2B' },
      { label: 'OpenCV', href: wiki + 'OpenCV' },
    ],
    images: [
      { src: doc('117455_mr25x006.pdf'), alt: '117455 mr25x006', kind: 'pdf' },
      { src: doc('ProjektBeurteilungBAProzent_Puche.pdf'), alt: 'Projektbeurteilung BA', kind: 'pdf' },
    ],
  },
  {
    id: 'smart-meter',
    badgeKey: 'card2_badge',
    titleKey: 'card2_title',
    descKey: 'card2_p',
    meta: 'Smilics Technologies · 2025–2026',
    tags: [
      { label: 'InfluxDB', href: wiki + 'InfluxDB' },
      { label: 'PuTTY', href: wiki + 'PuTTY' },
      { label: 'STM32', href: wiki + 'STM32' },
      { label: 'Modbus', href: wiki + 'Modbus' },
      { label: 'Grafana', href: wiki + 'Grafana' },
    ],
  },
  {
    id: 'representative',
    badgeKey: 'card3_badge',
    titleKey: 'card3_title',
    descKey: 'card3_p',
    meta: 'Universitat Politecnica de Catalunya · 2023–2026',
    tags: [
      { label: 'Leadership', href: wiki + 'Leadership' },
      { label: 'Public Speaking', href: wiki + 'Public_speaking' },
      { label: 'Negotiation', href: wiki + 'Negotiation' },
      { label: 'Budget Mgmt', href: wiki + 'Budget' },
      { label: 'Project Mgmt', href: wiki + 'Project_management' },
    ],
  },
  {
    id: 'minipad',
    badgeKey: 'card4_badge',
    titleKey: 'card4_title',
    descKey: 'card4_p',
    meta: 'Personal Project',
    tags: [
      { label: 'Altium 365', href: wiki + 'Altium_Designer' },
      { label: 'KiCAD', href: wiki + 'KiCad' },
      { label: 'PCB Design', href: wiki + 'Printed_circuit_board' },
      { label: 'C', href: wiki + 'C_(programming_language)' },
    ],
    images: minipadImages,
    carouselStyle: 'fill',
  },
  {
    id: 'lapis',
    badgeKey: 'card5_badge',
    titleKey: 'card5_title',
    descKey: 'card5_p',
    meta: 'Personal Project · Dec 2025–Present',
    tags: [
      { label: 'Flutter', href: wiki + 'Flutter_(software)' },
      { label: 'Dart', href: wiki + 'Dart_(programming_language)' },
      { label: 'Firebase', href: wiki + 'Firebase' },
      { label: 'C++', href: wiki + 'C%2B%2B' },
    ],
    images: lapisImages,
    carouselStyle: 'strip',
  },
  {
    id: 'battery',
    badgeKey: 'card6_badge',
    titleKey: 'card6_title',
    descKey: 'card6_p',
    meta: 'Smilics Technologies · 2025',
    tags: [
      { label: 'MATLAB', href: wiki + 'MATLAB' },
      { label: 'C', href: wiki + 'C_(programming_language)' },
      { label: 'Modeling', href: wiki + 'Physical_model' },
    ],
  },
]
