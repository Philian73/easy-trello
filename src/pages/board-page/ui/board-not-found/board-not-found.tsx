import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { Icons } from '@/shared/assets/icons'
import { ROUTER_PATHS } from '@/shared/constants'
import { Button } from '@/shared/ui'

export const BoardNotFound: FC<{ errorMessage?: string }> = ({ errorMessage }) => {
  return (
    <div className={'absolute top-1/2 left-0 right-0 -translate-y-1/2'}>
      <div className={'flex flex-col gap-3 items-center'}>
        <Icons.BadSmile height={140} width={140} />

        <h2 className={'mb-3'}>Доска не найдена.</h2>

        <span>{errorMessage}</span>

        <Button as={Link} to={ROUTER_PATHS.HOME}>
          На главную
        </Button>
      </div>
    </div>
  )
}
