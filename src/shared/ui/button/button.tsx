import { type ComponentType, type ElementType, type ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

type ButtonProps<T extends ElementType = 'button'> = PolymorphicComponentPropWithRef<
  T,
  {
    variant?: 'outlined' | 'primary' | 'secondary'
  }
>

type ButtonComponent = <T extends ElementType = 'button'>(props: ButtonProps<T>) => ReactNode | null

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    { as, className, variant = 'primary', ...rest }: ButtonProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const Component = as ?? 'button'

    return (
      <Component
        className={clsx(
          'px-4 h-10 rounded flex gap-2 items-center justify-center transition-all duration-300 [&:not(:disabled)]:cursor-pointer disabled:cursor-not-allowed',
          {
            outlined: 'border border-slate-300 hover:border-slate-500 disabled:opacity-50',
            primary:
              'text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 shadow shadow-teal-500/30',
            secondary:
              'text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 shadow shadow-rose-500/30',
          }[variant],
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

// ==============================================================================

if (import.meta.env.DEV) {
  ;(Button as ComponentType).displayName = 'Button'
}

// ==============================================================================
