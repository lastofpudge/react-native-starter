import { AuthService } from '@/services/auth.service'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import secureStorage from './secureStorage'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: { email: string } | null
  login: (email: string, password: string) => Promise<{ token?: string; error?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        const data = await AuthService.login(email, password)
        if (data.token) {
          set({
            isAuthenticated: true,
            user: { email },
            token: data.token
          })
          return data
        }
        return { error: 'Login failed' }
      },
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null
        })
    }),
    {
      name: 'auth-storage',
      storage: secureStorage as StateStorage
    }
  )
)
