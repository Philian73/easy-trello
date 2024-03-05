import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

type LogoProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const Logo = forwardRef<HTMLDivElement, LogoProps>(({ className, ...rest }, ref) => {
  return (
    <div className={clsx('flex items-center gap-2 text-2xl', className)} ref={ref} {...rest}>
      <span
        className={
          'font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-teal-500 from-40% to-blue-400'
        }
      >
        {import.meta.env.VITE_APP_NAME}
      </span>
    </div>
  )
})
