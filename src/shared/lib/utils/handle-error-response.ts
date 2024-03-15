export const handleErrorResponse = (error: unknown, action: (message: string) => void) => {
  let errorMessage

  if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  action(errorMessage)
}
