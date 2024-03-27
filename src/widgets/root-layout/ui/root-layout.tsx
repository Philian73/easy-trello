import type { AuthOutletContext } from '@/widgets/root-layout'

import { Outlet } from 'react-router-dom'

import { sessionQuery } from '@/entities/session'
import { SignOutButton } from '@/features/auth'
import { LangSwitcher } from '@/features/change-language'
import { ThemeSwitcher } from '@/features/change-theme'
import { Header, PageSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'

import { NavLinks } from './nav-links'
import { Profile } from './profile'

export const RootLayout = () => {
  const { isError, isLoading } = useQuery(sessionQuery)

  const isAuthenticated = !isLoading && !isError

  if (isLoading) {
    return <PageSpinner isLoading={isLoading} />
  }

  const leftContentSlot = isAuthenticated ? <NavLinks /> : <span></span>

  const rightContentSlot = (
    <div className={'flex gap-4 items-center ml-auto'}>
      {isAuthenticated && (
        <>
          <Profile />
          <SignOutButton />
        </>
      )}
      <LangSwitcher />
      <ThemeSwitcher />
    </div>
  )

  return (
    <div className={'min-h-screen flex flex-col dark:text-white'}>
      <Header linksContentSlot={leftContentSlot} rightContentSlot={rightContentSlot} />
      <main className={'grow flex flex-col dark:bg-slate-800'}>
        <Outlet context={{ isAuthenticated } satisfies AuthOutletContext} />
      </main>
    </div>
  )
}
