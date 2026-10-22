import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* no-op */
    }
  }, [theme])

  return {
    theme,
    toggle: () => setTheme((value) => (value === 'dark' ? 'light' : 'dark')),
  }
}
