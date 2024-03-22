import { BoardPatchDto, CreateBoardDto, CreateUserDto, SignInDto } from '@/shared/api/generated'
import { boardsRepository } from '@/shared/api/msw/boards-repository'
import { sessionRepository } from '@/shared/api/msw/session-repository'
import { usersRepository } from '@/shared/api/msw/users-repository'
import { HttpResponse, delay, http } from 'msw'

const needAuthorization = async () => {
  return new HttpResponse(null, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 401,
  })
}

const unauthorized = async () => {
  return new HttpResponse(null, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 403,
  })
}

const ok = async (body?: unknown) => {
  return new HttpResponse(body ? JSON.stringify(body) : null, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}

export const getHandlers = async () => {
  const users = await usersRepository.getUsers()

  if (users.length === 0) {
    {
      await usersRepository.createUser({
        avatarId: '8',
        email: 'admin@gmail.com',
        name: 'Philian73',
        password: 'admin',
        role: 'admin',
      })
    }
  }

  return [
    http.get('api/users', async () => {
      await delay(1000)
      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      return ok(users)
    }),

    http.post('api/users', async ({ request }) => {
      await delay(1000)
      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      if (session.role !== 'admin') {
        return unauthorized()
      }

      const body = await request.json()

      const newUser = await usersRepository.createUser(body as CreateUserDto)

      await delay(1000)

      return ok(newUser)
    }),

    http.delete('api/users/:userId', async ({ params }) => {
      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      const userId = params.userId as string

      await usersRepository.removeUser(userId)

      if (session.userId === userId) {
        await sessionRepository.signOut()
      }

      await delay(1000)

      return ok()
    }),

    http.get('api/session/me', async () => {
      await delay(1000)
      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      return ok(session)
    }),

    http.post('api/session/sign-in', async ({ request }) => {
      const body = await request.json()

      const res = await sessionRepository.signIn(body as SignInDto)

      if (!res) {
        return needAuthorization()
      }

      await delay(1000)

      return ok(res)
    }),

    http.post('api/session/sign-out', async () => {
      await delay(1000)
      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      await sessionRepository.signOut()

      return ok()
    }),

    http.get('api/boards', async () => {
      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      const boards = await boardsRepository.getBoards()

      const boardsToShow = boards.filter(
        board => board.ownerId === session.userId || board.editorIds.includes(session.userId)
      )

      return ok(boardsToShow)
    }),

    http.post('api/boards', async ({ request }) => {
      const body = (await request.json()) as CreateBoardDto

      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      const board = await boardsRepository.createBoard({
        ...body,
        authorId: session.userId,
        ownerId: session.userId,
      })

      return ok(board)
    }),

    http.get('api/boards/:boardId', async ({ params }) => {
      const boardId = params.boardId as string

      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      const board = await boardsRepository.getBoard(boardId)

      if (!board) {
        return new HttpResponse(null, {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 404,
        })
      }

      if (board.ownerId !== session.userId && !board.editorIds.includes(session.userId)) {
        return unauthorized()
      }

      return ok(board)
    }),

    http.patch('api/boards/:boardId', async ({ params, request }) => {
      const body = await request.json()
      const boardId = params.boardId as string

      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      const board = await boardsRepository.getBoard(boardId)

      if (
        !board ||
        (board?.ownerId !== session.userId && !board?.editorIds?.includes(session.userId))
      ) {
        return new HttpResponse(null, {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 403,
        })
      }

      await boardsRepository.updateBoard(boardId, body as BoardPatchDto)

      return ok(board)
    }),

    http.delete('api/boards/:boardId', async ({ params }) => {
      const boardId = params.boardId as string

      const session = await sessionRepository.getSession()

      if (!session) {
        return needAuthorization()
      }

      const board = await boardsRepository.getBoard(boardId)

      if (!board || !(board.ownerId === session.userId)) {
        return new HttpResponse(null, {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 403,
        })
      }

      await boardsRepository.removeBoard(boardId)

      return ok(board)
    }),
  ]
}
