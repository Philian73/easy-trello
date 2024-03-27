import { type ElementType, type ReactNode, useId, useMemo, useState } from 'react'

import { Icons } from '@/shared/assets/icons'
import {
  Combobox as ComboboxPrimitive,
  ComboboxProps as ComboboxPrimitiveProps,
} from '@headlessui/react'
import clsx from 'clsx'

type BaseOption =
  | {
      id: number | string
    }
  | undefined

type ConditionalMultipleProps<TType extends BaseOption> =
  | {
      multiple: true
      onChange?: (value: TType[]) => void
      renderPreview?: (value?: TType[]) => ReactNode
      value?: TType[]
    }
  | {
      multiple?: false
      onChange?: (value: TType) => void
      renderPreview?: (value?: TType) => ReactNode
      value?: TType
    }

type ComboboxProps<
  TValue extends BaseOption,
  TTag extends ElementType,
  TMulti extends boolean | undefined,
> = Omit<
  ComboboxPrimitiveProps<TValue, boolean | undefined, TMulti, TTag>,
  'defaultValue' | 'multiple' | 'onChange' | 'value'
> & {
  className?: string
  errorMessage?: string
  getLabel: (value: TValue) => string
  label?: string
  options: TValue[]
  renderOption?: (value: TValue, o: { active?: boolean; selected?: boolean }) => ReactNode
} & ConditionalMultipleProps<TValue>

export const Combobox = <
  TType extends BaseOption,
  TTag extends ElementType,
  TMulti extends boolean | undefined,
>({
  className,
  errorMessage,
  getLabel,
  label,
  multiple = false,
  options,
  renderOption = o => getLabel(o),
  renderPreview,
  value,
  ...rest
}: ComboboxProps<TType, TTag, TMulti>) => {
  const id = useId()
  const [query, setQuery] = useState('')

  const showError = !!errorMessage && errorMessage?.length > 0
  const isValueArray = Array.isArray(value)

  const filteredOptions = options?.filter(option =>
    getLabel(option).toLowerCase().includes(query.toLowerCase())
  )

  const valueMap = useMemo(() => {
    if (isValueArray) {
      return value.map(v => (
        <span className={'px-2 whitespace-nowrap'} key={v?.id}>
          {getLabel(v)}
        </span>
      ))
    }

    return value && <span className={'px-2 whitespace-nowrap'}>{getLabel(value)}</span>
  }, [getLabel, isValueArray, value])

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && <label htmlFor={id}>{label}</label>}

      <ComboboxPrimitive multiple={multiple as false} value={value} {...rest}>
        <div
          className={
            'relative rounded border border-slate-300 focus-within:border-teal-600 h-10 outline-none flex items-center '
          }
        >
          {renderPreview?.(value as (TType & TType[]) | undefined) ?? valueMap}
          <ComboboxPrimitive.Input
            className={'pl-2 pr-2 h-full w-full outline-none grow bg-transparent'}
            id={id}
            onChange={e => setQuery(e.currentTarget.value)}
          />
          <ComboboxPrimitive.Button>
            <Icons.ChevronUpDown aria-hidden={'true'} className={'h-5 w-10 text-gray-400'} />
          </ComboboxPrimitive.Button>

          <ComboboxPrimitive.Options
            className={
              'absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 dark:bg-slate-700'
            }
          >
            {filteredOptions?.map(option => (
              <ComboboxPrimitive.Option
                className={({ active, selected }) =>
                  clsx(
                    'relative flex cursor-default select-none p-4 ',
                    active ? 'bg-teal-600 text-white' : 'text-slate-900 dark:text-white',
                    selected && 'bg-teal-500 text-white'
                  )
                }
                key={option?.id}
                value={option}
              >
                {params => <>{renderOption(option, params)}</>}
              </ComboboxPrimitive.Option>
            ))}
          </ComboboxPrimitive.Options>
        </div>
      </ComboboxPrimitive>

      {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
    </div>
  )
}
