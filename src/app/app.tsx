import { AppLoader } from './app-loader'
import { Providers } from './providers'

export const App = () => {
  return (
    <AppLoader>
      <Providers />
    </AppLoader>
  )
}
