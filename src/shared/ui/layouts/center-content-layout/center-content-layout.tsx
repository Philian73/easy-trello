import type { ComponentPropsWithoutRef, FC } from 'react'

import clsx from 'clsx'

type CenterContentLayoutProps = ComponentPropsWithoutRef<'div'>

export const CenterContentLayout: FC<CenterContentLayoutProps> = ({ className, ...rest }) => {
  return (
    <div className={clsx('container mx-auto max-w-[1000px] m-full px-10', className)} {...rest} />
  )
}
