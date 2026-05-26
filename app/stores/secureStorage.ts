import * as SecureStore from 'expo-secure-store'

const secureStorage = {
  getItem: (name: string): Promise<string | null> => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string): Promise<void> => SecureStore.setItemAsync(name, value),
  removeItem: (name: string): Promise<void> => SecureStore.deleteItemAsync(name)
}

export default secureStorage
