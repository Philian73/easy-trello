import { type ComponentProps, type ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import clsx from 'clsx'

export type SelectOption = {
  disabled?: boolean
  label: string
  value: string
}

type SelectProps = {
  errorMessage?: string
  label?: string
  options: SelectOption[]
  /**
   * Additional props for customizing the underlying `div` element,
   * which serves as the parent for the input.
   * Use it for setting `className` or `style`.
   */
  rootProps?: ComponentProps<'div'>
} & ComponentPropsWithoutRef<'select'>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, errorMessage, id, label, options, rootProps, ...rest }, ref) => {
    const generatedId = useId()

    const selectId = (id ?? generatedId) + 'select'

    const showError = !!errorMessage && errorMessage?.length > 0

    return (
      <div {...rootProps} className={clsx('flex flex-col gap-1', rootProps?.className)}>
        {label && <label htmlFor={selectId}>{label}</label>}

        <select
          aria-invalid={showError}
          className={clsx(
            'rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none aria-[invalid=true]:border-rose-600 transition-all duration-200',
            className
          )}
          id={selectId}
          ref={ref}
          {...rest}
        >
          {options.map(option => (
            <option
              className={option.disabled ? 'disabled:opacity-50 bg-gray-300' : undefined}
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
      </div>
    )
  }
)

// ==============================================================================

if (import.meta.env.DEV) {
  Select.displayName = 'Select'
}

// ==============================================================================
