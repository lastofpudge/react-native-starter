export const AuthService = {
  async login(email: string, password: string) {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    return response.ok ? data : { error: data.error || 'Login failed' }
  },
  async register(email: string, password: string) {
    return true
  },
  async resetPassword(email: string) {
    return { code: '1234' }
  },
  async resetPasswordConfirm(password: string, password_repeat: string) {
    if (password === password_repeat) {
      return {
        success: true
      }
    }
    return false
  }
}
