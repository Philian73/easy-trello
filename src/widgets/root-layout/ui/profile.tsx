import { sessionQuery } from '@/entities/session'
import { getAvatarUrl } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const Profile = () => {
  const { data: session } = useQuery(sessionQuery)

  if (!session) {
    return null
  }

  return (
    <div className={'flex gap-2 items-center justify-end'}>
      <img
        alt={`Default user avatar №${session.avatarId}`}
        className={'w-8 h-8'}
        src={getAvatarUrl(session.avatarId)}
      />
      <div className={'text-lg'}>{session.name}</div>
    </div>
  )
}
