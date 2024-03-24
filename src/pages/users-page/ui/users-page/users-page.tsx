import { CreateUserForm, UsersList, useUsersListAbility } from '@/features/users-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

export const UsersPage = () => {
  const usersListAbility = useUsersListAbility()

  const canCreateUser = usersListAbility.can('create', 'User')

  return (
    <CenterContentLayout className={'py-10'}>
      <h1 className={'text-3xl'}>Пользователи</h1>

      {canCreateUser && (
        <div className={'mt-10'}>
          <h2 className={'text-lg mb-2 font-semibold'}>Добавить пользователя</h2>
          <CreateUserForm />
        </div>
      )}

      <h2 className={'text-lg mb-2 font-semibold mt-10'}>Все пользователи</h2>

      <UsersList />
    </CenterContentLayout>
  )
}
