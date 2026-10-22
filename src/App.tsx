import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollManager } from './components/SectionLink'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Cv } from './pages/Cv'
import { useI18n } from './i18n'

function Shell() {
  const location = useLocation()
  const { t } = useI18n()

  return (
    <>
      <a className="skip-link" href="#main">
        {t('skip_to_content')}
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="page" key={location.pathname} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
