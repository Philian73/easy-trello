import { AppLoader } from './app-loader'
import { Router } from './providers'

export const App = () => {
  return (
    <AppLoader>
      <Router />
    </AppLoader>
  )
}
