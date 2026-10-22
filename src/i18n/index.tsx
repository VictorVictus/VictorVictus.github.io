import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import translations from './translations.json'

export const LANGS = ['en', 'es', 'ca', 'de'] as const
export type Lang = (typeof LANGS)[number]

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
  de: 'Deutsch',
}

type Dict = Record<string, string>
const dictionaries = translations as Record<Lang, Dict>

function isLang(value: string | null): value is Lang {
  return value !== null && (LANGS as readonly string[]).includes(value)
}

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (isLang(saved)) return saved
    const browser = navigator.language.slice(0, 2).toLowerCase()
    if (isLang(browser)) return browser
  } catch {
    /* no-op */
  }
  return 'en'
}

type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
  has: (key: string) => boolean
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      /* no-op */
    }
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
      has: (key) => key in dictionaries[lang],
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
