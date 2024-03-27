import type { AuthOutletContext } from '@/widgets/root-layout'

import { Outlet } from 'react-router-dom'

import { sessionQuery } from '@/entities/session'
import { SignOutButton } from '@/features/auth'
import { ThemeSwitcher } from '@/features/theme-switcher'
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

  const renderAuthContentSlot = (
    <div className={'flex gap-4 items-center ml-auto'}>
      <Profile />
      <SignOutButton />
      <ThemeSwitcher />
    </div>
  )

  return (
    <div className={'min-h-screen flex flex-col dark:text-white'}>
      <Header
        linksContentSlot={isAuthenticated && <NavLinks />}
        rightContentSlot={isAuthenticated && renderAuthContentSlot}
      />
      <main className={'grow flex flex-col dark:bg-slate-800'}>
        <Outlet context={{ isAuthenticated } satisfies AuthOutletContext} />
      </main>
    </div>
  )
}
