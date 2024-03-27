import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { Icons } from '@/shared/assets/icons'
import { useAppearanceDelay } from '@/shared/lib/hooks'
import clsx from 'clsx'

type PageSpinnerProps = {
  isLoading?: boolean
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const PageSpinner = forwardRef<HTMLDivElement, PageSpinnerProps>(
  ({ className, isLoading, ...rest }, ref) => {
    const isShown = useAppearanceDelay(isLoading, {
      defaultValue: true,
      minDisplay: 500,
    })

    if (!isShown) {
      return null
    }

    return (
      <div
        className={clsx(
          'fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-slate-100 text-teal-600 z-[9999] dark:bg-slate-800 autofill:bg-red-200',
          className
        )}
        ref={ref}
        {...rest}
      >
        <Icons.Spinner height={96} width={96} />
      </div>
    )
  }
)

// ==============================================================================

if (import.meta.env.DEV) {
  PageSpinner.displayName = 'PageSpinner'
}

// ==============================================================================
