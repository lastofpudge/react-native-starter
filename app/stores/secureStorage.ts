import * as SecureStore from 'expo-secure-store'

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await SecureStore.getItemAsync(name)
    return value ? JSON.parse(value) : null
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, JSON.stringify(value))
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name)
  }
}

export default secureStorage
