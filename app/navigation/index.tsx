// app/navigation/index.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthScreen from '@/screens/auth'
import { useAuthStore } from '@/stores/useAuthStore'
import type { IRootStackParamList } from '@/types/navigation'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator<IRootStackParamList>()

const Navigation = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name='Main' component={TabNavigator} />
        ) : (
          <Stack.Screen name='Auth' component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
