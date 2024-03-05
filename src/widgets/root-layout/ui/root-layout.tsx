import { Outlet } from 'react-router-dom'

import { Header } from '@/shared/ui'

import { NavLinks } from './nav-links'
import { Profile } from './profile'

export const RootLayout = () => {
  return (
    <div className={'min-h-screen flex flex-col'}>
      <Header linksContentSlot={<NavLinks />} rightContentSlot={<Profile />} />
      <main className={'grow'}>
        <Outlet />
      </main>
    </div>
  )
}
