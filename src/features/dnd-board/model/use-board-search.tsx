import type { BoardTask } from '@/entities/board'

import { type Dispatch, type SetStateAction, useCallback } from 'react'

import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

type BoardSearchDeps = [query: string, setQuery: Dispatch<SetStateAction<string>>]

export const boardSearchContext = createStrictContext<BoardSearchDeps>()

export const useBoardSearch = () => {
  const [query, setQuery] = useStrictContext(boardSearchContext)

  const filterTasksWithQuery = useCallback(
    (task: BoardTask) => task.title.toLowerCase().includes(query.toLowerCase()),
    [query]
  )

  return {
    filterTasksWithQuery,
    query,
    setQuery,
  }
}
