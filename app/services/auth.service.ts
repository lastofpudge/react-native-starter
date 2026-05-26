const AUTH_API_URL = process.env.EXPO_PUBLIC_AUTH_API_URL

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      return response.ok ? data : { error: data.error || 'Login failed' }
    } catch {
      return { error: 'Network error. Check your connection.' }
    }
  },
  async register(_email: string, _password: string) {
    // TODO: implement registration
    return true
  },
  async resetPassword(_email: string) {
    // TODO: implement password reset
    return { code: '1234' }
  },
  async resetPasswordConfirm(password: string, password_repeat: string) {
    if (password === password_repeat) {
      return { success: true }
    }
    return false
  }
}
