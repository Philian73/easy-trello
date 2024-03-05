import { type User, UsersList } from '@/entities/user'
import { SignInButton, SignOutButton, useCheckSignIn } from '@/features/auth'
import { CreateUserForm, RemoveUserButton } from '@/features/user'
import { CenterContentLayout } from '@/shared/ui/layouts'

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
      <UsersList userActions={getUserActions} />
    </CenterContentLayout>
  )
}
