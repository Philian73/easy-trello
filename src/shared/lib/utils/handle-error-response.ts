import { isAxiosError } from 'axios'

export const handleErrorResponse = (error: unknown, action: (message: string) => void) => {
  let errorMessage = 'Some error occurred'

  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.message ?? error.message ?? errorMessage
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  action(errorMessage)
}
