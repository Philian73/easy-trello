import { ElementType, ReactNode, useId, useMemo } from 'react'

import { Icons } from '@/shared/assets/icons'
import { Listbox, ListboxProps } from '@headlessui/react'
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

export type SelectProps<TTag extends ElementType, TType extends BaseOption, TActualType> = Omit<
  ListboxProps<TTag, TType, TActualType>,
  'defaultValue' | 'multiple' | 'onChange' | 'value'
> & {
  errorMessage?: string
  getLabel: (value: TType) => string
  label?: string
  options: TType[]
  renderOption?: (value: TType, o: { active?: boolean; selected?: boolean }) => ReactNode
} & ConditionalMultipleProps<TType>

export const Select = <TTag extends ElementType, TType extends BaseOption, TActualType>({
  errorMessage,
  getLabel,
  label,
  options,
  renderOption = o => getLabel(o),
  renderPreview,
  value,
  ...rest
}: SelectProps<TTag, TType, TActualType>) => {
  const id = useId()

  const isValueArray = Array.isArray(value)

  const showError = !!errorMessage && errorMessage?.length > 0

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
    <div className={'flex flex-col gap-1'}>
      {label && <label htmlFor={id}>{label}</label>}

      <Listbox value={value} {...rest}>
        <div
          className={
            'relative rounded border border-slate-300 focus-within:border-teal-600 h-10 outline-none data-[headlessui-state="open"]:z-10 dark:border-slate-700'
          }
        >
          <Listbox.Button
            className={' h-full w-full outline-none grow bg-transparent flex items-center '}
            id={id}
          >
            {renderPreview?.(value as (TType & TType[]) | undefined) ?? valueMap}

            <Icons.ChevronUpDown
              aria-hidden={'true'}
              className={'h-5 w-10 text-gray-400 ml-auto'}
            />
          </Listbox.Button>

          <Listbox.Options
            className={
              'absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 dark:bg-slate-700'
            }
          >
            {options?.map((option, i) => (
              <Listbox.Option
                className={({ active, selected }) =>
                  clsx(
                    'relative flex cursor-default select-none p-4 ',
                    active ? 'bg-teal-600 text-white' : 'text-slate-900 dark:text-white',
                    selected && 'bg-teal-500 text-white'
                  )
                }
                key={option?.id ?? i}
                value={option}
              >
                {params => <>{renderOption(option, params)}</>}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
    </div>
  )
}
