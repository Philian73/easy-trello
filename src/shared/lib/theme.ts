import { createStrictContext, useStrictContext } from './hooks'

export type Theme = 'dark' | 'light'

export const LOCAL_STORAGE_THEME_KEY = 'theme'

type ThemeContextProps = {
  setTheme: (theme: Theme) => void
  theme: Theme
}

export const themeContext = createStrictContext<ThemeContextProps>()

export const useTheme = () => ({ ...useStrictContext(themeContext) })
