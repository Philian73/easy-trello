import type { UserDto } from '@/shared/api'

import { SignInButton, SignOutButton, subjectDefault, useAbility } from '@/features/auth'
import { CreateUserForm, UsersList } from '@/features/users-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

const subject = subjectDefault<'User', { id: string }>

export const UsersPage = () => {
  const ability = useAbility()

  const renderUserAuthAction = (user: UserDto) => {
    const canSignIn = ability.can('sign-in-as', subject('User', { id: user.id }))
    const canSignOut = ability.can('sign-out', subject('User', { id: user.id }))

    if (canSignIn) {
      return <SignInButton user={user} />
    }
    if (canSignOut) {
      return <SignOutButton />
    }
  }

  return (
    <CenterContentLayout className={'py-10'}>
      <h1 className={'text-3xl'}>Пользователи</h1>
      <div className={'mt-10'}>
        <h2 className={'text-lg mb-2 font-semibold'}>Добавить пользователя</h2>
        <CreateUserForm />
      </div>
      <h2 className={'text-lg mb-2 font-semibold mt-10'}>Все пользователи</h2>
      <UsersList renderUserAuthAction={renderUserAuthAction} />
    </CenterContentLayout>
  )
}
