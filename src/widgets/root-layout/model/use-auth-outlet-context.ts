import { useOutletContext } from 'react-router-dom'

export type AuthOutletContext = {
  isAuthenticated: boolean
}

export const useAuthOutletContext = useOutletContext<AuthOutletContext>
