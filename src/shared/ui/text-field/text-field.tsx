import { type ComponentProps, type ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import clsx from 'clsx'

type TextFieldProps = {
  errorMessage?: string
  label?: string
  /**
   * Additional props for customizing the underlying `div` element,
   * which serves as the parent for the input.
   * Use it for setting `className` or `style`.
   */
  rootProps?: ComponentProps<'div'>
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, errorMessage, id, label, rootProps, ...rest }, ref) => {
    const generatedId = useId()

    const inputId = (id ?? generatedId) + 'input'

    const showError = !!errorMessage && errorMessage?.length > 0

    return (
      <div {...rootProps} className={clsx('flex flex-col gap-1', rootProps?.className)}>
        {label && <label htmlFor={inputId}>{label}</label>}

        <input
          aria-invalid={showError}
          id={inputId}
          ref={ref}
          {...rest}
          className={clsx(
            'rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none aria-[invalid=true]:border-rose-600 transition-all duration-200',
            className
          )}
        />

        {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
      </div>
    )
  }
)
