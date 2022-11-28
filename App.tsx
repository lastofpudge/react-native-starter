import Home from '@/components/screens/home'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export default function App() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Home />
      <StatusBar style='auto' />
    </View>
  )
}
