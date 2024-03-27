import { type FC, type PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { LOCAL_STORAGE_THEME_KEY, type Theme, themeContext } from '@/shared/lib/theme'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(
    () => localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
  )

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    setThemeState(newTheme)
  }, [])

  useEffect(() => {
    const systemTheme =
      window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    if (!theme) {
      setTheme(systemTheme)
    }

    if (typeof window !== 'undefined') {
      document.body.setAttribute('data-theme', theme)
    }
  }, [theme, setTheme])

  return (
    <themeContext.Provider
      value={{
        setTheme,
        theme,
      }}
    >
      {children}
    </themeContext.Provider>
  )
}
