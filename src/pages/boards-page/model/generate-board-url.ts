import { generatePath } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/constants'

const { BOARD, HOME } = ROUTER_PATHS

export const generateBoardUrl = (boardId: string) => generatePath(HOME + BOARD, { boardId })
