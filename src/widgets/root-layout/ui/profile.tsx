import { useSession } from '@/entities/session'
import { getAvatarUrl } from '@/entities/user'

export const Profile = () => {
  const { currentSession } = useSession()

  if (!currentSession) {
    return null
  }

  return (
    <div className={'flex gap-2 items-center justify-end'}>
      <img
        alt={`Default user avatar №${currentSession.avatarId}`}
        className={'w-8 h-8'}
        src={getAvatarUrl(currentSession.avatarId)}
      />
      <div className={'text-lg'}>{currentSession.name}</div>
    </div>
  )
}
