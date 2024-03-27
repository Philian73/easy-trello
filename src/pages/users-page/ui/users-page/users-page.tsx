import { useTranslation } from 'react-i18next'

import { CreateUserForm, UsersList, useUsersListAbility } from '@/features/users-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

export const UsersPage = () => {
  const { t } = useTranslation()

  const usersListAbility = useUsersListAbility()

  const canCreateUser = usersListAbility.can('create', 'User')

  return (
    <CenterContentLayout className={'py-10'}>
      <h1 className={'text-3xl'}>{t('pages.users.title.users')}</h1>

      {canCreateUser && (
        <div className={'mt-10'}>
          <h2 className={'text-lg mb-2 font-semibold'}>{t('pages.users.title.add_user')}</h2>
          <CreateUserForm />
        </div>
      )}

      <h2 className={'text-lg mb-2 font-semibold mt-10'}>{t('pages.users.title.all_users')}</h2>

      <UsersList />
    </CenterContentLayout>
  )
}
