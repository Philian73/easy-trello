import type { AuthOutletContext } from '@/widgets/root-layout'

import { Outlet } from 'react-router-dom'

import { sessionQuery } from '@/entities/session'
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

  return (
    <div className={'min-h-screen flex flex-col'}>
      <Header
        linksContentSlot={isAuthenticated && <NavLinks />}
        rightContentSlot={isAuthenticated && <Profile />}
      />
      <main className={'grow flex flex-col'}>
        <Outlet context={{ isAuthenticated } satisfies AuthOutletContext} />
      </main>
    </div>
  )
}
