import { type ChangeEvent, type ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { TextField } from '@/shared/ui'
import clsx from 'clsx'

import { useBoardSearch } from '../../model/use-board-search'

type BoardSearchProps = Omit<
  ComponentPropsWithoutRef<typeof TextField.Search>,
  'onChange' | 'placeholder' | 'value'
>

export const BoardSearch = forwardRef<HTMLInputElement, BoardSearchProps>(
  ({ rootProps, ...rest }, ref) => {
    const { t } = useTranslation()

    const { query, setQuery } = useBoardSearch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value)
    }

    return (
      <TextField.Search
        ref={ref}
        rootProps={{ ...rootProps, className: clsx('w-[250px]', rootProps?.className) }}
        {...rest}
        onChange={handleChange}
        placeholder={t('pages.board.search.task')}
        value={query}
      />
    )
  }
)

// ==============================================================================

if (import.meta.env.DEV) {
  BoardSearch.displayName = 'BoardSearch'
}

// ==============================================================================
