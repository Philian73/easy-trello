import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
  useId,
} from 'react'

import clsx from 'clsx'

type TextFieldProps = {
  errorMessage?: string
  fullWidth?: boolean
  label?: string
  /**
   * Additional props for customizing the underlying `div` element,
   * which serves as the parent for the input.
   * Use it for setting `className` or `style`.
   */
  rootProps?: ComponentProps<'div'>
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef(
  ({ className, errorMessage, fullWidth, id, label, rootProps, ...rest }, ref) => {
    const generatedId = useId()

    const inputId = id ?? generatedId + 'input'

    const showError = !!errorMessage && errorMessage?.length > 0

    return (
      <div
        {...rootProps}
        className={clsx('flex flex-col gap-1', fullWidth && 'grow', rootProps?.className)}
      >
        {label && <label htmlFor={inputId}>{label}</label>}

        <input
          aria-invalid={showError}
          id={inputId}
          ref={ref}
          {...rest}
          className={clsx(
            'rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none aria-[invalid=true]:border-rose-600 transition-[border] duration-200',
            'dark:border-slate-700 dark:bg-slate-800 dark:focus:border-teal-600',
            className
          )}
        />

        {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
      </div>
    )
  }
) as ForwardRefExoticComponent<TextFieldProps & RefAttributes<HTMLInputElement>> & {
  Search: typeof Search
  TextArea: typeof TextArea
}

// ==============================================================================

type SearchProps = Omit<TextFieldProps, 'type'>

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  return <TextField {...props} ref={ref} type={'search'} />
})

// ==============================================================================

type TextAreaProps = {
  errorMessage?: string
  fullWidth?: boolean
  label?: string
  /**
   * Additional props for customizing the underlying `div` element,
   * which serves as the parent for the input.
   * Use it for setting `className` or `style`.
   */
  rootProps?: ComponentProps<'div'>
} & ComponentPropsWithoutRef<'textarea'>

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, errorMessage, fullWidth, id, label, rootProps, ...rest }, ref) => {
    const generatedId = useId()
    const textAreaId = id ?? generatedId + 'textarea'

    const showError = !!errorMessage && errorMessage?.length > 0

    return (
      <div
        {...rootProps}
        className={clsx('flex flex-col gap-1', fullWidth && 'grow', rootProps?.className)}
      >
        {label && <label htmlFor={textAreaId}>{label}</label>}

        <textarea
          aria-invalid={showError}
          className={clsx(
            'rounded border border-slate-300 focus:border-teal-600 px-2 outline-none aria-[invalid=true]:border-rose-600 transition-all duration-200',
            'dark:border-slate-700 dark:bg-slate-800 dark:focus:border-teal-600',
            className
          )}
          id={textAreaId}
          ref={ref}
          {...rest}
        />

        {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
      </div>
    )
  }
)

// ==============================================================================

TextField.TextArea = TextArea
TextField.Search = Search

// ==============================================================================

if (import.meta.env.DEV) {
  TextField.displayName = 'TextField'
  TextArea.displayName = 'TextField.TextArea'
  Search.displayName = 'TextField.Search'
}

// ==============================================================================
