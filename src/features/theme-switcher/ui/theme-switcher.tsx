import { type ComponentPropsWithoutRef, type FC, useState } from 'react'

import { Icons } from '@/shared/assets/icons'
import { useTheme } from '@/shared/lib/theme'
import { PageSpinner } from '@/shared/ui'

type ThemeSwitcherProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const ThemeSwitcher: FC<ThemeSwitcherProps> = props => {
  const [loading, setLoading] = useState(false)
  const { setTheme, theme } = useTheme()

  const isDark = theme === 'dark'

  const onChangeThemeClick = () => {
    setLoading(true)
    setTheme(isDark ? 'light' : 'dark')
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  if (loading) {
    return <PageSpinner isLoading={loading} />
  }

  return (
    <button
      className={
        'rounded-full hover:bg-slate-200 transition-colors p-1 duration-300 action dark:hover:bg-slate-500'
      }
      {...props}
      onClick={onChangeThemeClick}
    >
      {isDark ? <Icons.Sun /> : <Icons.Moon />}
    </button>
  )
}
