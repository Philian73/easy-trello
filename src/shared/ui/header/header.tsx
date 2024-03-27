import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Logo } from '@/shared/ui'
import clsx from 'clsx'

type HeaderProps = {
  linksContentSlot?: ReactNode
  rightContentSlot?: ReactNode
} & Omit<ComponentPropsWithoutRef<'header'>, 'children'>

export const Header = forwardRef<ElementRef<'header'>, HeaderProps>(
  ({ className, linksContentSlot, rightContentSlot, ...rest }, ref) => {
    return (
      <header
        className={clsx(
          'px-4 py-5 border-b border-b-slate-300 flex justify-between items-center bg-white ',
          'grid grid-cols-[1fr_auto_1fr] gap-2',
          'dark:border-b-slate-700 dark:bg-slate-800',
          className
        )}
        ref={ref}
        {...rest}
      >
        <Logo />
        {linksContentSlot}
        {rightContentSlot}
      </header>
    )
  }
)
