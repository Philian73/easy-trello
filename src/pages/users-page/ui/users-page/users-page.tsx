import { User } from '@/entities/user'
import { useCheckSignIn } from '@/features/auth/check-sign-in'
import { SignInButton } from '@/features/auth/sign-in'
import { SignOutButton } from '@/features/auth/sign-out'
import { CreateUserForm } from '@/features/user/create-user'
import { RemoveUserButton } from '@/features/user/remove-user'
import { CenterContentLayout } from '@/shared/ui/layouts'

import { UserList } from '../user-list/user-list'

export const UsersPage = () => {
  const { isUserSignIn } = useCheckSignIn()

  const getUserActions = (user: User) => {
    return (
      <>
        {isUserSignIn(user) ? <SignOutButton /> : <SignInButton user={user} />}
        <RemoveUserButton userId={user.id} />
      </>
    )
  }

  return (
    <CenterContentLayout className={'py-10'}>
      <h1 className={'text-3xl'}>Пользователи</h1>
      <div className={'mt-10'}>
        <h2 className={'text-lg mb-2 font-semibold'}>Добавить пользователя</h2>
        <CreateUserForm />
      </div>
      <UserList userActions={getUserActions} />
    </CenterContentLayout>
  )
}
