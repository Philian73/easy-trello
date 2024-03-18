import { CreateUserForm, UsersList } from '@/features/users-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

import { UsersProviders } from '../users-providers'

export const UsersPage = () => {
  return (
    <UsersProviders>
      <CenterContentLayout className={'py-10'}>
        <h1 className={'text-3xl'}>Пользователи</h1>
        <div className={'mt-10'}>
          <h2 className={'text-lg mb-2 font-semibold'}>Добавить пользователя</h2>
          <CreateUserForm />
        </div>
        <h2 className={'text-lg mb-2 font-semibold mt-10'}>Все пользователи</h2>
        <UsersList />
      </CenterContentLayout>
    </UsersProviders>
  )
}
