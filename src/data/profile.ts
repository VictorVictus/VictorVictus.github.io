export const profile = {
  name: 'Víctor Puche',
  email: 'vpuche17@gmail.com',
  phone: '+34 692 91 85 68',
  phoneHref: '+34692918568',
  linkedin: 'https://www.linkedin.com/in/victorpuche',
  github: 'https://github.com/VictorVictus',
  location: 'Palau-solità i Plegamans',
  photo: 'mi-cara.jpeg',
  aboutPhoto: 'cara.jpg',
  cvYear: new Date().getFullYear(),
  openToWork: true,
}

export const img = (path: string) => `${import.meta.env.BASE_URL}img/${path}`
export const doc = (path: string) => `${import.meta.env.BASE_URL}docs/${path}`
